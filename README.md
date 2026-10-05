# Dimafer & Hermaco — Tanques de Agua

Migración del sitio de Wix (https://cristiannunezduart.wixsite.com/tanques-de-agua) a **Cloudflare**, con foco en velocidad, SEO orgánico y costo casi cero.

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
  data/site.ts        ← TODOS los datos del negocio (teléfono, productos, sectores, FAQ…)
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
Ya están descargadas y renombradas en `src/assets/images/` (ver `LEEME.md`). Este comando solo sirve si agregas imágenes nuevas en Wix.

## Despliegue en Cloudflare (una sola vez)

1. **Base de datos D1:** en el panel de Cloudflare → *Storage & Databases → D1 → Create database*, nombre `tanques-db`.
   Copia el *Database ID*, pégalo en `wrangler.jsonc` y descomenta el bloque `d1_databases`. La tabla se crea sola
   con la primera solicitud (no hace falta correr migraciones).
2. **Turnstile:** panel → *Turnstile* → *Add widget* con tu dominio.
   - Clave pública → variable de build `PUBLIC_TURNSTILE_SITE_KEY` (*Settings → Build → Variables*).
   - Clave secreta → variable secreta `TURNSTILE_SECRET_KEY` del Worker (*Settings → Variables and Secrets*).
3. Conectar el repo (ya hecho: Worker `tanquesdeagua`) en *Workers & Pages → Create → Import a repository* (Workers Builds).
   Comando de build: `npm run build` · Comando de deploy: `npx wrangler deploy`.
4. Dominio: descomentar `routes` en `wrangler.jsonc` con tu dominio (`custom_domain: true`).
5. Activar **Web Analytics** en el panel para el dominio.
6. (Opcional) Email Routing: activar en el dominio, verificar tu correo y descomentar `send_email` en `wrangler.jsonc`; poner el remitente en `NOTIFY_EMAIL`.

### Ver las solicitudes recibidas
```bash
npx wrangler d1 execute tanques-db --remote --command "SELECT * FROM solicitudes ORDER BY creado_en DESC LIMIT 20"
```
(También desde el panel: *Storage & Databases → D1 → tanques-db → Console*.)

## Antes de publicar — checklist

- [ ] Revisar los `TODO` de `src/data/site.ts`: dominio, WhatsApp, horario, coordenadas, zonas de despacho, redes sociales.
- [ ] Confirmar capacidades disponibles de cada tanque (agregarlas mejora mucho el SEO: "tanque de 1000 litros").
- [ ] Agregar fotos reales del local, bodega y entregas.
- [ ] Si hay logo oficial, reemplazar el de `src/components/Logo.astro` y correr `node scripts/generar-iconos.mjs`.
- [ ] Completar `public/_redirects` con las URLs viejas de Wix.
- [ ] Revisar la política de privacidad.

Ver también [`docs/SEO.md`](docs/SEO.md) con la estrategia de posicionamiento.
