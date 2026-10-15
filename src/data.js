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
export const social = { facebook: '#', youtube: '#', instagram: '#' }

// Ubicación: MAPS_LINK abre Google Maps. Si escribís la dirección en MAP_QUERY
// (ej: 'Calle 123, Perico, Jujuy'), se muestra además el mapa incrustado en el pie.
export const MAPS_LINK = 'https://maps.app.goo.gl/TuMw32iQ9HTFHhQK'
export const MAP_QUERY = ''

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

// Plan de estudios: cada materia es [nombre, horas semanales]
export const materias = [
  {
    anio: 'Primer año',
    horas: '29 horas cátedra semanales · 928 horas',
    items: [['Álgebra', 3], ['Análisis Matemático', 4], ['Programación I', 4], ['Ciencia y TIC', 3], ['Base de Datos', 4], ['Redes', 4], ['Prácticas Profesionalizantes I', 4], ['EDI I', 3]],
  },
  {
    anio: 'Segundo año',
    horas: '31 horas cátedra semanales · 992 horas',
    items: [['Inglés Técnico', 3], ['Ciencia de Datos', 4], ['Estadística y Probabilidad', 3], ['Programación II', 4], ['Lógica', 3], ['Introducción a la Inteligencia Artificial', 4], ['Machine Learning', 3], ['Prácticas Profesionalizantes II', 4], ['EDI II', 3]],
  },
  {
    anio: 'Tercer año',
    horas: '31 horas cátedra semanales · 992 horas',
    items: [['Gestión de Proyectos', 3], ['Minería de Datos', 4], ['Reconocimiento Visual', 4], ['Ciberseguridad', 4], ['Ética y Deontología Profesional', 3], ['Analítica Web', 4], ['Procesamiento del Lenguaje Natural', 4], ['Prácticas Profesionalizantes III', 5]],
  },
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
      { nombre: 'Nombre Apellido', rol: 'Back-end y Andresito', desc: 'Desarrolla el back-end de la página y el asistente virtual Andresito.', foto: '/equipo/backend.jpg', pos: '50% 8%' },
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
