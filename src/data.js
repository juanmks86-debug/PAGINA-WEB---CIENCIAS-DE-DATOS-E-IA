// Grupo de WhatsApp para ingresantes
export const WHATSAPP_GRUPO = 'https://chat.whatsapp.com/Dg4K0qlm9Nb0gduLnr9gym'

export const tabs = [
  ['Perfil profesional', 'user', ['Analiza datos para resolver problemas reales', 'Construye modelos predictivos', 'Comunica resultados con claridad']],
  ['Objetivos', 'target', ['Formar profesionales en análisis de datos', 'Aplicar estadística e inteligencia artificial', 'Impulsar la investigación y la innovación']],
  ['Campo laboral', 'briefcase', ['Empresas de tecnología y finanzas', 'Salud, industria y gobierno', 'Investigación y consultoría']],
  ['Aptitudes y habilidades', 'bolt', ['Pensamiento lógico y crítico', 'Programación en Python y SQL', 'Trabajo en equipo y comunicación']],
]

export const internships = [
  ['Análisis de datos en empresas', 'Practica con bases de datos reales y tableros de seguimiento.', '#2b3c4a', 'chart'],
  ['Laboratorios de investigación', 'Colabora en proyectos con equipos científicos y docentes.', '#3a4f5f', 'flask'],
  ['Proyectos de inteligencia artificial', 'Entrena y evalúa modelos en proyectos de aplicación.', '#51697c', 'net'],
]

// Fechas importantes del calendario (AAAA-MM-DD)
export const events = {
  '2026-10-15': 'Cierre de inscripciones',
  '2026-10-26': 'Inicio de clases',
  '2026-11-13': 'Primer parcial',
  '2026-11-27': 'Entrega de proyectos',
  '2026-10-16': 'Expo Educativa Perico',
}

export const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

export const faqs = [
  ['¿Cuánto dura la carrera?', 'La carrera dura 3 años. Todas las materias son anuales y se cursa de forma 100% presencial.'],
  ['¿Qué conocimientos previos necesito?', 'Matemática básica y ganas de aprender. Los lenguajes de programación se enseñan desde cero.'],
  ['¿Hay actividades de investigación?', 'Sí. Podés sumarte a proyectos de investigación desde el segundo año.'],
  ['¿Cómo me inscribo?', 'Inscribite desde https://nexo.jujuy.edu.ar/'],
  ['¿Hay un grupo para ingresantes?', 'Sí, el profesor armó un grupo de WhatsApp para ingresantes: ' + WHATSAPP_GRUPO],
]

// Redes sociales: reemplazá '#' por el enlace real de cada red
export const social = { facebook: '#', youtube: '#', instagram: 'https://www.instagram.com/tec.sup.cienciadedatoseia' }

// Ubicación: MAPS_LINK abre Google Maps y MAP_EMBED es el mapa incrustado del pie.
// Para cambiarlo: en Google Maps > Compartir > Insertar un mapa, copiá solo la dirección que está dentro de src="...".
export const MAPS_LINK = 'https://maps.app.goo.gl/TuMw32iQ9HTFHhQK'
export const MAP_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.0543314193674!2d-65.12723242567779!3d-24.379413292153174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941bad1aff2b443d%3A0xcd6d3e5c35073d23!2sInstituto%20de%20Educaci%C3%B3n%20Superior%20N%C2%B06!5e0!3m2!1ses!2sar!4v1792150190175!5m2!1ses!2sar'

export const coordinador = { nombre: 'Federico Torres', iniciales: 'FT', foto: '/equipo/coordinador.jpg' }

// Contacto: completá teléfono y correo (si quedan vacíos, esas tarjetas no se muestran)
export const contacto = { telefono: '', correo: '' }

// Datos destacados (contadores animados): [número, sufijo, texto]
export const stats = [
  [3, '', 'años de duración'],
  [25, '', 'materias anuales'],
  [2912, '', 'horas cátedra'],
  [100, '%', 'presencial'],
]


// Equipo creador: hasta 4 integrantes por categoría.
// foto: ruta de una imagen dentro de public/ (ej: '/equipo/ana.jpg'). Si queda vacía se muestran las iniciales.
// pos (opcional): encuadre de la foto, ej. '50% 8%' (horizontal vertical) para subir o bajar la cara en la tarjeta.
const demo = 'Escribí acá una descripción breve de su aporte al proyecto.'
export const equipos = [
  {
    id: 'infra', corto: 'Infraestructura y Despliegue', nombre: 'Infraestructura y Despliegue',
    lema: 'Servidores, redes y despliegue continuo',
    miembros: [
      { nombre: 'Nombre Apellido', rol: 'Servidores y despliegue', desc: demo, foto: '' },
      { nombre: 'Nombre Apellido', rol: 'Redes y seguridad', desc: demo, foto: '' },
      { nombre: 'Nombre Apellido', rol: 'Base de datos', desc: demo, foto: '' },
      { nombre: 'Nombre Apellido', rol: 'Soporte técnico', desc: demo, foto: '' },
    ],
  },
  {
    id: 'dev', corto: 'Desarrollo y Diseño Web', nombre: 'Desarrollo y Diseño Web',
    lema: 'Código limpio e interfaces con identidad',
    miembros: [
      { nombre: 'Nombre Apellido', rol: 'Desarrollo front-end', desc: demo, foto: '' },
      { nombre: 'Juan Israel Flores', rol: 'Back-end y Andresito', desc: 'Desarrolla el back-end de la página y el asistente virtual Andresito.', foto: '/equipo/backend.jpg', pos: '50% 8%' },
      { nombre: 'Nombre Apellido', rol: 'Diseño UI/UX', desc: demo, foto: '' },
    ],
  },
  {
    id: 'press', corto: 'Contenido y Prensa', nombre: 'Contenido y Prensa',
    lema: 'Las historias de la carrera, bien contadas',
    miembros: [
      { nombre: 'Nombre Apellido', rol: 'Redacción', desc: demo, foto: '' },
      { nombre: 'Nombre Apellido', rol: 'Fotografía y video', desc: demo, foto: '' },
      { nombre: 'Nombre Apellido', rol: 'Redes sociales', desc: demo, foto: '' },
      { nombre: 'Nombre Apellido', rol: 'Prensa y difusión', desc: demo, foto: '' },
    ],
  },
  {
    id: 'data', corto: 'Analítica y Marketing', nombre: 'Analítica y Marketing',
    lema: 'Datos para entender y llegar a más estudiantes',
    miembros: [
      { nombre: 'Nombre Apellido', rol: 'Analítica de datos', desc: demo, foto: '' },
      { nombre: 'Nombre Apellido', rol: 'Estrategia de marketing', desc: demo, foto: '' },
      { nombre: 'Nombre Apellido', rol: 'Métricas y reportes', desc: demo, foto: '' },
      { nombre: 'Nombre Apellido', rol: 'Campañas', desc: demo, foto: '' },
    ],
  },
]

// Próximos eventos. fecha en formato AAAA-MM-DD; el evento se oculta solo cuando pasa esa fecha.
// flyer: imagen dentro de public/eventos/. enlace (opcional): botón "Más información".
export const eventosProximos = [
  {
    titulo: 'Expo Educativa Ciudad Perico 2026',
    fecha: '2026-10-16',
    hora: '09:00 a 18:00 hs',
    lugar: 'IES N.º 6 - Perico (frente a la Cooperativa de Tabacaleros)',
    desc: 'Educar es abrir caminos: más oportunidades, más herramientas, más futuro.',
    flyer: '/eventos/expo-educativa-2026.jpg',
    alt: 'Flyer de la Expo Educativa Ciudad Perico 2026: 16 de octubre de 2026, de 09:00 a 18:00 hs, en el IES N.º 6 de Perico, frente a la Cooperativa de Tabacaleros.',
    enlace: '',
  },
]

// Noticias IA (carrusel). Son resúmenes de informes publicados; cada tarjeta indica su fuente.
// enlace: dirección directa a la fuente. Si falta, el botón abre una búsqueda en Google con el texto de "busqueda".
// Para agregar una noticia nueva, copiá un bloque y cambiá los datos. cifra/cifraTxt es el dato destacado de la miniatura.
export const noticias = [
  {
    categoria: 'GLOBAL · FORO ECONÓMICO MUNDIAL',
    titulo: 'Hacia 2030 se crearán 170 millones de empleos y se perderán 92 millones',
    fecha: 'Enero 2025',
    cifra: '+78 M', cifraTxt: 'empleos netos al 2030', colores: ['#0b57a4', '#2a9d9a'],
    texto: 'El informe "The Future of Jobs 2025" estima que el 39 % de las habilidades clave cambiará hasta 2030. Las que más crecen son las de IA y big data, ciberseguridad y alfabetización tecnológica. Se basa en una encuesta a más de 1.000 empleadores de 55 economías.',
    fuente: 'World Economic Forum',
    enlace: 'https://www.weforum.org/publications/the-future-of-jobs-report-2025/',
  },
  {
    categoria: 'GLOBAL · FONDO MONETARIO INTERNACIONAL',
    titulo: 'El FMI calcula que cerca del 40 % del empleo mundial está expuesto a la IA',
    fecha: 'Enero 2024',
    cifra: '40 %', cifraTxt: 'del empleo mundial expuesto', colores: ['#5b21b6', '#2563eb'],
    texto: 'En las economías avanzadas la exposición ronda el 60 % y en los países de bajos ingresos el 26 %. La IA puede mejorar la productividad en una parte de esos puestos y reducir la demanda en otros.',
    fuente: 'Fondo Monetario Internacional',
    enlace: 'https://www.imf.org/en/Blogs/Articles/2024/01/14/ai-will-transform-the-global-economy-lets-make-sure-it-benefits-humanity',
  },
  {
    categoria: 'GLOBAL · ORGANIZACIÓN INTERNACIONAL DEL TRABAJO',
    titulo: 'La OIT: uno de cada cuatro empleos tiene exposición a la IA generativa',
    fecha: 'Mayo 2025',
    cifra: '1 de 4', cifraTxt: 'empleos con exposición', colores: ['#0f766e', '#0b57a4'],
    texto: 'Un estudio de la OIT y el instituto polaco NASK concluye que los puestos administrativos son los más expuestos y que, en la mayoría de los casos, la IA transformará tareas antes que reemplazar ocupaciones completas.',
    fuente: 'OIT y NASK',
    busqueda: 'OIT NASK Generative AI and Jobs: A Refined Global Index of Occupational Exposure 2025',
  },
  {
    categoria: 'EUROPA · UNIÓN EUROPEA',
    titulo: 'La Ley de IA europea clasifica como de alto riesgo la IA usada para contratar personal',
    fecha: 'Agosto 2024',
    cifra: 'UE', cifraTxt: 'ley integral de IA en vigor', colores: ['#1d4ed8', '#0891b2'],
    texto: 'El reglamento, vigente desde el 1 de agosto de 2024, trata como de alto riesgo los sistemas que seleccionan o evalúan trabajadores y prohíbe inferir emociones en el lugar de trabajo, salvo por razones médicas o de seguridad. Sus obligaciones se aplican de forma gradual.',
    fuente: 'Comisión Europea',
    enlace: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
  },
  {
    categoria: 'EE. UU. · MCKINSEY GLOBAL INSTITUTE',
    titulo: 'EE. UU.: hasta el 30 % de las horas trabajadas podría automatizarse hacia 2030',
    fecha: 'Julio 2023',
    cifra: '30 %', cifraTxt: 'de las horas, al 2030', colores: ['#b45309', '#be123c'],
    texto: 'El informe calcula que unos 12 millones de trabajadores estadounidenses tendrían que cambiar de ocupación, sobre todo en apoyo administrativo, atención al cliente y servicios de comida, mientras crecería la demanda en salud y profesiones técnicas.',
    fuente: 'McKinsey Global Institute',
    busqueda: 'McKinsey Global Institute Generative AI and the future of work in America 2023',
  },
  {
    categoria: 'GLOBAL · MICROSOFT Y LINKEDIN',
    titulo: 'Work Trend Index: el 75 % de los trabajadores del conocimiento ya usa IA',
    fecha: 'Mayo 2024',
    cifra: '75 %', cifraTxt: 'usa IA en el trabajo', colores: ['#0e7490', '#4338ca'],
    texto: 'La encuesta a 31.000 personas de 31 países halló además que el 66 % de los líderes no contrataría a alguien sin habilidades de IA, una señal clara de lo que piden hoy las empresas.',
    fuente: 'Microsoft y LinkedIn',
    busqueda: 'Microsoft LinkedIn Work Trend Index 2024 AI at Work Is Here',
  },
]


// Recursos del panel de alumnos
export const studentYears = [
  { title: 'Ingresantes', description: 'Material de ingreso, guías introductorias, ejercicios de nivelación y tutoriales.', materials: 8, icon: 'rocket', badge: 'Sección temporal' },
  { title: '1.º Año', description: 'Apuntes organizados por materia, resúmenes y trabajos prácticos.', materials: 12, icon: 'book' },
  { title: '2.º Año', description: 'Materiales de cursada, ejercicios resueltos, prácticas de programación y bases de datos.', materials: 18, icon: 'database' },
  { title: '3.º Año', description: 'Apuntes avanzados, proyectos integradores y material para evaluaciones finales.', materials: 24, icon: 'brain' },
]

export const projects = [
  { title: 'Dashboard de análisis de datos', category: 'Datos', description: 'Visualización de información y generación de indicadores.', tone: 'dashboard-art', symbol: '▥', code: '01 / DATA' },
  { title: 'Asistente virtual educativo', category: 'Inteligencia artificial', description: 'Un chatbot para responder consultas y orientar a estudiantes.', tone: 'ai-art', symbol: '✦', code: '02 / IA' },
  { title: 'Sistema de gestión', category: 'Desarrollo', description: 'Una aplicación que organiza información y automatiza tareas.', tone: 'dev-art', symbol: '</>', code: '03 / DEV' },
  { title: 'App de monitoreo ambiental', category: 'Web', description: 'Registro y análisis de datos para el cuidado del medio ambiente.', tone: 'web-art', symbol: '⌁', code: '04 / WEB' },
]

export const resources = [
  { title: 'Buscar apuntes', description: 'Encontrá rápidamente lo que necesitás.', icon: '⌕', href: '#banco-apuntes' },
  { title: 'Agenda académica', description: 'Fechas de exámenes y entregas.', icon: '▦', href: '#calendario' },
  { title: 'Ayudante de IA', description: 'Consultas, resúmenes y más.', icon: '✦', href: '#alumnos' },
  { title: 'Compartir material', description: 'Solo compartí el link de tu Drive.', icon: '↗', href: '#alumnos' },
]

export const recentNotes = [
  { title: 'Resumen de Machine Learning', year: '3.º Año', subject: '22 abr. 2025' },
  { title: 'Guía de Python: Listas y Diccionarios', year: '2.º Año', subject: '20 abr. 2025' },
  { title: 'Trabajo Práctico - Bases de Datos', year: '1.º Año', subject: '18 abr. 2025' },
  { title: 'Apunte de Estadística', year: '2.º Año', subject: '15 abr. 2025' },
]
