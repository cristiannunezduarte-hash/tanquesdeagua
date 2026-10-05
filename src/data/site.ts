/**
 * ============================================================
 *  DATOS DEL NEGOCIO — ÚNICA FUENTE DE VERDAD
 * ============================================================
 *  Todo el sitio (textos, SEO, datos estructurados, footer,
 *  botón de WhatsApp) se alimenta de este archivo.
 *
 *  Datos tomados de la página de Wix. Los marcados con  TODO
 *  hay que confirmarlos antes de publicar: Google penaliza datos
 *  inconsistentes entre la web, Google Business Profile y
 *  directorios (nombre, dirección y teléfono = NAP).
 * ============================================================
 */

export const site = {
  // Dominio oficial (sin barra final). Es la URL "canónica" que verá Google.
  url: 'https://tanquesdeagua.co',
  name: 'Dimafer & Hermaco',
  legalName: 'Dimafer & Hermaco S.A.S.',
  tagline: 'Tanques de agua',
  slogan: 'Tanques de agua con la mejor resistencia y la asesoría que necesitas',
  description:
    'Tanques de agua potable, tanques cafeteros y ganaderos, sistemas sépticos y valvulería en Bogotá. 45 años de experiencia y asesoría técnica especializada. ¡Cotiza ya!',
  locale: 'es_CO',
  lang: 'es-CO',
  foundingYear: 1980, // "45 años de experiencia" (TODO: confirmar año exacto)

  contact: {
    phone: '310 850 0673',
    phoneE164: '+573108500673',
    whatsapp: '573108500673', // TODO: confirmar que este número tiene WhatsApp
    whatsappMessage: 'Hola, quiero cotizar un tanque de agua.',
    email: 'ventas@dimaferyhermaco.com',
  },

  address: {
    street: 'Carrera 15 # 12-16',
    locality: 'Bogotá',
    region: 'Bogotá D.C.',
    postalCode: '', // TODO
    country: 'CO',
    geo: { lat: 4.6047, lng: -74.0836 }, // TODO: verificar con el pin exacto de Google Maps
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Carrera+15+%2312-16+Bogot%C3%A1', // TODO: link de la ficha de Google Business
  },

  // Horario en formato schema.org (24 h). TODO: completar con el horario real.
  // Ejemplo: { days: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '17:30' }
  openingHours: [] as { days: string[]; opens: string; closes: string }[],
  openingHoursText: '', // TODO: p. ej. 'Lun a Vie 8:00 a.m. – 5:30 p.m. · Sáb 8:00 a.m. – 1:00 p.m.'

  // Zonas donde vendes / despachas (SEO local). TODO: ajustar
  areaServed: ['Bogotá', 'Cundinamarca'],

  social: {
    facebook: '', // TODO
    instagram: '', // TODO
    tiktok: '',
    youtube: '',
  },

  stats: [
    { value: '45', label: 'años de experiencia' },
    { value: '5', label: 'líneas de producto' },
    { value: '3', label: 'sectores atendidos' },
  ],
} as const;

export type IconName = 'droplet' | 'shield' | 'wrench' | 'tank' | 'pump' | 'flask' | 'coffee' | 'cow' | 'valve' | 'septic';

export type Product = {
  slug: string;
  name: string;
  /** Nombre corto para menús y el formulario */
  short: string;
  /** Resumen de 1–2 frases */
  summary: string;
  /** Meta description (≤ 155 caracteres) */
  metaDescription: string;
  icon: IconName;
  /** Foto del producto (fondo blanco) en src/assets/images */
  image: string;
  /** Foto de ambiente/uso en src/assets/images */
  scene?: string;
  intro: string[];
  features: string[];
  uses: string[];
  faqs: { q: string; a: string }[];
};

export const products: Product[] = [
  {
    slug: 'tanques-de-agua-potable',
    name: 'Tanques de agua potable',
    short: 'Tanque de agua potable',
    summary:
      'Diseñados para almacenar grandes volúmenes de agua y garantizar su disponibilidad para uso doméstico, industrial o agrícola.',
    metaDescription:
      'Tanques de agua potable para casa, edificio, industria y finca en Bogotá. Reserva de agua ante cortes o escasez. Asesoría para elegir la capacidad. Cotiza.',
    icon: 'tank',
    image: 'tanque-agua-potable.png',
    scene: 'agua-almacenada.jpg',
    intro: [
      'Nuestros tanques de agua están diseñados para almacenar grandes volúmenes de agua, garantizando su disponibilidad para uso doméstico, industrial o agrícola.',
      'Son una reserva vital en situaciones de emergencia, cortes del servicio o escasez hídrica. Te asesoramos para elegir la capacidad y el tipo de tanque según tu consumo y el espacio disponible.',
    ],
    features: [
      'Aptos para almacenar agua para consumo humano',
      'Tapa de cierre para proteger el agua de contaminantes',
      'Material resistente al sol y a la intemperie',
      'Diferentes capacidades para cada necesidad', // TODO: listar capacidades disponibles (p. ej. 250 L a 20.000 L)
    ],
    uses: ['Casas y apartamentos', 'Edificios y conjuntos residenciales', 'Obras de construcción', 'Industria y comercio', 'Fincas'],
    faqs: [
      {
        q: '¿Qué tamaño de tanque de agua necesito?',
        a: 'Como referencia, una persona consume en promedio entre 100 y 150 litros de agua al día. Para una familia de 4 personas suele recomendarse un tanque de 1.000 litros o más para cubrir un día de corte. Te asesoramos sin costo según tu caso.',
      },
      {
        q: '¿Los tanques sirven para agua de consumo humano?',
        a: 'Sí, los tanques de agua potable están fabricados con materiales aptos para almacenar agua de consumo humano.',
      },
    ],
  },
  {
    slug: 'tanques-cafeteros',
    name: 'Tanques para el sector cafetero',
    short: 'Tanque cafetero',
    summary:
      'Alternativas para acompañar al caficultor en las diferentes etapas del proceso, con ahorro en el consumo general de agua.',
    metaDescription:
      'Tanques cafeteros con bordes redondeados y vida útil de hasta 15 años. Ahorra agua en el beneficio del café. Asesoría técnica y cotización en Bogotá.',
    icon: 'coffee',
    image: 'tanque-cafetero.jpg',
    intro: [
      'Ofrecemos alternativas para acompañar al productor de café en las diferentes etapas del proceso, dando como resultado un ahorro en el consumo general del agua.',
      'Están diseñados con bordes redondeados que otorgan mayor resistencia y una vida útil de hasta 15 años.',
    ],
    features: [
      'Bordes redondeados para mayor resistencia',
      'Vida útil de hasta 15 años',
      'Diseño que facilita el ahorro de agua en el proceso',
      'Fondo cónico con salida inferior para facilitar el vaciado',
    ],
    uses: ['Beneficio del café', 'Fermentación y lavado', 'Fincas cafeteras'],
    faqs: [
      {
        q: '¿Cuánto dura un tanque cafetero?',
        a: 'Gracias a su diseño con bordes redondeados, nuestros tanques cafeteros tienen una vida útil de hasta 15 años.',
      },
    ],
  },
  {
    slug: 'tanques-ganaderos',
    name: 'Tanques para el sector ganadero',
    short: 'Tanque ganadero',
    summary:
      'Bebederos y comederos que proporcionan agua y comida fresca y limpia a los animales de forma continua.',
    metaDescription:
      'Tanques ganaderos, bebederos y comederos para ganado. Agua y alimento limpios de forma continua para mejor salud y producción. Cotiza en Bogotá.',
    icon: 'cow',
    image: 'tanque-ganadero-comedero.png',
    scene: 'sector-ganadero.jpg',
    intro: [
      'Tanques diseñados para proporcionar agua y comida fresca y limpia a los animales de forma continua, promoviendo la hidratación, la alimentación y el bienestar del ganado.',
      'Un buen suministro de agua y alimento se traduce en mejoras en la salud de los animales y en el rendimiento de la producción.',
    ],
    features: [
      'Bebederos y comederos de alta resistencia',
      'Fáciles de limpiar',
      'Resistentes al sol y al uso en potrero',
      'Ayudan a mantener agua y alimento limpios',
    ],
    uses: ['Ganadería de leche', 'Ganadería de carne', 'Porcicultura y otras especies'],
    faqs: [
      {
        q: '¿Qué beneficios tiene un buen bebedero para el ganado?',
        a: 'Garantiza agua limpia y disponible de forma continua, lo que mejora la hidratación, la salud y la productividad de los animales.',
      },
    ],
  },
  {
    slug: 'sistemas-septicos',
    name: 'Sistemas sépticos',
    short: 'Sistema séptico',
    summary:
      'Solución eficiente para el tratamiento de aguas residuales, de fácil instalación y mantenimiento.',
    metaDescription:
      'Sistemas sépticos para tratamiento de aguas residuales en fincas, casas campestres y obras. Fácil instalación y mantenimiento. Asesoría y cotización.',
    icon: 'septic',
    image: 'sistema-septico.png',
    scene: 'tratamiento-aguas-residuales.jpg',
    intro: [
      'Los sistemas sépticos son una solución eficiente para el tratamiento de aguas residuales donde no hay conexión al alcantarillado.',
      'Contribuyen a la conservación del medio ambiente y a la salud pública, con una gran facilidad de instalación y mantenimiento.',
    ],
    features: [
      'Tanque séptico, trampa de grasas y caja de distribución',
      'Fácil instalación',
      'Bajo mantenimiento',
      'Protege fuentes de agua y suelos',
    ],
    uses: ['Fincas y casas campestres', 'Condominios rurales', 'Obras y campamentos', 'Restaurantes en carretera'],
    faqs: [
      {
        q: '¿Para qué sirve un sistema séptico?',
        a: 'Trata las aguas residuales de viviendas o instalaciones que no están conectadas al alcantarillado, evitando la contaminación del suelo y de las fuentes de agua.',
      },
      {
        q: '¿Qué tamaño de sistema séptico necesito?',
        a: 'Depende del número de personas que usan la vivienda o instalación. Cuéntanos tu caso y te asesoramos.',
      },
    ],
  },
  {
    slug: 'valvuleria',
    name: 'Valvulería',
    short: 'Valvulería',
    summary:
      'Válvulas de compuerta, bola y mariposa para controlar el flujo de líquidos y gases.',
    metaDescription:
      'Valvulería en Bogotá: válvulas de bola, compuerta y mariposa para sistemas hidráulicos, industriales y agrícolas. Asesoría técnica y cotización.',
    icon: 'valve',
    image: 'valvula-de-bola.png',
    scene: 'valvuleria-campo.jpg',
    intro: [
      'Las válvulas son dispositivos clave para controlar el flujo de líquidos y gases en sistemas residenciales, industriales y agrícolas.',
      'Están disponibles en varios tipos, como compuerta, bola y mariposa, cada uno diseñado para adaptarse a diferentes aplicaciones y necesidades específicas.',
    ],
    features: ['Válvulas de bola', 'Válvulas de compuerta', 'Válvulas de mariposa', 'Diferentes diámetros y materiales'],
    uses: ['Redes hidráulicas', 'Sistemas de riego', 'Industria', 'Construcción'],
    faqs: [
      {
        q: '¿Qué diferencia hay entre una válvula de bola y una de compuerta?',
        a: 'La válvula de bola abre y cierra con un cuarto de vuelta y es ideal para cortes rápidos; la de compuerta abre y cierra de forma gradual y se usa cuando la válvula permanece totalmente abierta o cerrada por largos periodos.',
      },
    ],
  },
];

export const sectors = [
  {
    name: 'Residencial',
    text: 'Almacenamiento de agua para casas, edificios y conjuntos. Reserva ante cortes del servicio.',
    image: 'agua-almacenada.jpg',
  },
  {
    name: 'Construcción',
    text: 'Suministro de tanques, sistemas sépticos y valvulería para obras y proyectos.',
    image: 'sector-construccion.jpg',
  },
  {
    name: 'Agropecuario',
    text: 'Soluciones para fincas cafeteras, ganaderas y sistemas de riego.',
    image: 'sistema-de-riego.jpg',
  },
];

// Preguntas frecuentes generales (página de inicio + schema FAQPage)
export const faqs = [
  {
    q: '¿Qué productos venden?',
    a: 'Tanques de agua potable, tanques para el sector cafetero, tanques y bebederos para el sector ganadero, sistemas sépticos y valvulería.',
  },
  {
    q: '¿Ofrecen asesoría para elegir el tanque?',
    a: 'Sí. Te ayudamos a elegir el tipo y la capacidad ideal, y acompañamos con asesoría y servicio técnico especializado para diseñar, implementar y mantener tu sistema de agua.',
  },
  {
    q: '¿Dónde están ubicados?',
    a: `Estamos en ${site.address.street}, ${site.address.locality}, Colombia.`,
  },
  {
    q: '¿Cómo puedo cotizar?',
    a: 'Escríbenos por WhatsApp, llámanos o llena el formulario indicando el producto que te interesa. Te respondemos lo antes posible.',
  },
  // TODO: agregar "¿Hacen envíos fuera de Bogotá?" con la respuesta real
];

export const testimonials: { name: string; place: string; text: string }[] = [
  // TODO: agrega reseñas reales (idealmente las mismas de Google Business Profile).
  // Nunca inventes reseñas: Google puede penalizar el sitio.
];

export const whatsappUrl = (msg: string = site.contact.whatsappMessage) =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(msg)}`;
