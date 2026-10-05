# Tanques de Agua — sitio web

Migración del sitio de Wix a **Cloudflare**, con foco en velocidad, SEO orgánico y costo casi cero.

## Arquitectura (todo en Cloudflare)

| Pieza | Servicio de Cloudflare | Costo |
| --- | --- | --- |
| Hosting del sitio (HTML/CSS/imágenes) | **Workers Static Assets** | Gratis, ilimitado |
| Formulario de cotización (`/api/contacto`) | **Workers** | Gratis hasta 100.000 peticiones/día |
| Base de datos de solicitudes | **D1** (SQLite) | Gratis hasta 5 GB |
| Anti-spam del formulario | **Turnstile** + **Rate Limiting** | Gratis |
| Aviso por correo de cada solicitud | **Email Routing** (`send_email`) | Gratis |
| Medición de clics en WhatsApp/llamadas | **Workers Analytics Engine** | Gratis (plan free) |
| Analítica de visitas sin cookies | **Web Analytics** | Gratis |
| DNS, SSL, CDN, caché, HTTP/3 | Cloudflare (plan Free) | Gratis |
| Despliegue automático desde GitHub | **Workers Builds** | Gratis |

**Costo mensual esperado: $0** (solo el dominio). El HTML se genera estático con [Astro](https://astro.build), así que cada visita se sirve desde la caché de Cloudflare sin ejecutar código.

```
src/
  data/site.ts        ← TODOS los datos del negocio (teléfono, servicios, zonas, FAQ…)
  styles/global.css   ← colores y tipografía (variables --brand-*)
  assets/images/      ← fotos (se optimizan solas a AVIF/WebP)
  content/blog/       ← artículos del blog en Markdown
  pages/              ← páginas del sitio
  lib/schema.ts       ← datos estructurados para Google (JSON-LD)
worker/index.ts       ← API: formulario → D1 + correo; eventos → Analytics Engine
migrations/           ← esquema de la base de datos D1
public/_redirects     ← redirecciones 301 desde las URLs de Wix
public/_headers       ← caché y cabeceras de seguridad
```

## Primeros pasos

```bash
npm install
cp .dev.vars.example .dev.vars
npm run db:migrate:local
npm run dev          # http://localhost:4321 (solo el sitio)
npm run preview      # sitio + API + D1 locales con wrangler (http://localhost:8787)
```

### Traer las imágenes de Wix
```bash
npm run imagenes:wix
```
Quedan en `src/assets/images/wix/`. Renómbralas según `src/assets/images/LEEME.md`.

## Despliegue en Cloudflare (una sola vez)

1. `npx wrangler login`
2. Crear la base de datos: `npx wrangler d1 create tanques-db` → copiar el `database_id` en `wrangler.jsonc`.
3. `npm run db:migrate:remote`
4. Turnstile: en el panel → *Turnstile* → *Add widget* con tu dominio.
   - Clave pública → variable de build `PUBLIC_TURNSTILE_SITE_KEY`.
   - Clave secreta → `npx wrangler secret put TURNSTILE_SECRET_KEY`.
5. Conectar el repo en *Workers & Pages → Create → Import a repository* (Workers Builds).
   Comando de build: `npm run build` · Comando de deploy: `npx wrangler deploy`.
6. Dominio: descomentar `routes` en `wrangler.jsonc` con tu dominio (`custom_domain: true`).
7. Activar **Web Analytics** en el panel para el dominio.
8. (Opcional) Email Routing: activar en el dominio, verificar tu correo y descomentar `send_email` en `wrangler.jsonc`; poner el remitente en `NOTIFY_EMAIL`.

### Ver las solicitudes recibidas
```bash
npx wrangler d1 execute tanques-db --remote --command "SELECT * FROM solicitudes ORDER BY creado_en DESC LIMIT 20"
```
(También desde el panel: *Storage & Databases → D1 → tanques-db → Console*.)

## Antes de publicar — checklist

- [ ] Reemplazar todos los `TODO` de `src/data/site.ts` (teléfono, dirección, dominio, servicios reales).
- [ ] Ajustar colores en `src/styles/global.css` a los de la marca.
- [ ] Subir las fotos reales a `src/assets/images/`.
- [ ] Reemplazar `public/og-default.jpg` por una imagen real 1200×630.
- [ ] Completar `public/_redirects` con las URLs viejas de Wix.
- [ ] Revisar la política de privacidad.

Ver también [`docs/SEO.md`](docs/SEO.md) con la estrategia de posicionamiento.
