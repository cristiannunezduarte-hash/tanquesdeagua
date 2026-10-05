/**
 * ============================================================
 *  DATOS DEL NEGOCIO — ÚNICA FUENTE DE VERDAD
 * ============================================================
 *  Todo el sitio (textos, SEO, datos estructurados, footer,
 *  botón de WhatsApp) se alimenta de este archivo.
 *
 *  ⚠️ Los valores marcados con  TODO  son de ejemplo:
 *  reemplázalos por los datos reales de la página de Wix
 *  antes de publicar. Google penaliza datos inconsistentes
 *  entre la web, Google Business Profile y directorios (NAP).
 * ============================================================
 */

export const site = {
  // TODO: dominio real que ya está en Cloudflare (sin barra final)
  url: 'https://www.tanquesdeagua.com.co',
  name: 'Tanques de Agua', // TODO: nombre comercial exacto
  legalName: 'Tanques de Agua', // TODO: razón social si aplica
  slogan: 'Agua limpia y segura para tu hogar y tu empresa',
  description:
    'Lavado, desinfección, impermeabilización y mantenimiento de tanques de agua potable para hogares, conjuntos residenciales y empresas. Cotiza gratis por WhatsApp.',
  locale: 'es_CO',
  lang: 'es-CO',
  foundingYear: 2015, // TODO

  contact: {
    phone: '+57 300 000 0000', // TODO: formato visible
    phoneE164: '+573000000000', // TODO: formato internacional sin espacios
    whatsapp: '573000000000', // TODO: solo dígitos, con indicativo
    whatsappMessage: 'Hola, quiero cotizar un servicio para mi tanque de agua.',
    email: 'contacto@tanquesdeagua.com.co', // TODO
  },

  address: {
    street: 'Calle 00 # 00-00', // TODO (o déjalo vacío si atiendes solo a domicilio)
    locality: 'Bogotá', // TODO
    region: 'Cundinamarca', // TODO
    postalCode: '110111', // TODO
    country: 'CO',
    geo: { lat: 4.711, lng: -74.0721 }, // TODO: coordenadas reales del negocio
    mapsUrl: 'https://maps.google.com/?q=Bogot%C3%A1', // TODO: link de tu ficha de Google Business
  },

  // Horario en formato schema.org (24 h)
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '18:00' },
    { days: ['Saturday'], opens: '08:00', closes: '14:00' },
  ],
  openingHoursText: 'Lun a Vie 7:00 a.m. – 6:00 p.m. · Sáb 8:00 a.m. – 2:00 p.m.', // TODO

  // Ciudades / zonas donde prestas servicio (SEO local)
  areaServed: ['Bogotá', 'Soacha', 'Chía', 'Cajicá', 'Zipaquirá', 'Mosquera', 'Funza', 'Madrid'], // TODO

  social: {
    facebook: '', // TODO: https://facebook.com/...
    instagram: '', // TODO
    tiktok: '',
    youtube: '',
  },

  // Cifras de confianza (solo si son reales)
  stats: [
    { value: '+10', label: 'años de experiencia' }, // TODO
    { value: '+2.000', label: 'tanques atendidos' }, // TODO
    { value: '24 h', label: 'respuesta a cotizaciones' }, // TODO
  ],
} as const;

export type Service = {
  slug: string;
  name: string;
  short: string;
  /** Meta description de la página del servicio (≤ 155 caracteres) */
  metaDescription: string;
  icon: 'droplet' | 'shield' | 'wrench' | 'tank' | 'pump' | 'flask';
  /** Nombre del archivo en src/assets/images (opcional) */
  image?: string;
  intro: string;
  includes: string[];
  benefits: string[];
  faqs: { q: string; a: string }[];
};

// TODO: ajustar a los servicios reales que ofrece el negocio en Wix
export const services: Service[] = [
  {
    slug: 'lavado-y-desinfeccion-de-tanques',
    name: 'Lavado y desinfección de tanques',
    short: 'Limpieza profunda, retiro de sedimentos y desinfección para mantener tu agua potable.',
    metaDescription:
      'Lavado y desinfección de tanques de agua potable con certificado. Retiro de lodos, cepillado y desinfección. Cotiza gratis por WhatsApp.',
    icon: 'droplet',
    image: 'lavado.jpg',
    intro:
      'Con el tiempo, los tanques acumulan lodo, sedimentos, biopelícula y microorganismos que afectan el sabor, el olor y la salud del agua. Nuestro servicio de lavado y desinfección deja tu tanque listo para almacenar agua apta para consumo.',
    includes: [
      'Inspección inicial del tanque y sus accesorios',
      'Vaciado controlado y retiro de lodos y sedimentos',
      'Cepillado de paredes, piso y tapa',
      'Desinfección con productos aprobados para agua potable',
      'Enjuague y llenado final',
      'Certificado del servicio para tu administración o entidad de control',
    ],
    benefits: [
      'Agua sin olores ni sabores extraños',
      'Prevención de enfermedades de origen hídrico',
      'Cumplimiento de la normativa sanitaria vigente',
    ],
    faqs: [
      {
        q: '¿Cada cuánto se debe lavar un tanque de agua?',
        a: 'Se recomienda lavar y desinfectar los tanques de agua potable como mínimo cada seis meses, o antes si notas cambios en el color, olor o sabor del agua.',
      },
      {
        q: '¿Cuánto tiempo me quedo sin agua durante el lavado?',
        a: 'Depende de la capacidad del tanque. Un tanque residencial suele quedar listo en pocas horas; coordinamos el horario para que la interrupción sea mínima.',
      },
    ],
  },
  {
    slug: 'impermeabilizacion-de-tanques',
    name: 'Impermeabilización de tanques',
    short: 'Sellamos fisuras y filtraciones con recubrimientos aptos para contacto con agua potable.',
    metaDescription:
      'Impermeabilización de tanques de agua en concreto y mampostería. Reparamos fisuras y filtraciones con materiales aptos para agua potable.',
    icon: 'shield',
    image: 'impermeabilizacion.jpg',
    intro:
      'Las filtraciones hacen perder agua, dañan la estructura y permiten la entrada de contaminantes. Impermeabilizamos tanques de concreto y mampostería con sistemas certificados para contacto con agua potable.',
    includes: [
      'Diagnóstico de fisuras y puntos de filtración',
      'Preparación y limpieza de superficie',
      'Tratamiento de fisuras y juntas',
      'Aplicación de recubrimiento impermeable apto para agua potable',
      'Prueba de estanqueidad',
    ],
    benefits: ['Cero pérdidas de agua', 'Mayor vida útil de la estructura', 'Agua protegida de contaminantes externos'],
    faqs: [
      {
        q: '¿Cuánto dura una impermeabilización?',
        a: 'Con un sistema adecuado y mantenimiento periódico, una impermeabilización puede durar varios años. Te damos garantía por escrito.',
      },
    ],
  },
  {
    slug: 'mantenimiento-y-reparacion-de-tanques',
    name: 'Mantenimiento y reparación',
    short: 'Cambio de flotadores, registros, tapas y accesorios para que todo funcione sin fugas.',
    metaDescription:
      'Mantenimiento y reparación de tanques de agua: flotadores, registros, tapas, tuberías y accesorios. Servicio a domicilio. Cotiza gratis.',
    icon: 'wrench',
    image: 'mantenimiento.jpg',
    intro:
      'Un flotador dañado o una tapa en mal estado pueden desperdiciar cientos de litros o contaminar el agua. Revisamos y reparamos todos los componentes de tu sistema de almacenamiento.',
    includes: [
      'Revisión de flotadores, válvulas y registros',
      'Cambio de tapas y accesorios',
      'Reparación de fugas en tuberías de entrada y salida',
      'Recomendaciones de mantenimiento preventivo',
    ],
    benefits: ['Menos consumo en la factura del agua', 'Sistema funcionando sin sorpresas', 'Atención a domicilio'],
    faqs: [
      {
        q: '¿Atienden emergencias?',
        a: 'Sí, según disponibilidad. Escríbenos por WhatsApp y te confirmamos el tiempo de llegada.',
      },
    ],
  },
  {
    slug: 'venta-e-instalacion-de-tanques',
    name: 'Venta e instalación de tanques',
    short: 'Te asesoramos en la capacidad ideal e instalamos tu tanque con todos sus accesorios.',
    metaDescription:
      'Venta e instalación de tanques de agua plásticos de 250 a 5.000 litros. Asesoría en capacidad, instalación y accesorios. Cotiza gratis.',
    icon: 'tank',
    image: 'instalacion.jpg',
    intro:
      'Te ayudamos a elegir la capacidad adecuada según el número de personas y el consumo, y realizamos la instalación completa con conexiones, flotador y accesorios.',
    includes: [
      'Asesoría de capacidad y ubicación',
      'Suministro del tanque y accesorios',
      'Instalación y conexión hidráulica',
      'Prueba de funcionamiento',
    ],
    benefits: ['Instalación segura y garantizada', 'Asesoría sin costo', 'Reserva de agua ante cortes'],
    faqs: [
      {
        q: '¿Qué tamaño de tanque necesito?',
        a: 'Como referencia, una persona consume en promedio entre 100 y 150 litros al día. Para una familia de 4 personas suele recomendarse un tanque de 1.000 litros o más.',
      },
    ],
  },
];

// Preguntas frecuentes generales (página de inicio + schema FAQPage)
export const faqs = [
  {
    q: '¿Por qué es importante lavar el tanque de agua?',
    a: 'Porque en su interior se acumulan sedimentos, lodo y microorganismos que deterioran la calidad del agua y pueden causar enfermedades gastrointestinales y de la piel.',
  },
  {
    q: '¿Entregan certificado del servicio?',
    a: 'Sí. Al terminar entregamos un certificado del servicio, útil para administraciones de propiedad horizontal, colegios, restaurantes y entidades de control.',
  },
  {
    q: '¿Cómo puedo cotizar?',
    a: 'Escríbenos por WhatsApp o llena el formulario indicando la capacidad aproximada del tanque y la dirección. Respondemos el mismo día hábil.',
  },
  {
    q: '¿En qué zonas prestan servicio?',
    a: `Atendemos ${site.areaServed.join(', ')} y alrededores.`,
  },
];

export const testimonials: { name: string; place: string; text: string }[] = [
  // TODO: agrega reseñas reales (idealmente las mismas de Google Business Profile).
  // Nunca inventes reseñas: Google puede penalizar el sitio.
];

export const whatsappUrl = (msg: string = site.contact.whatsappMessage) =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(msg)}`;
