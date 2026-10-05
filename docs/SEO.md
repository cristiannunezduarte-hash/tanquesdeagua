# Estrategia SEO — Tanques de Agua

## Lo que ya trae el código

**SEO técnico**
- HTML estático servido desde la CDN de Cloudflare → tiempo de carga < 1 s y Core Web Vitals en verde (Wix suele estar en rojo en móvil).
- CSS en línea, fuente auto-alojada, **cero JavaScript bloqueante**. Turnstile se carga solo cuando el formulario aparece en pantalla.
- Imágenes convertidas automáticamente a AVIF/WebP con tamaños responsivos y `lazy loading`; la imagen principal se carga con prioridad alta (mejora LCP).
- URLs limpias y descriptivas: `/servicios/lavado-y-desinfeccion-de-tanques`.
- `canonical`, `robots`, `hreflang es-CO`, Open Graph y Twitter Cards en todas las páginas.
- `sitemap-index.xml` automático y `robots.txt` que lo declara.
- Redirecciones **301** desde las URLs de Wix (`public/_redirects`) para no perder autoridad.
- Página 404 útil con enlaces internos; `/gracias` con `noindex`.
- `llms.txt` para buscadores con IA (ChatGPT, Perplexity, AI Overviews).
- HTTPS, HSTS y cabeceras de seguridad.

**Datos estructurados (JSON-LD)**
- `LocalBusiness` con dirección, geo, horario, teléfono, zonas atendidas y redes.
- `Service` por cada servicio, `FAQPage`, `BreadcrumbList`, `BlogPosting`, `WebSite`.
- Validar en https://search.google.com/test/rich-results y https://validator.schema.org

**Estructura de contenido**
- Una página por servicio (cada una apunta a una palabra clave distinta).
- Título con palabra clave + ciudad, un solo `<h1>` por página, jerarquía H2/H3.
- Enlazado interno: inicio → servicios → otros servicios → blog → servicio relacionado.
- Blog con Markdown para publicar contenido informativo.

## Recomendaciones (en orden de impacto)

1. **Google Business Profile** — es el factor nº 1 en búsquedas locales ("lavado de tanques cerca de mí"). Completa el perfil al 100 %, misma dirección/teléfono que la web (NAP idéntico), categorías correctas, fotos reales cada semana y responde todas las reseñas. Pide reseña a cada cliente (envía el link por WhatsApp al terminar).
2. **Google Search Console** — verifica el dominio (registro TXT en el DNS de Cloudflare, 1 clic), envía `sitemap-index.xml` y revisa el informe de páginas. Haz lo mismo en **Bing Webmaster Tools** (alimenta también a ChatGPT/Copilot).
3. **Migración sin perder posiciones** — antes de apuntar el dominio, exporta de Search Console las URLs de Wix con tráfico y agrégalas a `_redirects`.
4. **Investigación de palabras clave** — prioriza intención comercial local: "lavado de tanques de agua [ciudad]", "desinfección de tanques", "impermeabilización de tanques", "certificado lavado de tanques", "empresa lavado tanques conjuntos residenciales". Usa Google Keyword Planner (gratis) y las sugerencias de búsqueda.
5. **Páginas por ciudad** — cuando tengas fotos/casos reales de cada zona, crea páginas tipo `/lavado-de-tanques-chia` con contenido **único** (no copiar y cambiar el nombre: Google lo penaliza).
6. **Blog: 2 artículos al mes** respondiendo preguntas reales de clientes: normativa de lavado de tanques en Colombia, cada cuánto lavar, cómo elegir tamaño de tanque, señales de agua contaminada, tanque plástico vs. concreto… Cada artículo enlaza a su servicio.
7. **Segmento B2B** — administradores de propiedad horizontal, colegios, restaurantes y clínicas buscan el certificado. Una página dedicada a "conjuntos residenciales" y otra a "empresas" puede convertir muy bien.
8. **Fotos reales** — antes/después de tanques, con nombres de archivo descriptivos (`lavado-tanque-conjunto-chia.jpg`) y textos `alt` útiles. Evita fotos de stock.
9. **Citaciones locales** — registra el negocio con el mismo NAP en Páginas Amarillas, directorios locales, Facebook, Instagram, cámara de comercio.
10. **Backlinks locales** — alianzas con administradores, ferreterías, constructoras, notas en medios locales.
11. **Medición** — Cloudflare Web Analytics (visitas) + D1 (solicitudes con UTM) + Analytics Engine (clics a WhatsApp). Usa enlaces con `?utm_source=` en redes y Google Business para saber de dónde llegan los clientes.

## Mantenimiento mensual
- Revisar Search Console (errores, consultas que crecen → crear contenido para ellas).
- Publicar 2 artículos y 4+ fotos en Google Business.
- Actualizar `updatedDate` en artículos que se revisen.
