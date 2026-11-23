// Grupo de WhatsApp para ingresantes
export const WHATSAPP_GRUPO = 'https://chat.whatsapp.com/Dg4K0qlm9Nb0gduLnr9gym'

export const tabs = [
  ['Perfil profesional', 'user', ['Analiza datos para resolver problemas reales', 'Construye modelos predictivos', 'Comunica resultados con claridad']],
  ['Objetivos', 'target', ['Formar profesionales en análisis de datos', 'Aplicar estadística e inteligencia artificial', 'Impulsar la investigación y la innovación']],
  ['Campo laboral', 'briefcase', ['Empresas de tecnología y finanzas', 'Salud, industria y gobierno', 'Investigación y consultoría']],
  ['Aptitudes y habilidades', 'bolt', ['Pensamiento lógico y crítico', 'Programación en Python y SQL', 'Trabajo en equipo y comunicación']],
]

export const internships = [
  {
    title: 'Oportunidades de pasantías',
    description: 'Convocatorias, requisitos y orientación para postularte.',
    color: '#2b3c4a',
    icon: 'chart',
    eyebrow: 'POSTULACIONES',
    intro: 'Encontrá oportunidades para dar tus primeros pasos en el ámbito laboral.',
    sections: [
      { title: 'Información de cada convocatoria', items: ['Organización y área de trabajo', 'Requisitos y documentación necesaria', 'Modalidad, duración y carga horaria', 'Fecha límite y medio de postulación'] },
      { title: 'Estado actual', items: ['En este momento no hay convocatorias publicadas en esta sección. Cuando el instituto comparta nuevas oportunidades, se agregarán aquí con sus fechas y enlaces oficiales.'] },
    ],
  },
  {
    title: 'Prácticas y proyectos',
    description: 'Experiencias de investigación, proyectos institucionales y prácticas profesionalizantes.',
    color: '#3a4f5f',
    icon: 'flask',
    eyebrow: 'EXPERIENCIAS',
    intro: 'Conocé cómo llevar los conocimientos de la carrera a experiencias concretas.',
    sections: [
      { title: 'Qué vas a encontrar', items: ['Proyectos institucionales de datos e inteligencia artificial', 'Experiencias de investigación con docentes', 'Prácticas profesionalizantes y trabajo en equipo', 'Resultados, herramientas utilizadas y aprendizajes'] },
      { title: 'Cómo participar', items: ['Consultá con docentes o referentes de la carrera qué proyectos tienen espacios disponibles y cuáles son sus requisitos de participación.'] },
    ],
  },
  {
    title: 'Prepará tu perfil profesional',
    description: 'Orientación para armar el CV, portfolio, GitHub y prepararte para una entrevista.',
    color: '#51697c',
    icon: 'net',
    eyebrow: 'DESARROLLO PROFESIONAL',
    intro: 'Organizá tus conocimientos y proyectos para presentarte con confianza ante una oportunidad laboral.',
    sections: [
      { title: 'Tu presentación profesional', items: ['CV claro y actualizado, adaptado al puesto', 'Portfolio con proyectos, objetivos y resultados', 'Perfil de GitHub ordenado y con README', 'LinkedIn y canales de contacto profesional'] },
      { title: 'Preparación para entrevistas', items: ['Practicá cómo explicar tus proyectos y decisiones técnicas', 'Prepará ejemplos de trabajo en equipo y resolución de problemas', 'Revisá los requisitos de la búsqueda y prepará preguntas'] },
    ],
  },
]

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

export const social = { facebook: '#', tiktok: 'https://www.tiktok.com/@tec.sup.cs.de.datos.e.ia?is_from_webapp=1&sender_device=pc', instagram: 'https://www.instagram.com/tec.sup.cienciadedatoseia' }
export const MAPS_LINK = 'https://maps.app.goo.gl/TuMw32iQ9HTFHhQK'
export const MAP_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.0543314193674!2d-65.12723242567779!3d-24.379413292153174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941bad1aff2b443d%3A0xcd6d3e5c35073d23!2sInstituto%20de%20Educaci%C3%B3n%20Superior%20N%C2%B06!5e0!3m2!1ses!2sar!4v1792150190175!5m2!1ses!2sar'
export const coordinador = { nombre: 'Federico Torres', iniciales: 'FT', foto: '/equipo/coordinador.jpg' }
export const contacto = { telefono: '', correo: '' }
export const stats = [[3, '', 'años de duración'], [25, '', 'materias anuales'], [2912, '', 'horas cátedra'], [100, '%', 'presencial']]

const demo = 'Escribí acá una descripción breve de su aporte al proyecto.'
export const equipos = [
  { id: 'infra', corto: 'Infraestructura y Despliegue', nombre: 'Infraestructura y Despliegue', lema: 'Servidores, redes y despliegue continuo', miembros: [{ nombre: 'Nombre Apellido', rol: 'Servidores y despliegue', desc: demo, foto: '' }, { nombre: 'Nombre Apellido', rol: 'Redes y seguridad', desc: demo, foto: '' }, { nombre: 'Nombre Apellido', rol: 'Base de datos', desc: demo, foto: '' }, { nombre: 'Nombre Apellido', rol: 'Soporte técnico', desc: demo, foto: '' }] },
  { id: 'dev', corto: 'Desarrollo y Diseño Web', nombre: 'Desarrollo y Diseño Web', lema: 'Código limpio e interfaces con identidad', miembros: [{ nombre: 'Nombre Apellido', rol: 'Desarrollo front-end', desc: demo, foto: '' }, { nombre: 'Juan Israel Flores', rol: 'Back-end y Andresito', desc: 'Desarrolla el back-end de la página y el asistente virtual Andresito.', foto: '/equipo/backend.jpg', pos: '50% 8%' }, { nombre: 'Nombre Apellido', rol: 'Diseño UI/UX', desc: demo, foto: '' }] },
  { id: 'press', corto: 'Contenido y Prensa', nombre: 'Contenido y Prensa', lema: 'Las historias de la carrera, bien contadas', miembros: [{ nombre: 'Nombre Apellido', rol: 'Redacción', desc: demo, foto: '' }, { nombre: 'Nombre Apellido', rol: 'Fotografía y video', desc: demo, foto: '' }, { nombre: 'Nombre Apellido', rol: 'Redes sociales', desc: demo, foto: '' }, { nombre: 'Nombre Apellido', rol: 'Prensa y difusión', desc: demo, foto: '' }] },
  { id: 'data', corto: 'Analítica y Marketing', nombre: 'Analítica y Marketing', lema: 'Datos para entender y llegar a más estudiantes', miembros: [{ nombre: 'Nombre Apellido', rol: 'Analítica de datos', desc: demo, foto: '' }, { nombre: 'Nombre Apellido', rol: 'Estrategia de marketing', desc: demo, foto: '' }, { nombre: 'Nombre Apellido', rol: 'Métricas y reportes', desc: demo, foto: '' }, { nombre: 'Nombre Apellido', rol: 'Campañas', desc: demo, foto: '' }] },
]

export const eventosProximos = [{ titulo: 'Expo Educativa Ciudad Perico 2026', fecha: '2026-10-16', hora: '09:00 a 18:00 hs', lugar: 'IES N.º 6 - Perico (frente a la Cooperativa de Tabacaleros)', desc: 'Educar es abrir caminos: más oportunidades, más herramientas, más futuro.', flyer: '/eventos/expo-educativa-2026.jpg', alt: 'Flyer de la Expo Educativa Ciudad Perico 2026', enlace: '' }]

export const noticias = []

export const studentYears = [
  { title: '1.º Año', description: 'Apuntes organizados por materia, resúmenes y trabajos prácticos.', materials: 1, icon: 'book', status: 'Disponible', statusKey: 'available', slug: 'primero', drive: 'https://drive.google.com/drive/folders/1qjZJVN52NdBsZ6x5pERRxHWYOgpe1VTG?usp=drive_link' },
  { title: '2.º Año', description: 'Materiales de cursada, ejercicios resueltos, prácticas de programación y bases de datos.', materials: 1, icon: 'database', status: 'Actualizado', statusKey: 'updated', slug: 'segundo', drive: 'https://drive.google.com/drive/folders/1rpcYxC9gOGY-uix-7wtFfpXDWTY88L-3?usp=sharing' },
  { title: '3.º Año', description: 'Apuntes avanzados, proyectos integradores y material para evaluaciones finales.', materials: 1, icon: 'brain', status: 'En revisión', statusKey: 'review', slug: 'tercero', drive: 'https://drive.google.com/drive/folders/1jLCMk3oeBbqqVlEWeH4EBfIjTO1sIYHa?usp=sharing' },
]

// Proyectos destacados. Campos opcionales por proyecto (si faltan, simplemente no se muestran):
//   image    → foto principal (ruta en /public o URL)      gallery → lista de URLs con más capturas
//   tags     → ['Python', 'Power BI']  herramientas       team    → ['Nombre Apellido', ...]
//   year, date, subject → datos de contexto               long    → descripción ampliada
//   goal     → objetivo                results → resultados
//   url      → enlace al proyecto/demo repo → código en GitHub      report → enlace al informe (PDF)
export const projects = [
  { title: 'Dashboard de análisis de datos', category: 'Datos', description: 'Visualización de información y generación de indicadores.', tone: 'dashboard-art', symbol: '▥', code: '01 / DATA', image: '/proyecto-dashboard.jpg' },
  { title: 'Asistente virtual educativo', category: 'Inteligencia artificial', description: 'Un chatbot para responder consultas y orientar a estudiantes.', tone: 'ai-art', symbol: '✦', code: '02 / IA', image: '/proyecto-asistente-ia.jpg' },
  { title: 'Sistema de gestión', category: 'Desarrollo', description: 'Una aplicación que organiza información y automatiza tareas.', tone: 'dev-art', symbol: '</>', code: '03 / DEV', image: '/proyecto-gestion.jpg' },
  { title: 'App de monitoreo ambiental', category: 'Web', description: 'Registro y análisis de datos para el cuidado del medio ambiente.', tone: 'web-art', symbol: '⌁', code: '04 / WEB', image: '/proyecto-ambiental.jpg' },
]

export const resources = [
  { title: 'Buscar apuntes', description: 'Encontrá rápidamente lo que necesitás.', icon: '⌕', href: '#materiales-titulo' },
  { title: 'Compartir material', description: 'Solo compartí el link de tu Drive.', icon: '↗', href: '#alumnos' },
  { title: 'Agenda académica', description: 'Fechas de exámenes y entregas.', icon: '▦', href: '/eventos#calendario' },
  { title: 'Ayudante de IA', description: 'Consultas, resúmenes y más.', icon: '✦', href: '#alumnos' },
]

export const recentNotes = [
  { title: 'Carpeta de apuntes de 1.º año', year: '1.º Año', subject: 'Apuntes y trabajos prácticos', href: 'https://drive.google.com/drive/folders/1qjZJVN52NdBsZ6x5pERRxHWYOgpe1VTG?usp=drive_link' },
  { title: 'Carpeta de apuntes de 2.º año', year: '2.º Año', subject: 'Cursada, programación y bases de datos', href: 'https://drive.google.com/drive/folders/1rpcYxC9gOGY-uix-7wtFfpXDWTY88L-3?usp=sharing' },
  { title: 'Carpeta de apuntes de 3.º año', year: '3.º Año', subject: 'Proyectos y material avanzado', href: 'https://drive.google.com/drive/folders/1jLCMk3oeBbqqVlEWeH4EBfIjTO1sIYHa?usp=sharing' },
]

export const materialsByYear = [
  { year: '1.º Año', status: 'Disponible', statusKey: 'available', items: [{ title: 'Carpeta de apuntes de 1.º año', description: 'Google Drive · apuntes y trabajos prácticos', type: 'DRIVE', href: 'https://drive.google.com/drive/folders/1qjZJVN52NdBsZ6x5pERRxHWYOgpe1VTG?usp=drive_link' }] },
  { year: '2.º Año', status: 'Actualizado', statusKey: 'updated', items: [{ title: 'Carpeta de apuntes de 2.º año', description: 'Google Drive · cursada, programación y bases de datos', type: 'DRIVE', href: 'https://drive.google.com/drive/folders/1rpcYxC9gOGY-uix-7wtFfpXDWTY88L-3?usp=sharing' }] },
  { year: '3.º Año', status: 'En revisión', statusKey: 'review', items: [{ title: 'Carpeta de apuntes de 3.º año', description: 'Google Drive · proyectos y material avanzado', type: 'DRIVE', href: 'https://drive.google.com/drive/folders/1jLCMk3oeBbqqVlEWeH4EBfIjTO1sIYHa?usp=sharing' }] },
]
