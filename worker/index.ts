/**
 * Worker de Cloudflare.
 *
 * Los archivos estáticos (HTML, CSS, imágenes) los sirve Cloudflare directamente
 * sin ejecutar este código. Solo las rutas /api/* llegan aquí:
 *
 *   POST /api/contacto  → valida Turnstile, guarda la solicitud en D1 y avisa por correo
 *   POST /api/evento    → registra eventos de conversión (clic WhatsApp, llamada) en Analytics Engine
 */
import { EmailMessage } from 'cloudflare:email';

interface Env {
  ASSETS: Fetcher;
  DB?: D1Database;
  FORM_LIMITER?: RateLimit;
  EVENTS?: AnalyticsEngineDataset;
  MAILER?: SendEmail;
  TURNSTILE_SECRET_KEY?: string;
  NOTIFY_EMAIL?: string;
}

const MAX = { nombre: 80, telefono: 25, email: 120, ciudad: 60, servicio: 80, capacidad: 40, mensaje: 1500 };

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/contacto') {
      if (request.method !== 'POST') return json({ ok: false, error: 'Método no permitido' }, 405);
      return handleContact(request, env, ctx);
    }

    if (url.pathname === '/api/evento') {
      if (request.method !== 'POST') return new Response(null, { status: 405 });
      return handleEvent(request, env);
    }

    if (url.pathname.startsWith('/api/')) return json({ ok: false, error: 'No encontrado' }, 404);

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

async function handleContact(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  const ip = request.headers.get('cf-connecting-ip') ?? 'desconocida';

  const fail = (error: string, status = 400) =>
    wantsJson ? json({ ok: false, error }, status) : redirect(`/contacto?error=${encodeURIComponent(error)}#formulario`);

  if (env.FORM_LIMITER) {
    const { success } = await env.FORM_LIMITER.limit({ key: ip });
    if (!success) return fail('Demasiados intentos. Espera un minuto e inténtalo de nuevo.', 429);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail('Formulario inválido');
  }

  // Honeypot: los humanos no ven este campo; los bots lo llenan.
  if (str(form.get('empresa_web'), 100)) return wantsJson ? json({ ok: true }) : redirect('/gracias');

  const data = {
    nombre: str(form.get('nombre'), MAX.nombre),
    telefono: str(form.get('telefono'), MAX.telefono),
    email: str(form.get('email'), MAX.email),
    ciudad: str(form.get('ciudad'), MAX.ciudad),
    servicio: str(form.get('servicio'), MAX.servicio),
    capacidad: str(form.get('capacidad'), MAX.capacidad),
    mensaje: str(form.get('mensaje'), MAX.mensaje),
    pagina: str(form.get('pagina'), 200),
    utm_source: str(form.get('utm_source'), 100),
    utm_medium: str(form.get('utm_medium'), 100),
    utm_campaign: str(form.get('utm_campaign'), 100),
  };

  if (data.nombre.length < 2) return fail('Escribe tu nombre.');
  if (data.telefono.replace(/\D/g, '').length < 7) return fail('Escribe un teléfono válido.');
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return fail('El correo no es válido.');

  if (env.TURNSTILE_SECRET_KEY) {
    const token = str(form.get('cf-turnstile-response'), 2048);
    const valid = await verifyTurnstile(token, ip, env.TURNSTILE_SECRET_KEY);
    if (!valid) return fail('No pudimos verificar que eres humano. Recarga la página e inténtalo de nuevo.', 403);
  }

  if (!env.DB) {
    console.error('Binding DB (D1) no configurado: la solicitud no se guardó', data);
    return fail('El formulario no está disponible en este momento. Escríbenos por WhatsApp o llámanos.', 503);
  }
  await ensureSchema(env.DB);

  const cf = (request as Request & { cf?: IncomingRequestCfProperties }).cf;
  await env.DB.prepare(
    `INSERT INTO solicitudes
       (nombre, telefono, email, ciudad, servicio, capacidad, mensaje, pagina, utm_source, utm_medium, utm_campaign, pais, user_agent)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13)`,
  )
    .bind(
      data.nombre,
      data.telefono,
      data.email || null,
      data.ciudad || null,
      data.servicio || null,
      data.capacidad || null,
      data.mensaje || null,
      data.pagina || null,
      data.utm_source || null,
      data.utm_medium || null,
      data.utm_campaign || null,
      (cf?.country as string | undefined) ?? null,
      (request.headers.get('user-agent') ?? '').slice(0, 300),
    )
    .run();

  env.EVENTS?.writeDataPoint({ blobs: ['formulario', data.servicio, data.pagina], indexes: ['formulario'] });

  // El correo se envía después de responder, para no hacer esperar al usuario.
  ctx.waitUntil(notify(env, data).catch((err) => console.error('Error enviando correo', err)));

  return wantsJson ? json({ ok: true }) : redirect('/gracias');
}

// Crea la tabla si no existe (una vez por instancia), para no depender de correr migraciones a mano.
// Mantener sincronizado con migrations/0001_crear_solicitudes.sql
let schemaReady = false;
async function ensureSchema(db: D1Database): Promise<void> {
  if (schemaReady) return;
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS solicitudes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      creado_en TEXT NOT NULL DEFAULT (datetime('now')),
      nombre TEXT NOT NULL, telefono TEXT NOT NULL, email TEXT, ciudad TEXT, servicio TEXT,
      capacidad TEXT, mensaje TEXT, pagina TEXT, utm_source TEXT, utm_medium TEXT, utm_campaign TEXT,
      pais TEXT, user_agent TEXT, estado TEXT NOT NULL DEFAULT 'nueva')`),
    db.prepare('CREATE INDEX IF NOT EXISTS idx_solicitudes_creado ON solicitudes (creado_en DESC)'),
    db.prepare('CREATE INDEX IF NOT EXISTS idx_solicitudes_estado ON solicitudes (estado)'),
  ]);
  schemaReady = true;
}

async function handleEvent(request: Request, env: Env): Promise<Response> {
  try {
    const body = (await request.json()) as { tipo?: string; pagina?: string; etiqueta?: string };
    const tipo = String(body.tipo ?? '').slice(0, 30);
    if (['whatsapp', 'llamada', 'email'].includes(tipo)) {
      env.EVENTS?.writeDataPoint({
        blobs: [tipo, String(body.etiqueta ?? '').slice(0, 60), String(body.pagina ?? '').slice(0, 200)],
        indexes: [tipo],
      });
    }
  } catch {
    /* ignorar cuerpos inválidos */
  }
  return new Response(null, { status: 204 });
}

async function verifyTurnstile(token: string, ip: string, secret: string): Promise<boolean> {
  if (!token) return false;
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  body.append('remoteip', ip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
    const outcome = (await res.json()) as { success: boolean };
    return outcome.success === true;
  } catch (err) {
    console.error('Error verificando Turnstile', err);
    return false;
  }
}

async function notify(env: Env, data: Record<string, string>): Promise<void> {
  if (!env.MAILER || !env.NOTIFY_EMAIL) return;
  const from = env.NOTIFY_EMAIL;
  const lines = Object.entries(data)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\r\n');
  const subject = `Nueva solicitud de cotizacion - ${data.nombre}`.replace(/[\r\n]/g, ' ');
  const raw = [
    `From: Web Tanques de Agua <${from}>`,
    `To: ${from}`,
    `Subject: ${subject}`,
    `Message-ID: <${crypto.randomUUID()}@${from.split('@')[1]}>`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    lines,
  ].join('\r\n');
  await env.MAILER.send(new EmailMessage(from, from, raw));
}

function str(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

function redirect(location: string): Response {
  return new Response(null, { status: 303, headers: { location } });
}
