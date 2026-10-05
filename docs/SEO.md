# Estrategia SEO — Dimafer & Hermaco (Tanques de Agua)

## Lo que ya trae el código

**SEO técnico**
- HTML estático servido desde la CDN de Cloudflare → tiempo de carga < 1 s y Core Web Vitals en verde (Wix suele estar en rojo en móvil).
- CSS en línea, fuente auto-alojada, **cero JavaScript bloqueante**. Turnstile se carga solo cuando el formulario aparece en pantalla.
- Imágenes convertidas automáticamente a AVIF/WebP con tamaños responsivos y `lazy loading`; la imagen principal se carga con prioridad alta (mejora LCP).
- URLs limpias y descriptivas: `/productos/tanques-de-agua-potable`, `/productos/sistemas-septicos`.
- `canonical`, `robots`, `hreflang es-CO`, Open Graph y Twitter Cards en todas las páginas.
- `sitemap-index.xml` automático y `robots.txt` que lo declara.
- Redirecciones **301** desde las URLs de Wix (`public/_redirects`) para no perder autoridad.
- Página 404 útil con enlaces internos; `/gracias` con `noindex`.
- `llms.txt` para buscadores con IA (ChatGPT, Perplexity, AI Overviews).
- HTTPS, HSTS y cabeceras de seguridad.

**Datos estructurados (JSON-LD)**
- `Store`/`HardwareStore` (negocio local) con dirección, geo, teléfono, catálogo de productos y zonas atendidas.
- `ItemPage` por producto, `ItemList`, `FAQPage`, `BreadcrumbList`, `BlogPosting`, `WebSite`.
- Validar en https://search.google.com/test/rich-results y https://validator.schema.org

**Estructura de contenido**
- Una página por línea de producto (cada una apunta a una palabra clave distinta).
- Título con palabra clave + ciudad, un solo `<h1>` por página, jerarquía H2/H3.
- Enlazado interno: inicio → productos → otros productos → blog → producto relacionado.
- Blog con Markdown para publicar contenido informativo.

## Recomendaciones (en orden de impacto)

1. **Google Business Profile** — es el factor nº 1 en búsquedas locales ("tanques de agua cerca de mí"). Completa el perfil al 100 %, misma dirección/teléfono que la web (NAP idéntico), categorías correctas, fotos reales cada semana y responde todas las reseñas. Pide reseña a cada cliente (envía el link por WhatsApp al terminar).
2. **Google Search Console** — verifica el dominio (registro TXT en el DNS de Cloudflare, 1 clic), envía `sitemap-index.xml` y revisa el informe de páginas. Haz lo mismo en **Bing Webmaster Tools** (alimenta también a ChatGPT/Copilot).
3. **Migración sin perder posiciones** — antes de apuntar el dominio, exporta de Search Console las URLs de Wix con tráfico y agrégalas a `_redirects`.
4. **Palabras clave** — prioriza intención de compra: "tanques de agua Bogotá", "tanque de agua 1000 litros precio", "tanque de 2000 / 5000 litros", "tanques Polinter", "tanque cafetero", "bebedero para ganado", "pozo séptico prefabricado", "tanque séptico para finca", "válvula de bola", "trampa de grasas". Usa Google Keyword Planner (gratis) y las sugerencias de búsqueda.
5. **Páginas por capacidad y referencia** — la gente busca por litros. Crear páginas como `/productos/tanque-de-agua-1000-litros` con ficha técnica (medidas, peso, material, garantía) es la mayor oportunidad SEO de este negocio. Si muestras precios o "desde $", aún mejor (y habilita datos estructurados `Product` con `Offer`).
6. **Blog: 2 artículos al mes** — ideas: cómo elegir el tamaño del tanque (ya hay borrador), cómo instalar un tanque elevado, qué es y cómo funciona un pozo séptico, tanque cafetero vs. tina de fermentación, cuántos litros toma una vaca al día, tipos de válvulas. Cada artículo enlaza a su producto.
7. **Segmento B2B / agro** — constructoras, maestros de obra, fincas cafeteras y ganaderas: una página por sector con casos reales convierte muy bien.
8. **Fotos reales** — productos en bodega, entregas e instalaciones, con nombres descriptivos (`tanque-polinter-2000-litros.jpg`) y textos `alt` útiles. Reemplazar fotos de banco.
9. **Citaciones locales** — mismo nombre, dirección y teléfono en Páginas Amarillas, directorios ferreteros, Facebook, Instagram, Mercado Libre/Marketplace.
10. **Backlinks** — que el fabricante (p. ej. Polinter) te liste como distribuidor con enlace, gremios cafeteros y ganaderos, constructoras.
11. **Medición** — Cloudflare Web Analytics (visitas) + D1 (solicitudes con UTM) + Analytics Engine (clics a WhatsApp). Usa enlaces con `?utm_source=` en redes y Google Business para saber de dónde llegan los clientes.

## Mantenimiento mensual
- Revisar Search Console (errores, consultas que crecen → crear contenido para ellas).
- Publicar 2 artículos y 4+ fotos en Google Business.
- Actualizar `updatedDate` en artículos que se revisen.
