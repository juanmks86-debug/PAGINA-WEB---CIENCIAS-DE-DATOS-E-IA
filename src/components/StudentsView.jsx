import React, { useState } from 'react'
import ProjectsSection from './ProjectsSection.jsx'
import { studentYears, recentNotes, materialsByYear } from '../data.js'

const studentToolLinks = [
  { title: 'Python', icon: '🐍', href: 'https://www.python.org/' },
  { title: 'Jupyter', icon: '🪐', href: 'https://jupyter.org/' },
  { title: 'Colab', icon: '◉', href: 'https://colab.research.google.com/' },
  { title: 'Docker', icon: '🐳', href: 'https://www.docker.com/' },
  { title: 'GitHub', icon: '◉', href: 'https://github.com/' },
  { title: 'VS Code', icon: '⟨⟩', href: 'https://code.visualstudio.com/' },
]

const yearIllustrations = {
  ingresantes: <svg viewBox="0 0 240 112" role="img" aria-label="Libros, lápiz y una bombilla que representa el comienzo de la carrera">
    <circle cx="190" cy="28" r="22" fill="#f5c96b" opacity=".16"/>
    <path d="M31 83c18-10 37-10 56 0v13c-19-10-38-10-56 0V83Zm56 0c19-10 38-10 57 0v13c-19-10-38-10-57 0V83Z" fill="#78b9b0"/>
    <path d="M31 83c18-10 37-10 56 0 19-10 38-10 57 0v13c-19-10-38-10-57 0-19-10-38-10-56 0V83Z" fill="none" stroke="#c6e9df" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M87 83v13" stroke="#c6e9df" strokeWidth="2"/>
    <path d="M43 76c13-6 25-6 37 0" stroke="#e6f4ee" strokeWidth="2" strokeLinecap="round" opacity=".8"/>
    <path d="m55 70 8-22 8 22" fill="#e6a95f" stroke="#f7d9a6" strokeWidth="2" strokeLinejoin="round"/>
    <path d="m59 59 8 3" stroke="#fff0d5" strokeWidth="2"/>
    <rect x="145" y="56" width="48" height="37" rx="7" fill="#e7a95e" transform="rotate(-8 145 56)"/>
    <rect x="150" y="52" width="48" height="37" rx="7" fill="#f3d18b" transform="rotate(7 150 52)"/>
    <path d="M160 64h25m-24 7h20" stroke="#9b7043" strokeWidth="2.5" strokeLinecap="round" transform="rotate(7 160 64)"/>
    <path d="M199 17c0-8-6-13-13-13s-13 5-13 13c0 5 3 8 7 11 2 2 3 4 3 7h7c0-3 1-5 3-7 4-3 6-6 6-11Z" fill="#f4c65e" stroke="#ffe6a6" strokeWidth="2"/>
    <path d="M183 52h7m-6 5h5" stroke="#f4c65e" strokeWidth="3" strokeLinecap="round"/>
    <path d="M186 0v-5m-20 10-4-4m43 4 4-4" stroke="#f4c65e" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="28" cy="35" r="4" fill="#8fc8bd"/><path d="M28 25v-5m-9 15-4-3" stroke="#8fc8bd" strokeWidth="2" strokeLinecap="round"/>
  </svg>,
  primero: <svg viewBox="0 0 240 112" role="img" aria-label="Computadora con código y herramientas de programación">
    <circle cx="43" cy="25" r="17" fill="#7fc5a2" opacity=".14"/>
    <rect x="48" y="13" width="133" height="75" rx="10" fill="#213d3a" stroke="#8ed1b1" strokeWidth="2.5"/>
    <rect x="56" y="21" width="117" height="58" rx="5" fill="#102b2d"/>
    <circle cx="66" cy="29" r="2.5" fill="#e9a96b"/><circle cx="74" cy="29" r="2.5" fill="#e7d27a"/><circle cx="82" cy="29" r="2.5" fill="#8bc7a9"/>
    <path d="m82 43-8 7 8 7m28-14 8 7-8 7m-5-17-7 20" fill="none" stroke="#8ed1b1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M96 67h43m-43 5h26" stroke="#5b9b86" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M37 91h155l-14 10H51L37 91Z" fill="#78b69b"/>
    <path d="M94 91h40l-4 5h-32l-4-5Z" fill="#315f53"/>
    <rect x="190" y="45" width="29" height="29" rx="8" fill="#e6b66d"/>
    <path d="M204 51v17m-7-9h14" stroke="#654d34" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="m30 61 5-9 5 9 9 5-9 5-5 9-5-9-9-5 9-5Z" fill="#8ed1b1" opacity=".8"/>
    <circle cx="205" cy="20" r="5" fill="#8ed1b1"/><path d="M205 10v-5m10 15h5" stroke="#8ed1b1" strokeWidth="2" strokeLinecap="round"/>
  </svg>,
  segundo: <svg viewBox="0 0 240 112" role="img" aria-label="Cerebro digital conectado por una red neuronal">
    <path d="M44 27 91 48 121 18 161 45 201 24M44 27l14 56 33-35 37 43 33-46 40 36M58 83l70 29 66-41" fill="none" stroke="#8fa9e2" strokeWidth="2" opacity=".55"/>
    <circle cx="44" cy="27" r="6" fill="#e5b76e"/><circle cx="201" cy="24" r="6" fill="#8ec9bc"/><circle cx="58" cy="83" r="5" fill="#8ec9bc"/><circle cx="198" cy="77" r="5" fill="#e5b76e"/>
    <path d="M123 22c-9-13-28-7-28 8-13 5-12 23-1 28-4 15 11 25 23 17 11 10 27 2 26-11 14-8 8-27-4-30-1-12-9-17-16-12Z" fill="#819bd2" stroke="#c5d3f3" strokeWidth="2.5"/>
    <path d="M121 27v44m-18-25h18m0 13h17m-17-22h14" stroke="#253b68" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="121" cy="49" r="5" fill="#f0c875"/><circle cx="103" cy="49" r="3" fill="#e8f0ff"/><circle cx="139" cy="62" r="3" fill="#e8f0ff"/>
    <circle cx="121" cy="49" r="28" fill="none" stroke="#a9b9e5" strokeWidth="1.5" strokeDasharray="3 5" opacity=".8"/>
    <path d="m30 76 4-8 4 8 8 4-8 4-4 8-4-8-8-4 8-4Z" fill="#e5b76e"/>
    <circle cx="184" cy="91" r="10" fill="#8ec9bc" opacity=".85"/><path d="M180 91h8m-4-4v8" stroke="#214a52" strokeWidth="2" strokeLinecap="round"/>
  </svg>,
  tercero: <svg viewBox="0 0 240 112" role="img" aria-label="Panel de análisis de datos con gráficos y tendencias">
    <rect x="39" y="11" width="151" height="91" rx="10" fill="#39334c" stroke="#bda6d8" strokeWidth="2.5"/>
    <rect x="48" y="20" width="133" height="74" rx="5" fill="#211f35"/>
    <path d="M60 34h39m-39 6h24" stroke="#bda6d8" strokeWidth="2.5" strokeLinecap="round" opacity=".8"/>
    <path d="M62 81V65h13v16m8 0V54h13v27m8 0V61h13v20m8 0V44h13v37" fill="#8f80bc"/>
    <path d="m64 59 23-9 20 7 25-21 23 6" fill="none" stroke="#e8bd78" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="155" cy="42" r="4" fill="#e8bd78"/>
    <path d="M199 68 212 53l12 6" fill="none" stroke="#8ec9bc" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="212" cy="53" r="4" fill="#8ec9bc"/>
    <path d="M28 42h14m-7-7v14" stroke="#e8bd78" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="207" cy="91" r="9" fill="#bda6d8" opacity=".8"/>
    <path d="M203 91h8m-4-4v8" stroke="#39334c" strokeWidth="2" strokeLinecap="round"/>
  </svg>,
}

function Status({ value, tone }) {
  return <span className={`status status-${tone}`}>{value}</span>
}

function NotesBank({ query = '' }) {
  const [selected, setSelected] = useState('all')
  const termino = query.trim().toLocaleLowerCase('es')
  const gruposBase = selected === 'all' ? materialsByYear : materialsByYear.filter((group) => group.year === selected)
  const groups = gruposBase.map((group) => ({
    ...group,
    items: group.items.filter((item) => `${group.year} ${item.title} ${item.description} ${item.type}`.toLocaleLowerCase('es').includes(termino)),
  })).filter((group) => !termino || group.items.length > 0)

  return (
    <section className="materials-browser" aria-labelledby="materiales-titulo">
      <div className="materials-header">
        <div>
          <span className="student-kicker">ACCESO A LOS ARCHIVOS</span>
          <h2 id="materiales-titulo">Materiales disponibles</h2>
          <p>Elegí un año para ver guías y apuntes. Los enlaces abren carpetas de Google Drive. Revisá allí las materias y las fechas de actualización.</p>
        </div>
        <label className="materials-filter">
          Filtrar por año
          <select value={selected} onChange={(event) => setSelected(event.target.value)} aria-label="Filtrar materiales por año">
            <option value="all">Todos los años</option>
            {studentYears.map((item) => <option value={item.title} key={item.title}>{item.title}</option>)}
          </select>
        </label>
      </div>
      {query.trim() && !groups.length && <p className="materials-empty" role="status">No encontramos materiales que coincidan con “{query.trim()}”. Probá con otra materia o año.</p>}
      <div className="materials-groups">
        {groups.map((group) => (
          <article className="materials-group" key={group.year}>
            <div className="materials-group-title">
              <h3>{group.year}</h3>
              <Status value={group.status} tone={group.statusKey} />
            </div>
            {group.items.length ? (
              <ul>
                {group.items.map((item) => (
                  <li key={item.title}>
                    <span className="file-type" aria-hidden="true">{item.type}</span>
                    <span><b>{item.title}</b><small>{item.description}</small></span>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${item.title} en Google Drive`}>Abrir <span aria-hidden="true">↗</span></a>
                  </li>
                ))}
              </ul>
            ) : <p className="materials-empty" role="status">Todavía no hay materiales publicados para este año.</p>}
          </article>
        ))}
      </div>
    </section>
  )
}

function StudentsHero() {
  const nodes = [[20, 220], [110, 150], [180, 210], [280, 90], [380, 150], [470, 35], [150, 35], [240, 275]]
  return (
    <div className="students-hero">
      <div className="students-hero-photo" aria-hidden="true"><img src="/hero-alumnos.jpg" alt="" /></div>
      <svg className="students-network" viewBox="0 0 500 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M20 220 110 150 180 210 280 90 380 150 470 35M110 150 150 35 280 90M180 210l60 65 140-125" />
        <g>{nodes.map(([x, y], index) => <circle key={`${x}-${y}`} cx={x} cy={y} r={index === 3 ? 6 : 3} />)}</g>
      </svg>
      <div className="students-hero-inner">
        <div className="graduation-mark" aria-hidden="true">⌁</div>
        <div>
          <span className="student-eyebrow">ESPACIO ESTUDIANTIL · IES-6</span>
          <h2>Alumnos</h2>
          <h3>Tu espacio para aprender, compartir y crecer.</h3>
          <p>Encontrá apuntes, proyectos, herramientas y recursos para acompañarte durante la carrera.</p>
          <div className="student-actions">
            <a className="btn neon-btn" href="#materiales-titulo">Explorar apuntes</a>
            <a className="ghost-btn" href="#proyectos">Ver proyectos <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
      <div className="hero-slogan" aria-hidden="true">Tu esfuerzo<br /><em>también construye</em><br />el futuro</div>
    </div>
  )
}

export default function StudentsView({ standalone = false }) {
  const [query, setQuery] = useState('')
  const termino = query.trim().toLocaleLowerCase('es')
  const filteredNotes = recentNotes.filter((note) => `${note.title} ${note.year} ${note.subject}`.toLocaleLowerCase('es').includes(termino))
  const yearCards = [
    { title: 'Ingresantes', description: 'Primeros pasos en programación, matemática y herramientas para comenzar la carrera.', icon: 'rocket', status: 'Próximamente', statusKey: 'review', slug: 'ingresantes', drive: '' },
    ...studentYears.map((year) => ({
      ...year,
      description: ({
        '1.º Año': 'Programación, Álgebra, Bases de Datos, Redes y Matemática.',
        '2.º Año': 'Estadística, Machine Learning, Programación II e Inteligencia Artificial.',
        '3.º Año': 'Minería de Datos, Ciberseguridad, Analítica Web y proyectos integradores.',
      })[year.title] || year.description,
    })),
  ]
  const filteredYears = yearCards.filter((year) => {
    if (!termino) return true
    const materiales = materialsByYear.find((group) => group.year === year.title)
    const contenido = `${year.title} ${year.description} ${materiales?.items.map((item) => `${item.title} ${item.description} ${item.type}`).join(' ') || ''}`
    return contenido.toLocaleLowerCase('es').includes(termino)
  })

  return (
    <section id="alumnos" className={`students-view${standalone ? ' students-route' : ''}`}>
      {standalone && <a className="students-route-back" href="/">← Volver al inicio</a>}
      <StudentsHero />
      <div className="students-shell">
        <section className="quick-access" aria-labelledby="quick-access-title">
          <div className="quick-access-heading"><span className="quick-access-symbol" aria-hidden="true">ϟ</span><div><h2 id="quick-access-title">Acceso rápido</h2><p>Enlaces directos a las herramientas más utilizadas.</p></div></div>
          <div className="quick-access-grid">
            <a className="quick-link quick-drive" href={studentYears[0].drive} target="_blank" rel="noopener noreferrer"><span className="quick-link-icon" aria-hidden="true">▲</span><span><b>Google Drive</b><small>Tus archivos en la nube</small></span><i aria-hidden="true">↗</i></a>
            <a className="quick-link quick-calendar" href="/eventos#calendario"><span className="quick-link-icon" aria-hidden="true">▦</span><span><b>Calendario Académico</b><small>Fechas importantes</small></span><i aria-hidden="true">↗</i></a>
            <a className="quick-link quick-classroom" href="#materiales-titulo"><span className="quick-link-icon" aria-hidden="true">✓</span><span><b>Aula Virtual</b><small>Material y actividades</small></span><i aria-hidden="true">↗</i></a>
            <a className="quick-link quick-contact" href="/#contacto"><span className="quick-link-icon" aria-hidden="true">✉</span><span><b>Contacto</b><small>Consultas y soporte</small></span><i aria-hidden="true">↗</i></a>
          </div>
        </section>
        <div className="student-heading">
          <div><span className="student-kicker">RECURSOS ACADÉMICOS</span><h2 id="banco-apuntes">Banco de apuntes</h2></div>
          <label className="student-search"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por año o material..." aria-label="Buscar carpetas por año o material" /></label>
        </div>
        <div className="year-grid" aria-live="polite">
          {filteredYears.map((item) => (
            <article className={`year-card year-card-${item.slug}`} key={item.title}>
              <div className={`year-art year-art-${item.slug}`}>{yearIllustrations[item.slug]}</div>
              <div className="year-top"><h3>{item.title}</h3><Status value={item.status} tone={item.statusKey} /></div>
              <p>{item.description}</p>
              <div className="year-bottom"><small>{item.drive ? 'Carpeta disponible' : 'Material en preparación'}</small>{item.drive ? <a href={item.drive} target="_blank" rel="noopener noreferrer" aria-label={`Abrir carpeta de ${item.title} en Google Drive`}>Explorar materiales <b aria-hidden="true">→</b></a> : <span className="year-coming">Próximamente</span>}</div>
            </article>
          ))}
        </div>
        {query.trim() && !filteredYears.length && <p className="materials-empty" role="status">No hay carpetas de años que coincidan con “{query.trim()}”.</p>}
        <p className="temporary-note"><span aria-hidden="true">ⓘ</span> Los materiales se actualizan progresivamente. Consultá la fecha de actualización antes de descargar.</p>
        <NotesBank query={query} />
        <section className="student-tools" aria-labelledby="student-tools-title">
          <div className="student-section-heading"><span aria-hidden="true">⚒</span><div><h2 id="student-tools-title">Herramientas y recursos</h2><p>Recursos útiles para tu estudio y desarrollo.</p></div></div>
          <div className="resource-grid">{studentToolLinks.map((resource) => <a className="resource-card" href={resource.href} target="_blank" rel="noopener noreferrer" key={resource.title}><span className="resource-icon" aria-hidden="true">{resource.icon}</span><span><b>{resource.title}</b></span></a>)}</div>
        </section>
        <ProjectsSection />
        <aside className="recent-panel" id="ultimos-apuntes">
          <div className="panel-title"><div><span className="student-kicker">ACCESOS A DRIVE</span><h2>Carpetas recientes</h2><p>Accedé rápidamente a los últimos materiales.</p></div><a href="#materiales-titulo">Ver todas →</a></div>
          <div className="notes-list">{filteredNotes.map((note) => <a href={note.href} target="_blank" rel="noopener noreferrer" className="note-row" key={note.title}><span className="note-file" aria-hidden="true">▰</span><span><b>{note.title}</b><small>{note.year} · {note.subject}</small></span></a>)}{!filteredNotes.length && <p className="empty-state" role="status">No encontramos apuntes con ese término.</p>}</div>
        </aside>
        <div className="students-quote"><span className="quote-mark" aria-hidden="true">↗</span><p>Tu esfuerzo de hoy,<br /><strong>construye el profesional del mañana.</strong><small>¡Seguimos aprendiendo juntos!</small></p></div>
      </div>
    </section>
  )
}
