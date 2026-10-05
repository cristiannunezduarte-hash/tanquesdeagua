/**
 * Generadores de datos estructurados (schema.org / JSON-LD).
 * Le dicen a Google exactamente qué es el negocio, dónde está,
 * qué productos ofrece y cuáles son sus preguntas frecuentes.
 * Validar en: https://search.google.com/test/rich-results
 */
import { site, products, type Product } from '../data/site';

const abs = (path: string) => new URL(path, site.url).href;
export const BUSINESS_ID = `${site.url}/#negocio`;
const WEBSITE_ID = `${site.url}/#web`;

export function localBusinessSchema() {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    '@type': ['Store', 'HardwareStore'],
    '@id': BUSINESS_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: `${site.name} – ${site.tagline}`,
    description: site.description,
    slogan: site.slogan,
    url: site.url,
    logo: abs('/logo.png'),
    image: abs('/og-default.jpg'),
    telephone: site.contact.phoneE164,
    email: site.contact.email,
    foundingDate: String(site.foundingYear),
    currenciesAccepted: 'COP',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      ...(site.address.postalCode ? { postalCode: site.address.postalCode } : {}),
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.address.geo.lat, longitude: site.address.geo.lng },
    hasMap: site.address.mapsUrl,
    areaServed: site.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
    ...(site.openingHours.length
      ? {
          openingHoursSpecification: site.openingHours.map((h) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: h.days,
            opens: h.opens,
            closes: h.closes,
          })),
        }
      : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.contact.phoneE164,
      email: site.contact.email,
      contactType: 'sales',
      areaServed: 'CO',
      availableLanguage: 'Spanish',
    },
    knowsAbout: ['Tanques de agua', 'Almacenamiento de agua', 'Sistemas sépticos', 'Valvulería', 'Recursos hídricos'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Productos',
      itemListElement: products.map((p) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Product', name: p.name, description: p.summary, url: abs(`/productos/${p.slug}`) },
      })),
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.name,
    inLanguage: site.lang,
    publisher: { '@id': BUSINESS_ID },
  };
}

export function productPageSchema(p: Product, url: string, imageUrl?: string) {
  return {
    '@type': 'ItemPage',
    '@id': `${abs(url)}#pagina`,
    url: abs(url),
    name: p.name,
    description: p.metaDescription,
    inLanguage: site.lang,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': BUSINESS_ID },
    ...(imageUrl ? { primaryImageOfPage: { '@type': 'ImageObject', url: abs(imageUrl) } } : {}),
  };
}

export function faqSchema(items: readonly { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.url),
    })),
  };
}

export function articleSchema(a: {
  title: string;
  description: string;
  url: string;
  image?: string;
  published: Date;
  updated?: Date;
  author: string;
}) {
  return {
    '@type': 'BlogPosting',
    headline: a.title,
    description: a.description,
    mainEntityOfPage: abs(a.url),
    image: a.image ? abs(a.image) : abs('/og-default.jpg'),
    datePublished: a.published.toISOString(),
    dateModified: (a.updated ?? a.published).toISOString(),
    author: { '@type': 'Person', name: a.author },
    publisher: { '@id': BUSINESS_ID },
    inLanguage: site.lang,
  };
}

/** Une varios nodos en un único @graph */
export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
