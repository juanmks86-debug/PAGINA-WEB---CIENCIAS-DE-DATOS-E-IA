import React, { useState } from 'react'
import ProjectsSection from './ProjectsSection.jsx'
import { studentYears, resources, recentNotes, materialsByYear } from '../data.js'

const yearIllustrations = {
  ingresantes: <svg viewBox="0 0 220 92" role="img" aria-label="Ilustración de libros y aprendizaje inicial"><circle cx="172" cy="24" r="17" fill="currentColor" opacity=".12"/><path d="M55 63c16-7 30-7 43 1v13c-13-8-27-8-43-1V63Zm43 1c13-8 27-8 43-1v13c-16-7-30-7-43 1V64Z" fill="currentColor" opacity=".22"/><path d="M98 64v13M55 63c16-7 30-7 43 1 13-8 27-8 43-1v13c-16-7-30-7-43 1-13-8-27-8-43-1V63Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/><path d="m163 57 5-10 5 10 10 5-10 5-5 10-5-10-10-5 10-5Z" fill="currentColor" opacity=".75"/><path d="m67 49 4-7 4 7 7 4-7 4-4 7-4-7-7-4 7-4Z" fill="currentColor" opacity=".55"/><path d="M30 76h160" stroke="currentColor" strokeWidth="2" opacity=".22" strokeLinecap="round"/></svg>,
  primero: <svg viewBox="0 0 220 92" role="img" aria-label="Ilustración de computadora y programación"><rect x="54" y="13" width="108" height="62" rx="8" fill="currentColor" opacity=".16"/><rect x="61" y="19" width="94" height="48" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5"/><path d="m91 34-10 9 10 9M125 34l10 9-10 9M116 31l-10 25" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M43 78h130l-10-8H53l-10 8Z" fill="currentColor" opacity=".45"/><circle cx="178" cy="24" r="12" fill="currentColor" opacity=".13"/><path d="M179 18v12m-6-6h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="35" cy="30" r="5" fill="currentColor" opacity=".55"/></svg>,
  segundo: <svg viewBox="0 0 220 92" role="img" aria-label="Ilustración de inteligencia artificial y redes neuronales"><g stroke="currentColor" strokeWidth="2" opacity=".55"><path d="m72 27 38 18 39-20M72 27l9 42 29-24 27 31 12-49M81 69l58 7 10-51"/></g><g fill="currentColor"><circle cx="72" cy="27" r="7"/><circle cx="110" cy="45" r="9"/><circle cx="149" cy="25" r="7"/><circle cx="81" cy="69" r="6"/><circle cx="139" cy="76" r="6"/></g><circle cx="110" cy="45" r="20" fill="none" stroke="currentColor" strokeWidth="2" opacity=".35"/><path d="M110 34c-6-8-17-1-12 8-7 7 1 16 9 11 4 7 14 2 11-5 8-7-1-16-8-12Z" fill="currentColor" opacity=".22"/><path d="M110 35v19m-8-12h8m0 7h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  tercero: <svg viewBox="0 0 220 92" role="img" aria-label="Ilustración de análisis y visualización de datos"><rect x="51" y="12" width="118" height="68" rx="8" fill="currentColor" opacity=".13"/><rect x="58" y="19" width="104" height="54" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M72 60V48h12v12m8 0V36h12v24m8 0V43h12v17m8 0V28h12v32" fill="currentColor" opacity=".7"/><path d="M70 29h20M70 35h11M138 24h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".7"/><path d="m176 63 8-10 8 5 9-17" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="201" cy="41" r="4" fill="currentColor"/><circle cx="35" cy="26" r="10" fill="currentColor" opacity=".16"/></svg>,
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
              <div className="year-bottom"><small>{item.drive ? 'Carpeta disponible' : 'Material en preparación'}</small>{item.drive ? <a href={item.drive} target="_blank" rel="noopener noreferrer" aria-label={`Abrir carpeta de ${item.title} en Google Drive`}>Abrir Drive <b aria-hidden="true">↗</b></a> : <span className="year-coming">Próximamente</span>}</div>
            </article>
          ))}
        </div>
        {query.trim() && !filteredYears.length && <p className="materials-empty" role="status">No hay carpetas de años que coincidan con “{query.trim()}”.</p>}
        <p className="temporary-note"><span aria-hidden="true">ⓘ</span> Los materiales se actualizan progresivamente. Consultá la fecha de actualización antes de descargar.</p>
        <NotesBank query={query} />
        <ProjectsSection />
        <div className="students-columns">
          <div><div className="student-heading student-heading-block"><span className="student-kicker">ACCESOS RÁPIDOS</span><h2>Herramientas y recursos</h2></div><div className="resource-grid">{resources.map((resource) => <a className="resource-card" href={resource.href} key={resource.title}><span className="resource-icon" aria-hidden="true">{resource.icon}</span><span><b>{resource.title}</b><small>{resource.description}</small></span><strong aria-hidden="true">→</strong></a>)}</div></div>
          <aside className="recent-panel" id="ultimos-apuntes"><div className="panel-title"><div><span className="student-kicker">ACCESOS A DRIVE</span><h2>Carpetas de apuntes</h2></div><a href="#materiales-titulo">Ver por año</a></div><div className="notes-list">{filteredNotes.map((note) => <a href={note.href} target="_blank" rel="noopener noreferrer" className="note-row" key={note.title}><span className="note-file" aria-hidden="true">▤</span><span><b>{note.title}</b><small>{note.year} · {note.subject}</small></span></a>)}{!filteredNotes.length && <p className="empty-state" role="status">No encontramos apuntes con ese término.</p>}</div></aside>
        </div>
        <div className="students-quote"><span className="quote-mark" aria-hidden="true">“</span><p>La tecnología no reemplaza tu esfuerzo,<br /><strong>lo potencia.</strong></p><span className="quote-line" aria-hidden="true" /></div>
      </div>
    </section>
  )
}
