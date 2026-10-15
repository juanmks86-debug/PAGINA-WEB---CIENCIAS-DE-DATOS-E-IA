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
}

export const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

export const faqs = [
  ['¿Cuánto dura la carrera?', 'La carrera dura 4 años, organizados en 8 cuatrimestres.'],
  ['¿Qué conocimientos previos necesito?', 'Matemática básica y ganas de aprender. Los lenguajes de programación se enseñan desde cero.'],
  ['¿Hay actividades de investigación?', 'Sí. Podés sumarte a proyectos de investigación desde el segundo año.'],
  ['¿Cómo me inscribo?', 'Inscribite desde https://nexo.jujuy.edu.ar/'],
  ['¿Hay un grupo para ingresantes?', 'Sí, el profesor armó un grupo de WhatsApp para ingresantes: ' + WHATSAPP_GRUPO],
]

// Redes sociales: reemplazá '#' por el enlace real de cada red
export const social = { facebook: '#', youtube: '#', instagram: '#' }

// Ubicación: enlace de Google Maps y texto de la dirección para el mapa incrustado
export const MAPS_LINK = 'https://share.google/5OUe4aq005gJ4QKk4'
export const MAP_QUERY = 'Facultad de Ingeniería, Universidad Nacional de Jujuy, San Salvador de Jujuy'

export const coordinador = { nombre: 'Federico Torres', iniciales: 'FT' }

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
