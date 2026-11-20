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
  react: ['R', '#61DAFB'], javascript: ['JS', '#F7DF1E'], typescript: ['TS', '#3178C6'],
  python: ['Py', '#3776AB'], supabase: ['S', '#3ECF8E'], 'three.js': ['3D', '#FFFFFF'],
  threejs: ['3D', '#FFFFFF'], html: ['5', '#E34F26'], html5: ['5', '#E34F26'],
  css: ['3', '#1572B6'], css3: ['3', '#1572B6'], node: ['N', '#5FA04E'],
  'node.js': ['N', '#5FA04E'], vite: ['V', '#A78BFA'], firebase: ['F', '#FFCA28'],
  mysql: ['SQL', '#4479A1'], postgresql: ['PG', '#4169E1'], postgres: ['PG', '#4169E1'],
  mongodb: ['M', '#47A248'], docker: ['D', '#2496ED'], git: ['G', '#F05032'],
  github: ['GH', '#FFFFFF'], figma: ['F', '#F24E1E'], java: ['J', '#ED8B00'],
  php: ['PHP', '#777BB4'], 'c#': ['C#', '#9B4F96'], c: ['C', '#A8B9CC'],
  'c++': ['C++', '#00599C'], wordpress: ['W', '#21759B'], excel: ['X', '#217346'],
  powerbi: ['BI', '#F2C811'], 'power bi': ['BI', '#F2C811'], streamlit: ['S', '#FF4B4B'],
  flask: ['F', '#FFFFFF'], django: ['D', '#092E20'], tailwind: ['TW', '#06B6D4'],
  bootstrap: ['B', '#7952B3'], pandas: ['P', '#150458'], numpy: ['N', '#4DABCF'],
}
const estiloTecnologia = (nombre) => {
  const clave = quitaAcentos(nombre).replace(/\\s+/g, ' ').trim()
  const dato = TECNOLOGIAS[clave]
  return dato || [String(nombre).trim().slice(0, 2).toUpperCase(), '#55DDE0']
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
            {tags.length > 0 && (<><div className="pj-lbl">HERRAMIENTAS</div><div className="pj-chips">{tags.map((t) => { const [sigla, color] = estiloTecnologia(t); return <span className="pj-tech" key={t} style={{ '--tech-color': color }}><i aria-hidden="true">{sigla}</i>{t}</span> })}</div></>)}
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
