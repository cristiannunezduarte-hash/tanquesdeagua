// Resumen del negocio para buscadores con IA (ChatGPT, Perplexity, Google AI Overviews…)
import type { APIRoute } from 'astro';
import { site, products, faqs } from '../data/site';

export const GET: APIRoute = () => {
  const u = (p: string) => new URL(p, site.url).href;
  const body = `# ${site.name}

> ${site.description}

- Empresa: ${site.legalName}. 45 años en el sector ferretero, especializada en recursos hídricos.
- Dirección: ${site.address.street}, ${site.address.locality}, Colombia
- Cobertura: ${site.areaServed.join(', ')}
- Teléfono / WhatsApp: ${site.contact.phone}
- Correo: ${site.contact.email}

## Productos
${products.map((p) => `- [${p.name}](${u(`/productos/${p.slug}`)}): ${p.summary}`).join('\n')}

## Sectores
- Residencial, Construcción y Agropecuario (cafetero, ganadero, riego)

## Preguntas frecuentes
${faqs.map((f) => `- ${f.q} ${f.a}`).join('\n')}

## Páginas
- [Inicio](${u('/')})
- [Productos](${u('/productos')})
- [Nosotros](${u('/nosotros')})
- [Contacto](${u('/contacto')})
- [Blog](${u('/blog')})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
