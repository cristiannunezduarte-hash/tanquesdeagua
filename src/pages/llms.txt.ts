// Resumen del negocio para buscadores con IA (ChatGPT, Perplexity, Google AI Overviews…)
import type { APIRoute } from 'astro';
import { site, services, faqs } from '../data/site';

export const GET: APIRoute = () => {
  const u = (p: string) => new URL(p, site.url).href;
  const body = `# ${site.name}

> ${site.description}

- Ubicación: ${site.address.locality}, ${site.address.region}, Colombia
- Zonas de servicio: ${site.areaServed.join(', ')}
- Teléfono / WhatsApp: ${site.contact.phone}
- Correo: ${site.contact.email}
- Horario: ${site.openingHoursText}

## Servicios
${services.map((s) => `- [${s.name}](${u(`/servicios/${s.slug}`)}): ${s.short}`).join('\n')}

## Preguntas frecuentes
${faqs.map((f) => `- ${f.q} ${f.a}`).join('\n')}

## Páginas
- [Inicio](${u('/')})
- [Nosotros](${u('/nosotros')})
- [Contacto](${u('/contacto')})
- [Blog](${u('/blog')})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
