import React, { useEffect, useRef, useState } from 'react'
import { projects as proyectosLocales } from '../data.js'
import { consultar, supabaseListo } from '../supabase.js'

const LIMITE = 8
const lista = (v) => (Array.isArray(v) ? v.filter(Boolean) : [])
const quitaAcentos = (t) => String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
const partir = (t) => String(t || '').split(/[\n,;]+/).map((x) => x.trim()).filter(Boolean)
// categoría → color de fondo, símbolo y abreviatura (si es una categoría nueva, usa valores neutros)
const ESTILOS = [['dato', 'dashboard-art', '▥', 'DATA'], ['inteligencia', 'ai-art', '✦', 'IA'], ['ia', 'ai-art', '✦', 'IA'], ['desarrollo', 'dev-art', '</>', 'DEV'], ['web', 'web-art', '⌁', 'WEB']]

function normalizaProyecto(r, i) {
  const cat = r.categoria || 'Datos'
  const k = quitaAcentos(cat)
  const e = ESTILOS.find(([clave]) => k.startsWith(clave)) || ['', 'dashboard-art', '◆', cat.slice(0, 4).toUpperCase()]
  return {
    title: r.titulo,
    category: cat,
    description: r.descripcion || '',
    long: r.descripcion_larga || '',
    image: r.imagen_url || '',
    gallery: partir(r.galeria),
    tags: partir(r.herramientas),
    team: partir(r.equipo),
    year: r.anio || '',
    date: r.fecha || '',
    subject: r.materia || '',
    goal: r.objetivo || '',
    results: r.resultados || '',
    url: r.enlace || '',
    repo: r.repositorio || '',
    report: r.informe || '',
    tone: e[1],
    symbol: e[2],
    code: `${String(i + 1).padStart(2, '0')} / ${e[3]}`,
  }
}

// null mientras carga. Sin Supabase, con error o con la tabla vacía, usa los proyectos de data.js.
function useProyectos() {
  const [items, setItems] = useState(null)
  useEffect(() => {
    let vivo = true
    if (!supabaseListo) { setItems(proyectosLocales); return undefined }
    consultar('proyectos', 'select=*&publicado=eq.true&order=orden.asc,created_at.asc')
      .then((rows) => vivo && setItems(rows.length ? rows.map(normalizaProyecto) : proyectosLocales))
      .catch(() => vivo && setItems(proyectosLocales))
    return () => { vivo = false }
  }, [])
  return items
}



const TECNOLOGIAS = {
  react: ['react','61DAFB','#61DAFB'], javascript: ['javascript','F7DF1E','#F7DF1E'], js: ['javascript','F7DF1E','#F7DF1E'],
  typescript: ['typescript','3178C6','#3178C6'], ts: ['typescript','3178C6','#3178C6'],
  python: ['python','3776AB','#FFD43B'], supabase: ['supabase','3ECF8E','#3ECF8E'],
  'three.js': ['threedotjs','FFFFFF','#FFFFFF'], threejs: ['threedotjs','FFFFFF','#FFFFFF'],
  html: ['html5','E34F26','#E34F26'], html5: ['html5','E34F26','#E34F26'],
  css: ['css3','1572B6','#1572B6'], css3: ['css3','1572B6','#1572B6'],
  node: ['nodedotjs','5FA04E','#5FA04E'], 'node.js': ['nodedotjs','5FA04E','#5FA04E'],
  vite: ['vite','646CFF','#A78BFA'], firebase: ['firebase','DD2C00','#FFCA28'],
  mysql: ['mysql','4479A1','#4479A1'], postgresql: ['postgresql','4169E1','#4169E1'], postgres: ['postgresql','4169E1','#4169E1'],
  mongodb: ['mongodb','47A248','#47A248'], docker: ['docker','2496ED','#2496ED'],
  git: ['git','F05032','#F05032'], github: ['github','FFFFFF','#FFFFFF'],
  figma: ['figma','F24E1E','#F24E1E'], java: ['openjdk','ED8B00','#ED8B00'],
  php: ['php','777BB4','#777BB4'], 'c#': ['csharp','9B4F96','#9B4F96'], csharp: ['csharp','9B4F96','#9B4F96'],
  'c++': ['cplusplus','00599C','#00599C'], wordpress: ['wordpress','21759B','#21759B'],
  excel: ['microsoftexcel','217346','#217346'], powerbi: ['powerbi','F2C811','#F2C811'], 'power bi': ['powerbi','F2C811','#F2C811'],
  streamlit: ['streamlit','FF4B4B','#FF4B4B'], flask: ['flask','FFFFFF','#FFFFFF'],
  django: ['django','092E20','#44B78B'], tailwind: ['tailwindcss','06B6D4','#06B6D4'],
  bootstrap: ['bootstrap','7952B3','#7952B3'], pandas: ['pandas','150458','#9B7DE3'],
  numpy: ['numpy','013243','#4DABCF'], scikitlearn: ['scikitlearn','F7931E','#F7931E'],
  'scikit-learn': ['scikitlearn','F7931E','#F7931E'], tensorflow: ['tensorflow','FF6F00','#FF6F00'],
  pytorch: ['pytorch','EE4C2C','#EE4C2C'], keras: ['keras','D00000','#D00000'],
  jupyter: ['jupyter','F37626','#F37626'], colab: ['googlecolab','F9AB00','#F9AB00'],
  anaconda: ['anaconda','44A833','#44A833'], r: ['r','276DC3','#276DC3'],
  'visual studio code': ['visualstudiocode','007ACC','#007ACC'], vscode: ['visualstudiocode','007ACC','#007ACC'],
  vercel: ['vercel','FFFFFF','#FFFFFF'], netlify: ['netlify','00C7B7','#00C7B7'],
  render: ['render','FFFFFF','#FFFFFF'], aws: ['amazonaws','FF9900','#FF9900'],
  'google cloud': ['googlecloud','4285F4','#4285F4'], gcp: ['googlecloud','4285F4','#4285F4'],
  android: ['android','3DDC84','#3DDC84'], kotlin: ['kotlin','7F52FF','#7F52FF'],
  swift: ['swift','F05138','#F05138'], flutter: ['flutter','02569B','#02569B'],
  unity: ['unity','FFFFFF','#FFFFFF'], unreal: ['unrealengine','FFFFFF','#FFFFFF'],
  canva: ['canva','00C4CC','#00C4CC'], photoshop: ['adobephotoshop','31A8FF','#31A8FF'],
  illustrator: ['adobeillustrator','FF9A00','#FF9A00'], premiere: ['adobepremierepro','9999FF','#9999FF'],
  tableau: ['tableau','E97627','#E97627'], looker: ['looker','4285F4','#4285F4'],
  excel: ['microsoftexcel','217346','#217346'], sql: ['databricks','FF3621','#FF3621'],
  n8n: ['n8n','EA4B71','#EA4B71'], wordpress: ['wordpress','21759B','#21759B'],
}
const PALETA_TECNOLOGIAS = ['#F97316','#22C55E','#A78BFA','#38BDF8','#F472B6','#EAB308','#14B8A6','#FB7185']
const estiloTecnologia = (nombre) => {
  const clave = quitaAcentos(nombre).replace(/\s+/g, ' ').trim()
  const dato = TECNOLOGIAS[clave]
  if (dato) return dato
  const hash = [...clave].reduce((n, ch) => n + ch.charCodeAt(0), 0)
  return [null, null, PALETA_TECNOLOGIAS[hash % PALETA_TECNOLOGIAS.length]]
}
function IconoTecnologia({ nombre, estilo }) {
  const [slug, iconColor, color] = estilo
  const [error, setError] = useState(false)
  useEffect(() => setError(false), [nombre])
  return (
    <span className="pj-tech-icon" aria-hidden="true">
      {slug && !error
        ? <img src={`https://cdn.simpleicons.org/${slug}/${iconColor}`} alt="" loading="lazy" onError={() => setError(true)} />
        : <svg viewBox="0 0 16 16" focusable="false"><path d="M8 1.5 14.5 8 8 14.5 1.5 8 8 1.5Z" fill="currentColor"/><circle cx="8" cy="8" r="2" fill="#07151b"/></svg>}
    </span>
  )
}


const iniciales = (n) => String(n).trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase()

// Muestra la imagen del proyecto; si no existe o no carga, queda el fondo con el símbolo.
function Imagen({ src, alt, project }) {
  const [ok, setOk] = useState(true)
  if (src && ok) return <img src={src} alt={alt} loading="lazy" onError={() => setOk(false)} />
  return (
    <div className={`project-art ${project.tone || ''}`}>
      <span className="project-orb" aria-hidden="true">{project.symbol}</span>
    </div>
  )
}

function Detalle({ items, indice, onCerrar, onIr }) {
  const p = items[indice]
  const [foto, setFoto] = useState(0)
  const ref = useRef(null)
  const imgs = [p.image, ...lista(p.gallery)].filter(Boolean)
  const tags = lista(p.tags)
  const team = lista(p.team)

  useEffect(() => { setFoto(0) }, [indice])
  useEffect(() => {
    const previo = document.activeElement
    document.body.style.overflow = 'hidden'
    const x = ref.current && ref.current.querySelector('.pj-x')
    if (x) x.focus()
    return () => {
      document.body.style.overflow = ''
      if (previo && previo.focus) previo.focus()
    }
  }, [])

  const teclas = (e) => {
    if (e.key === 'Escape') { e.stopPropagation(); onCerrar() }
    else if (e.key === 'ArrowLeft' && indice > 0) onIr(indice - 1)
    else if (e.key === 'ArrowRight' && indice < items.length - 1) onIr(indice + 1)
    else if (e.key === 'Tab' && ref.current) {
      const f = ref.current.querySelectorAll('a[href],button:not([disabled])')
      if (!f.length) return
      const a = f[0], z = f[f.length - 1]
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus() }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus() }
    }
  }

  const sinMas = !p.long && !tags.length && !team.length && !p.goal && !p.results
  return (
    <div className="pj-modal" onMouseDown={(e) => { if (e.target === e.currentTarget) onCerrar() }}>
      <div className="pj-dialog" role="dialog" aria-modal="true" aria-labelledby="pj-titulo" ref={ref} onKeyDown={teclas}>
        <div className="pj-top">
          <div className="pj-cnt"><span className="pj-tag pj-tag-static">{p.category}</span>Proyecto {indice + 1} de {items.length}</div>
          <button className="pj-x" onClick={onCerrar} aria-label="Cerrar">×</button>
        </div>
        <div className="pj-cols">
          <div>
            <div className="pj-main"><Imagen key={imgs[foto] || 'art'} src={imgs[foto]} alt={'Captura de ' + p.title} project={p} /></div>
            {imgs.length > 1 && (
              <div className="pj-thumbs">
                {imgs.map((s, i) => (
                  <button key={s} className={i === foto ? 'on' : ''} onClick={() => setFoto(i)} aria-label={`Ver imagen ${i + 1}`} aria-pressed={i === foto}><img src={s} alt="" loading="lazy" /></button>
                ))}
              </div>
            )}
          </div>
          <div>
            <h2 id="pj-titulo">{p.title}</h2>
            <div className="pj-meta"><span>{p.year || '3.º año'}</span>{p.date && <span>{p.date}</span>}{p.subject && <span>{p.subject}</span>}</div>
            <p className="pj-lead">{p.description}</p>
            {p.long && <p className="pj-lead">{p.long}</p>}
            {tags.length > 0 && (<><div className="pj-lbl">HERRAMIENTAS</div><div className="pj-chips">{tags.map((t) => { const estilo = estiloTecnologia(t); return <span className="pj-tech" key={t} style={{ '--tech-color': estilo[2] }}><IconoTecnologia nombre={t} estilo={estilo} />{t}</span> })}</div></>)}
            {team.length > 0 && (<><div className="pj-lbl">EQUIPO</div><div className="pj-team">{team.map((n) => <div key={n}><i aria-hidden="true">{iniciales(n)}</i>{n}</div>)}</div></>)}
          </div>
        </div>
        {(p.goal || p.results) && (
          <div className="pj-two">
            {p.goal && <div><div className="pj-lbl">OBJETIVO</div><p>{p.goal}</p></div>}
            {p.results && <div><div className="pj-lbl">RESULTADOS</div><p>{p.results}</p></div>}
          </div>
        )}
        {sinMas && <p className="pj-soon">Pronto vamos a sumar más información de este proyecto.</p>}
        {(p.url || p.repo || p.report) && (
          <div className="pj-act">
            {p.url && <a className="pj-go" href={p.url} target="_blank" rel="noopener noreferrer">Abrir proyecto <span aria-hidden="true">↗</span></a>}
            {p.repo && <a className="pj-o" href={p.repo} target="_blank" rel="noopener noreferrer">Ver código <span aria-hidden="true">↗</span></a>}
            {p.report && <a className="pj-o" href={p.report} target="_blank" rel="noopener noreferrer">Informe (PDF) <span aria-hidden="true">↓</span></a>}
          </div>
        )}
        <div className="pj-nav">
          <button disabled={indice === 0} onClick={() => onIr(indice - 1)}>‹ Proyecto anterior</button>
          <button disabled={indice === items.length - 1} onClick={() => onIr(indice + 1)}>Siguiente proyecto ›</button>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const [cat, setCat] = useState('Todos')
  const [todos, setTodos] = useState(false)
  const [abierto, setAbierto] = useState(null)
  const proyectos = useProyectos() || []
  const cats = ['Todos', ...new Set(proyectos.map((p) => p.category))]
  const filtrados = cat === 'Todos' ? proyectos : proyectos.filter((p) => p.category === cat)
  const visibles = todos ? filtrados : filtrados.slice(0, LIMITE)

  return (
    <>
      <div className="student-heading student-project-heading">
        <div>
          <span className="student-kicker">TRABAJOS DE LA CARRERA</span>
          <h2 id="proyectos">Proyectos destacados <small>(3.º año)</small></h2>
        </div>
        {filtrados.length > LIMITE && (
          <button className="student-link pj-all" onClick={() => setTodos(!todos)}>{todos ? 'Ver menos' : 'Ver todos'} <span aria-hidden="true">→</span></button>
        )}
      </div>
      {cats.length > 2 && (
        <div className="pj-filters" role="group" aria-label="Filtrar proyectos por categoría">
          {cats.map((c) => <button key={c} className="pj-chip" aria-pressed={cat === c} onClick={() => { setCat(c); setTodos(false) }}>{c}</button>)}
        </div>
      )}
      {!proyectos.length && <p className="pj-soon" role="status">Cargando proyectos…</p>}
      <div className="pj-grid">
        {visibles.map((p, i) => {
          const tags = lista(p.tags).slice(0, 3)
          const team = lista(p.team)
          return (
            <article className="pj-card" key={p.title}>
              <div className="pj-img">
                <Imagen src={p.image} alt="" project={p} />
                <span className="pj-tag">{p.category}</span>
                {p.code && <span className="project-code">{p.code}</span>}
              </div>
              <div className="pj-body">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                {tags.length > 0 && <div className="pj-chips">{tags.map((t) => <span key={t}>{t}</span>)}</div>}
                {team.length > 0 && <div className="pj-by">{team.join(' · ')}</div>}
                <div className="pj-actions">
                  <button className="pj-go" onClick={() => setAbierto(i)}>Ver proyecto <span aria-hidden="true">→</span></button>
                  {p.repo && <a className="pj-o" href={p.repo} target="_blank" rel="noopener noreferrer">Código <span aria-hidden="true">↗</span></a>}
                </div>
              </div>
            </article>
          )
        })}
      </div>
      {abierto !== null && <Detalle items={filtrados} indice={abierto} onCerrar={() => setAbierto(null)} onIr={setAbierto} />}
    </>
  )
}
