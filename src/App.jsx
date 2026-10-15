import React, { useState, useEffect, useRef } from 'react'
import { tabs, internships, events, meses, faqs, social, MAPS_LINK, MAP_QUERY, coordinador, stats, materias, contacto, WHATSAPP_GRUPO } from './data.js'

const icons = {
  chart: (
    <svg width="90" height="70" viewBox="0 0 90 70" fill="none" stroke="#4cc3bf" strokeWidth="3">
      <rect x="6" y="6" width="78" height="46" rx="4" /><path d="M16 42l16-14 12 8 20-20" /><path d="M34 62h22" />
    </svg>
  ),
  flask: (
    <svg width="90" height="70" viewBox="0 0 90 70" fill="none" stroke="#9fd8d6" strokeWidth="3">
      <path d="M36 6h18M40 6v22L20 60h50L50 28V6" /><path d="M28 46h34" />
    </svg>
  ),
  net: (
    <svg width="90" height="70" viewBox="0 0 90 70" fill="none" stroke="#ffffff" strokeWidth="3">
      <circle cx="20" cy="35" r="7" /><circle cx="70" cy="16" r="7" /><circle cx="70" cy="54" r="7" /><path d="M27 32l36-13M27 38l36 13" />
    </svg>
  ),
}


const tabIcons = {
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18" /></>,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
}

function TabIcon({ name, size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {tabIcons[name]}
    </svg>
  )
}

function Tabs() {
  const [sel, setSel] = useState(null)
  useEffect(() => {
    if (sel === null) return
    const onKey = (e) => { if (e.key === 'Escape') setSel(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sel])
  const cur = sel !== null ? tabs[sel] : null

  return (
    <>
      <div className="tabs">
        {tabs.map(([t, icon], i) => (
          <button className="tab" key={t} onClick={() => setSel(i)} aria-haspopup="dialog">
            <TabIcon name={icon} />
            <span>{t}</span>
          </button>
        ))}
      </div>
      {cur && (
        <div className="modal-bg" onClick={() => setSel(null)}>
          <div className="modal" role="dialog" aria-modal="true" aria-label={cur[0]} onClick={(e) => e.stopPropagation()}>
            <button className="x" aria-label="Cerrar" onClick={() => setSel(null)} autoFocus>×</button>
            <h4><TabIcon name={cur[1]} size={22} />{cur[0]}</h4>
            <ul>{cur[2].map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </div>
      )}
    </>
  )
}

function Linkify({ text }) {
  return text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
    i % 2 ? <a key={i} href={part} target="_blank" rel="noopener noreferrer">{part}</a> : part
  )
}

const socialIcons = {
  facebook: (
    <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#1877f2" />
      <path fill="#fff" d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.5c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H7.7V14h2.7v8z" />
    </svg>
  ),
  youtube: (
    <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1" y="4.5" width="22" height="15" rx="4.5" fill="#ff0000" />
      <path fill="#fff" d="M10 8.7v6.6l5.7-3.3z" />
    </svg>
  ),
  instagram: (
    <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="ig" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#feda75" /><stop offset=".3" stopColor="#fa7e1e" /><stop offset=".55" stopColor="#d62976" /><stop offset=".8" stopColor="#962fbf" /><stop offset="1" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="5" fill="url(#ig)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth="1.7" />
      <circle cx="16.2" cy="7.8" r="1" fill="#fff" />
    </svg>
  ),
}
const socialNames = { facebook: 'Facebook', youtube: 'YouTube', instagram: 'Instagram' }

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.12 })
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])
}

function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)
  useEffect(() => {
    const el = ref.current
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) { setN(to); return }
    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const dur = 1400
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1)
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to])
  return <><b ref={ref} aria-hidden="true">{n.toLocaleString('es-AR')}{suffix}</b><span className="sr">{to.toLocaleString('es-AR')}{suffix}</span></>
}

function Stats() {
  return (
    <div className="stats reveal">
      {stats.map(([n, suf, label]) => (
        <div className="stat" key={label}>
          <Counter to={n} suffix={suf} />
          <span className="l">{label}</span>
        </div>
      ))}
    </div>
  )
}

function Materias() {
  const [i, setI] = useState(0)
  const cur = materias[i]
  return (
    <div className="mat">
      <div className="mat-tabs" role="tablist" aria-label="Año de cursada">
        {materias.map((m, k) => (
          <button key={m.anio} role="tab" id={'mt' + k} aria-selected={i === k} aria-controls="mat-panel" className={i === k ? 'on' : ''} onClick={() => setI(k)}>{m.anio}</button>
        ))}
      </div>
      <div className="mat-panel" role="tabpanel" id="mat-panel" aria-labelledby={'mt' + i} key={i}>
        <p className="mat-h">{cur.horas}</p>
        <ul>
          {cur.items.map(([nombre, hs]) => <li key={nombre}><span>{nombre}</span><small>{hs} hs</small></li>)}
        </ul>
      </div>
    </div>
  )
}

const contactIcons = {
  tel: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  mail: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>,
  wa: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" /><path d="M9.2 8.4c.2-.4.7-.4.9 0l.7 1.6c.1.3 0 .5-.2.7l-.5.6c.7 1.3 1.7 2.2 3 2.9l.6-.6c.2-.2.5-.3.7-.2l1.6.8c.4.2.4.7.1 1-.6.8-1.5 1.1-2.4.8-2.6-.8-4.5-2.7-5.4-5.3-.2-.8 0-1.6.9-2.3z" /></svg>,
}

function Contacto() {
  const items = []
  if (contacto.telefono) items.push({ k: 'tel', label: 'Teléfono', value: contacto.telefono, href: 'tel:' + contacto.telefono.replace(/[^\d+]/g, '') })
  if (contacto.correo) items.push({ k: 'mail', label: 'Correo', value: contacto.correo, href: 'mailto:' + contacto.correo })
  items.push({ k: 'wa', label: 'WhatsApp', value: 'Grupo de ingresantes', href: WHATSAPP_GRUPO, ext: true })
  return (
    <div className="contact">
      {items.map((it) => (
        <a key={it.k} className={'cc ' + it.k} href={it.href} {...(it.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          <span className="ic">{contactIcons[it.k]}</span>
          <span><b>{it.label}</b><small>{it.value}</small></span>
        </a>
      ))}
    </div>
  )
}

function Calendar() {
  const [m, setM] = useState({ y: 2026, mo: 9 })
  const first = (new Date(m.y, m.mo, 1).getDay() + 6) % 7
  const days = new Date(m.y, m.mo + 1, 0).getDate()
  const list = []
  const cells = Array.from({ length: first }, (_, i) => <div key={'b' + i} className="c x" />)
  for (let d = 1; d <= days; d++) {
    const k = `${m.y}-${String(m.mo + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    if (events[k]) list.push(`${d}: ${events[k]}`)
    cells.push(<div key={d} className={'c' + (events[k] ? ' e' : '')} title={events[k] || ''}>{d}</div>)
  }
  const go = (n) => setM((p) => { const t = new Date(p.y, p.mo + n, 1); return { y: t.getFullYear(), mo: t.getMonth() } })

  return (
    <div className="cal">
      <div className="cal-h">
        <button onClick={() => go(-1)} aria-label="Mes anterior">‹</button>
        <span>{meses[m.mo]} {m.y}</span>
        <button onClick={() => go(1)} aria-label="Mes siguiente">›</button>
      </div>
      <div className="cal-g">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d) => <div key={d} className="d">{d}</div>)}
        {cells}
      </div>
      <div className="legend">{list.length ? list.join(' · ') : 'Sin fechas importantes este mes.'}</div>
    </div>
  )
}

function Faq() {
  const [open, setOpen] = useState(null)
  return (
    <div className="faq">
      {faqs.map(([q, a], i) => (
        <div key={q} className={open === i ? 'open' : ''}>
          <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            {q}<span className="chev">⌄</span>
          </button>
          {open === i && <div className="a"><Linkify text={a} /></div>}
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const [nav, setNav] = useState(false)
  useReveal()
  const links = [['Concepto', '#concepto'], ['Pasantías', '#pasantias'], ['Materias', '#materias'], ['Plan de estudio', '#plan'], ['Calendario', '#calendario'], ['Preguntas', '#faq'], ['Contacto', '#contacto']]
  const nodes = [[40, 60], [140, 120], [230, 50], [330, 110], [290, 220], [180, 200], [90, 250]]

  return (
    <>
      <header>
        <div className="wrap">
          <button className="burger" aria-label="Menú" onClick={() => setNav(!nav)}>☰</button>
          <img className="brand" src="/logo.jpg" alt="" width="34" height="34" />
          <h1>Carrera de Ciencia de Datos</h1>
          <nav className={nav ? 'open' : ''} onClick={() => setNav(false)}>
            {links.map(([t, href]) => <a key={href} href={href}>{t}</a>)}
          </nav>
        </div>
      </header>

      <div className="hero" id="concepto">
        <svg className="net" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" stroke="#fff" strokeWidth="1" fill="#fff">
          <path fill="none" d="M40 60L140 120L230 50L330 110L290 220L180 200L140 120M180 200L90 250L40 60M230 50L290 220" />
          {nodes.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === 3 ? 9 : 5} fill={i === 3 ? '#4cc3bf' : '#fff'} />)}
        </svg>
        <div className="wrap">
          <div className="hero-txt">
            <h2>Aprendé a convertir datos en decisiones</h2>
            <p>La Ciencia de Datos combina estadística, programación e inteligencia artificial para entender problemas complejos y proponer soluciones basadas en evidencia.</p>
            <a className="btn" href="#plan">Ver plan de estudio</a>
          </div>
          <img className="hero-logo" src="/logo.jpg" alt="Logo de la Tecnicatura Superior en Ciencia de Datos e Inteligencia Artificial, IES 6 sede Perico" width="230" height="230" />
        </div>
      </div>

      <div className="wrap">
        <Tabs />
        <Stats />

        <section id="pasantias" className="reveal">
          <h3>Pasantías</h3>
          <div className="grid3">
            {internships.map(([title, text, bg, icon]) => (
              <div className="card" key={title}>
                <div className="art" style={{ background: bg }}>{icons[icon]}</div>
                <div className="t"><h4>{title}</h4><p>{text}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section id="materias" className="reveal">
          <h3>Materias por año</h3>
          <Materias />
        </section>

        <div className="two">
          <section id="plan" className="reveal">
            <h3>Plan de estudio</h3>
            <div className="pdf">
              <svg width="56" height="72" viewBox="0 0 56 72">
                <path d="M4 2h34l14 14v54H4z" fill="#3d5365" /><path d="M38 2v14h14" fill="#6f8596" />
                <text x="28" y="52" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">PDF</text>
              </svg>
              <div>
                <p>Consultá las materias de cada año, la carga horaria y los requisitos de cursada.</p>
                {/* Poné tu PDF en la carpeta public/ y cambiá href por "/plan-de-estudio.pdf" */}
                <a className="btn" href="/plan-de-estudio.pdf" download>Descargar PDF</a>
              </div>
            </div>
          </section>
          <section id="calendario" className="reveal"><h3>Calendario académico</h3><Calendar /></section>
        </div>

        <div className="two">
          <section className="reveal">
            <h3>Mensaje motivacional</h3>
            <blockquote className="quote" style={{ margin: 0 }}>
              Los datos cuentan historias. Tu trabajo es aprender a escucharlas y ayudar a otros a entenderlas.
              <cite>— Equipo de Ciencia de Datos</cite>
            </blockquote>
          </section>
          <section id="faq" className="reveal"><h3>Preguntas frecuentes</h3><Faq /></section>
        </div>

        <section id="contacto" className="reveal">
          <h3>Contacto</h3>
          <Contacto />
        </section>
      </div>

      <footer>
        <div className="wrap">
          <div>
            <h5>Coordinador</h5>
            <div className="coord">
              <div className="av">{coordinador.iniciales}</div>
              <div><p><b>{coordinador.nombre}</b></p><p>Coordinador de la carrera</p></div>
            </div>
          </div>
          <div>
            <h5>Dirección</h5>
            <div className="map">
              <iframe
                title="Ubicación en Google Maps"
                src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a className="maplink" href={MAPS_LINK} target="_blank" rel="noopener noreferrer">Abrir en Google Maps</a>
          </div>
          <div>
            <h5>Redes sociales</h5>
            <div className="soc">
              {Object.keys(socialIcons).map((k) => (
                <a key={k} href={social[k]} aria-label={socialNames[k]} target="_blank" rel="noopener noreferrer">{socialIcons[k]}</a>
              ))}
            </div>
          </div>
          <div>
            <h5>Creadores</h5>
            <ul>{['Nombre Apellido', 'Nombre Apellido', 'Nombre Apellido'].map((n, i) => <li key={i}>{n}</li>)}</ul>
          </div>
        </div>
      </footer>
    </>
  )
}
