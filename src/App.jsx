import React, { useState, useEffect, useRef } from 'react'
import { tabs, internships, events, meses, faqs, social, MAPS_LINK, MAP_EMBED, coordinador, stats, contacto, WHATSAPP_GRUPO, equipos, eventosProximos, noticias } from './data.js'
import StudentsViewExternal from './components/StudentsView.jsx'
import EventosView, { EventosTeaser } from './components/EventosView.jsx'
import { esNavidad } from './navidad.js'
import CookieConsent from './components/CookieConsent.jsx'
import AccessibilityWidget from './components/AccessibilityWidget.jsx'

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
  cap: <><path d="m2 10 10-5 10 5-10 5-10-5Z" /><path d="M6 12v5c3.5 2.5 8.5 2.5 12 0v-5M22 10v6" /></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>,
  brain: <><path d="M12 4a3 3 0 0 0-5.8 1.1A3.5 3.5 0 0 0 4 11a3.5 3.5 0 0 0 2 6.1A3 3 0 0 0 12 19V4Z" /><path d="M12 4a3 3 0 0 1 5.8 1.1A3.5 3.5 0 0 1 20 11a3.5 3.5 0 0 1-2 6.1A3 3 0 0 1 12 19M8 9h2M14 13h2M12 8v3" /></>,
  laptop: <><rect x="4" y="4" width="16" height="12" rx="1.5" /><path d="M2 20h20l-2-4H4l-2 4Z" /></>,
  lightbulb: <><path d="M9 18h6M10 22h4M8.5 14.5a7 7 0 1 1 7 0c-.8.6-1.2 1.5-1.3 2.5H9.8c-.1-1-.5-1.9-1.3-2.5Z" /></>,
  rocket: <><path d="M5 15c-2 0-3 2-3 4 2 0 4-1 4-3M9 15l-2 5 5-2M8 13C10 7 15 3 21 3c0 6-4 11-10 13l-3-3Z" /><circle cx="15.5" cy="8.5" r="1.5" /></>,
  building: <><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M8 21v-4h8v4M7 7h2M15 7h2M7 11h2M15 11h2" /></>,
  landmark: <><path d="m3 9 9-6 9 6M4 10h16M5 10v9M9 10v9M15 10v9M19 10v9M3 21h18" /></>,
  chart: <><path d="M4 19V5M4 19h17M8 15l4-4 3 2 5-7" /></>,
  code: <><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" /></>,
  messages: <><path d="M21 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-4-.9L3 20l1.9-4A7.1 7.1 0 0 1 3 11.5 7.5 7.5 0 0 1 11 4h2a7.5 7.5 0 0 1 8 7.5Z" /><path d="M8 11h8M8 14h5" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M8 14h3M8 17h7" /></>,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22z" /><path d="M4 5.5v14A2.5 2.5 0 0 1 6.5 17H20M9 7h7M9 11h7" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8a3 3 0 0 1-2 2.83M18 15a4 4 0 0 1 3 3.87V21" /></>,
}

function TabIcon({ name, size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {tabIcons[name]}
    </svg>
  )
}

const careerVisuals = [
  { heading: 'cap', icons: ['database', 'brain', 'laptop'] },
  { heading: 'target', icons: ['cap', 'lightbulb', 'rocket'] },
  { heading: 'briefcase', icons: ['building', 'landmark', 'laptop'] },
  { heading: 'bolt', icons: ['chart', 'code', 'messages'] },
]

function Tabs() {
  const [selected, setSelected] = useState(null)
  const triggerRef = useRef(null)
  const dialogRef = useRef(null)

  const closeDetails = () => {
    setSelected(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }

  useEffect(() => {
    if (selected === null) return undefined
    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeDetails()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    requestAnimationFrame(() => dialogRef.current?.querySelector('button')?.focus())
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selected])

  const trapFocus = (event) => {
    if (event.key !== 'Tab') return
    const focusable = Array.from(event.currentTarget.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'))
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const current = selected === null ? null : tabs[selected]
  const visual = selected === null ? null : careerVisuals[selected]

  return (
    <>
      <section className="career-panels reveal" id="perfil" aria-label="Información de la carrera">
        {tabs.map(([title], index) => {
          const cardVisual = careerVisuals[index]
          return (
            <button
              type="button"
              className="career-panel"
              key={title}
              onClick={(event) => {
                triggerRef.current = event.currentTarget
                setSelected(index)
              }}
              aria-haspopup="dialog"
              aria-expanded={selected === index}
              aria-label={title + '. Ver detalles'}
            >
              <span className="career-panel-heading-icon"><TabIcon name={cardVisual.heading} size={29} /></span>
              <span className="career-panel-title">{title}</span>
              <span className="career-panel-icons" aria-hidden="true">
                {cardVisual.icons.map((icon) => <span className="career-panel-mini-icon" key={icon}><TabIcon name={icon} size={19} /></span>)}
              </span>
              <span className="career-panel-more">Ver detalles <span aria-hidden="true">→</span></span>
            </button>
          )
        })}
      </section>

      {current && (
        <div className="career-modal-bg" onClick={closeDetails}>
          <div
            ref={dialogRef}
            className="career-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="career-modal-title"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={trapFocus}
          >
            <button type="button" className="career-modal-close" aria-label="Cerrar" onClick={closeDetails}>×</button>
            <div className="career-modal-heading">
              <TabIcon name={visual.heading} size={25} />
              <h4 id="career-modal-title">{current[0]}</h4>
            </div>
            <ul>{current[2].map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      )}
    </>
  )
}

function Internships() {
  const [selected, setSelected] = useState(null)
  const triggerRef = useRef(null)
  const dialogRef = useRef(null)

  const closeDetails = () => {
    setSelected(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }

  useEffect(() => {
    if (selected === null) return undefined
    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeDetails()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    requestAnimationFrame(() => dialogRef.current?.querySelector('button')?.focus())
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selected])

  const trapFocus = (event) => {
    if (event.key !== 'Tab') return
    const focusable = Array.from(dialogRef.current?.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])') || [])
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const current = selected === null ? null : internships[selected]

  return (
    <>
      <section id="pasantias" className="reveal" aria-labelledby="internships-title">
        <h3 id="internships-title">Experiencias y desarrollo profesional</h3>
        <div className="internships-track">
          {internships.map((item, index) => (
            <button
              type="button"
              className="card internship-card internship-trigger"
              key={item.title}
              onClick={(event) => {
                triggerRef.current = event.currentTarget
                setSelected(index)
              }}
              aria-haspopup="dialog"
              aria-expanded={selected === index}
            >
              <span className="art" style={{ background: item.color }}>{icons[item.icon]}</span>
              <span className="t">
                <strong>{item.title}</strong>
                <span>{item.description}</span>
                <span className="internship-more">Explorar contenido <span aria-hidden="true">→</span></span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {current && (
        <div className="career-modal-bg internship-modal-bg" onClick={closeDetails}>
          <div
            ref={dialogRef}
            className={`career-modal internship-modal internship-modal-${selected + 1}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="internship-modal-title"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={trapFocus}
          >
            <button type="button" className="career-modal-close" aria-label="Cerrar" onClick={closeDetails}>×</button>
            <span className="internship-eyebrow">{current.eyebrow}</span>
            <div className="career-modal-heading">
              <span className="internship-modal-icon" style={{ background: current.color }}>{icons[current.icon]}</span>
              <h4 id="internship-modal-title">{current.title}</h4>
            </div>
            <p className="internship-modal-intro">{current.intro}</p>
            <div className="internship-modal-visual" aria-hidden="true">
              <span className="internship-modal-visual-mark">{icons[current.icon]}</span>
              <span className="internship-modal-visual-caption">IES N.º 6 · Ciencia de Datos e IA</span>
            </div>
            <div className="internship-modal-points">
              {current.sections.map((section, index) => (
                <div className="internship-modal-point" key={section.title}>
                  <span className="internship-modal-point-icon"><TabIcon name={section.icon} size={22} /></span>
                  <span className="internship-modal-point-copy">
                    <strong>{section.title}</strong>
                    <span>{section.description}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="internship-modal-footer">
              <strong>{current.footerTitle}</strong>
              <p>{current.footerText}</p>
            </div>
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
  tiktok: (
    <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#111" />
      <path d="M14.2 3.5v10.2a3.2 3.2 0 1 1-2.8-3.17V7.7a6.1 6.1 0 1 0 6.1 6V9.8a8.1 8.1 0 0 0 3 1V7.5a5.1 5.1 0 0 1-3.9-4z" fill="#25F4EE" transform="translate(-.8 .4)" />
      <path d="M14.2 3.5v10.2a3.2 3.2 0 1 1-2.8-3.17V7.7a6.1 6.1 0 1 0 6.1 6V9.8a8.1 8.1 0 0 0 3 1V7.5a5.1 5.1 0 0 1-3.9-4z" fill="#FE2C55" transform="translate(.45 .15)" />
      <path d="M14.2 3.5v10.2a3.2 3.2 0 1 1-2.8-3.17V7.7a6.1 6.1 0 1 0 6.1 6V9.8a8.1 8.1 0 0 0 3 1V7.5a5.1 5.1 0 0 1-3.9-4z" fill="#fff" />
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
const socialNames = { facebook: 'Facebook', tiktok: 'TikTok', instagram: 'Instagram' }

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


function useScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) return undefined

    const selector = [
      '#contenido-principal > .hero',
      '#contenido-principal > .wrap > .tabs',
      '#contenido-principal .card',
      '#contenido-principal .pdf',
      '#contenido-principal .ev',
      '#contenido-principal .cc',
      '#contenido-principal .nw-card',
      '.students-hero',
      '.students-shell > .student-heading',
      '.year-card',
      '.resource-card',
      '.recent-panel',
      '.note-row',
      '.materials-browser',
      '.materials-group',
      '.ev-page-head',
      '.evc',
      '.album-view',
      '.alb-open-head',
      '.ev-page .alb',
      '.ev-page .gal figure',
      '.pj-card'
    ].join(',')

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('scroll-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' })

    const observed = new WeakSet()
    const observe = (scope) => {
      if (scope.matches?.(selector) && !observed.has(scope)) {
        observed.add(scope)
        scope.classList.add('scroll-reveal')
        observer.observe(scope)
      }
      scope.querySelectorAll?.(selector).forEach((element) => {
        if (observed.has(element)) return
        observed.add(element)
        element.classList.add('scroll-reveal')
        observer.observe(element)
      })
    }

    observe(document)
    const root = document.getElementById('contenido-principal') || document.body
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node.nodeType === 1) observe(node)
      }))
    })
    mutations.observe(root, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutations.disconnect()
    }
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

const statDetails = [
  {
    eyebrow: 'RECORRIDO ACADÉMICO',
    art: <svg viewBox="0 0 120 84" role="img" aria-label="Ilustración de calendario"><rect x="19" y="17" width="72" height="57" rx="9" fill="#DCEAFF" stroke="#3975bd" strokeWidth="2.5"/><path d="M19 31h72" stroke="#3975bd" strokeWidth="3"/><path d="M36 11v13M74 11v13" stroke="#3975bd" strokeWidth="5" strokeLinecap="round"/><path d="M34 43h9m8 0h9m8 0h9M34 56h9m8 0h9" stroke="#3975bd" strokeWidth="4" strokeLinecap="round"/><circle cx="91" cy="61" r="17" fill="#A9D0FF" stroke="#3975bd" strokeWidth="2.5"/><path d="m83 61 6 6 11-13" fill="none" stroke="#245D9D" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    detail: 'La duración prevista de la Tecnicatura Superior es de tres años.',
    note: 'Duración de la formación.'
  },
  {
    eyebrow: 'PLAN DE ESTUDIOS',
    art: <svg viewBox="0 0 120 84" role="img" aria-label="Ilustración de libros"><path d="M17 58 73 43l9 17-56 16z" fill="#B9E5CE" stroke="#25845b" strokeWidth="2.5"/><path d="m25 42 54-18 8 18-54 19z" fill="#E5F7EC" stroke="#25845b" strokeWidth="2.5"/><path d="m33 28 44-17 8 16-44 18z" fill="#8ED2AD" stroke="#25845b" strokeWidth="2.5"/><path d="m39 28 31-12" stroke="#25845b" strokeWidth="2"/><path d="M83 55h20v21H83z" fill="#D0EBDD" stroke="#25845b" strokeWidth="2.5"/><path d="M88 62h10M88 68h7" stroke="#25845b" strokeWidth="2" strokeLinecap="round"/></svg>,
    detail: 'El plan de estudios está organizado en espacios curriculares distribuidos a lo largo de la carrera.',
    note: 'Materias anuales informadas en el perfil.'
  },
  {
    eyebrow: 'DEDICACIÓN ACADÉMICA',
    art: <svg viewBox="0 0 120 84" role="img" aria-label="Ilustración de reloj"><circle cx="58" cy="43" r="31" fill="#FFE6C8" stroke="#BD762B" strokeWidth="3"/><circle cx="58" cy="43" r="23" fill="#FFF7EC" stroke="#E2A45F" strokeWidth="2"/><path d="M58 27v17l13 8" fill="none" stroke="#BD762B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M58 7v6M94 43h-6M58 79v-6M22 43h6" stroke="#BD762B" strokeWidth="3" strokeLinecap="round"/><path d="m88 15 7 1-1 7" fill="none" stroke="#BD762B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    detail: 'La carga horaria total informada para la carrera es de 2.912 horas cátedra.',
    note: 'Carga horaria total.'
  },
  {
    eyebrow: 'CURSADO',
    art: <svg viewBox="0 0 120 84" role="img" aria-label="Ilustración de aula"><rect x="12" y="9" width="96" height="48" rx="5" fill="#EEE5FC" stroke="#8054bd" strokeWidth="2.5"/><path d="M20 17h80v31H20z" fill="#FAF7FF"/><path d="M35 30h19m-19 8h31" stroke="#A98AD7" strokeWidth="3" strokeLinecap="round"/><circle cx="78" cy="31" r="7" fill="#D6C4F3"/><path d="M58 57v9M43 67h31" stroke="#8054bd" strokeWidth="3" strokeLinecap="round"/><circle cx="30" cy="69" r="7" fill="#B99CE5"/><circle cx="59" cy="69" r="7" fill="#D6C4F3"/><circle cx="88" cy="69" r="7" fill="#B99CE5"/></svg>,
    detail: 'La modalidad de cursado de la carrera es presencial.',
    note: 'Modalidad de cursado.'
  },
]

function Stats() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="career-stats-experience">
      <div className="career-stats-grid">
        {stats.map(([n, suf, label], index) => {
          const detail = statDetails[index]
          const active = selected === index
          return (
            <button
              type="button"
              className={`career-stat-card career-stat-card-${index + 1}${active ? ' is-selected' : ''}`}
              key={label}
              onClick={() => setSelected(active ? null : index)}
              aria-expanded={active}
              aria-controls="career-stat-detail"
            >
              <span className="career-stat-art" aria-hidden="true">
                {detail.art}
              </span>
              <span className="career-stat-number">
                {n.toLocaleString('es-AR')}{suf}
              </span>
              <span className="career-stat-label">{label}</span>
              <span className="career-stat-action">
                {active ? 'Ocultar información' : 'Ver información'}
                <span aria-hidden="true">{active ? '−' : '↗'}</span>
              </span>
            </button>
          )
        })}
      </div>
      {selected !== null && (
        <div className={`career-stat-detail career-stat-detail-${selected + 1}`} id="career-stat-detail" role="region" aria-live="polite" aria-labelledby="career-stat-detail-title">
          <span className="career-stat-detail-icon" aria-hidden="true">{statDetails[selected].art}</span>
          <div className="career-stat-detail-copy">
            <span className="career-stat-eyebrow">{statDetails[selected].eyebrow}</span>
            <h4 id="career-stat-detail-title">{stats[selected][2]}</h4>
            <p>{statDetails[selected].detail}</p>
            <small>{statDetails[selected].note}</small>
          </div>
          <button type="button" className="career-stat-detail-close" onClick={() => setSelected(null)} aria-label="Cerrar información">×</button>
        </div>
      )}
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

const teamIcons = {
  infra: <><rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="14" width="18" height="6" rx="1.5" /><path d="M7 7h.01M7 17h.01" /></>,
  dev: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />,
  press: <path d="M4 5h13v14H6a2 2 0 0 1-2-2zM17 9h3v8a2 2 0 0 1-2 2M7 9h7M7 13h7" />,
  data: <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" />,
}
const teamColors = { infra: '#1cff8a', dev: '#a78bfa', press: '#fb923c', data: '#10b981' }
const iniciales = (n) => n.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('')

function TeamIcon({ id, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {teamIcons[id]}
    </svg>
  )
}

function TeamModal({ equipo, onClose }) {
  const [person, setPerson] = useState(null)
  const closeRef = useRef(onClose)
  const personRef = useRef(person)
  useEffect(() => { closeRef.current = onClose }, [onClose])
  useEffect(() => { personRef.current = person }, [person])
  useEffect(() => {
    const opener = document.activeElement
    const prev = document.body.style.overflow
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (personRef.current) setPerson(null)
      else closeRef.current()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      requestAnimationFrame(() => { if (opener && document.contains(opener)) opener.focus() })
    }
  }, [])
  const contenerTab = (e) => {
    if (personRef.current || e.key !== 'Tab') return
    const items = Array.from(e.currentTarget.querySelectorAll('button:not([disabled]),[tabindex]:not([tabindex="-1"])'))
    if (!items.length) return
    const first = items[0], last = items[items.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
  }
  const contenerTabFoto = (e) => {
    if (e.key !== 'Tab') return
    const items = Array.from(e.currentTarget.querySelectorAll('button:not([disabled]),[tabindex]:not([tabindex="-1"])'))
    if (!items.length) return
    const first = items[0], last = items[items.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
  }
  const miembros = equipo.miembros.slice(0, 4)
  const n = miembros.length
  const head = {
    infra: <div className="tm-identity tm-identity-infra"><span className="tm-prompt"><i aria-hidden="true">●</i> sistema / equipos / infraestructura</span><span className="tm-overline">CENTRO DE OPERACIONES</span></div>,
    dev: <div className="tm-identity tm-identity-dev"><span className="tm-pill">✳ ESTUDIO DIGITAL</span><span className="tm-overline">DISEÑO · CÓDIGO · EXPERIENCIA</span></div>,
    press: <div className="tm-identity tm-identity-press"><span className="tm-overline">BOLETÍN INSTITUCIONAL / EQUIPO</span><span className="tm-press-rule">EDICIÓN <b>IES 06</b></span></div>,
    data: <div className="tm-identity tm-identity-data"><span className="tm-pill">◫ DATA & INSIGHTS</span><span className="tm-overline">OBSERVAR · MEDIR · CRECER</span></div>,
  }[equipo.id]

  return (
    <>
    <div className="tm-bg" onClick={onClose}>
      <div id={'equipo-dialog-' + equipo.id} className={'tm tm-' + equipo.id} role="dialog" aria-modal="true" aria-label={equipo.nombre} onClick={(e) => e.stopPropagation()} onKeyDown={contenerTab}>
        <button type="button" className="tm-x" aria-label="Cerrar" onClick={onClose} autoFocus>×</button>
        <div className="tm-head">
          {head}
          <h4>{equipo.nombre}</h4>
          <p className="tm-lema">{equipo.lema}</p>
          {equipo.id === 'data'
            ? <div className="tm-kpis"><div className="tm-kpi"><b>{n}</b>integrantes</div><div className="tm-kpi"><b>4</b>áreas del proyecto</div></div>
            : <p className="tm-count">{n} {n === 1 ? 'integrante' : 'integrantes'}</p>}
        </div>
        <div className={'tm-grid tm-grid-' + equipo.id}>
          {miembros.map((m, i) => (
            <article className={'tm-card' + (m.foto ? ' tm-click' : '')} key={i}
              {...(m.foto ? { role: 'button', tabIndex: 0, 'aria-label': 'Ver la foto de ' + m.nombre, onClick: () => setPerson(m), onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPerson(m) } } } : {})}>
              <div className="tm-photo">
                {m.foto ? <img src={m.foto} alt={m.nombre} loading="lazy" style={m.pos ? { objectPosition: m.pos } : undefined} /> : <span aria-hidden="true">{iniciales(m.nombre)}</span>}
              </div>
              <div className="tm-body">
                <h5 title={m.nombre}>{m.nombre}</h5>
                <p className="tm-rol">{m.rol}</p>
                <p className="tm-desc">{m.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
    {person && (
      <div className="pm-bg" onClick={() => setPerson(null)}>
        <figure className="pm" role="dialog" aria-modal="true" aria-label={person.nombre} style={{ '--c': teamColors[equipo.id] }} onClick={(e) => e.stopPropagation()} onKeyDown={contenerTabFoto}>
          <button type="button" className="pm-x" aria-label="Cerrar" onClick={() => setPerson(null)} autoFocus>×</button>
          <img src={person.foto} alt={person.nombre} />
          <figcaption>{person.nombre}</figcaption>
        </figure>
      </div>
    )}
    </>
  )
}

function Creadores() {
  const [sel, setSel] = useState(null)
  const cur = equipos.find((e) => e.id === sel)
  return (
    <>
      <div className="teams">
        {equipos.map((e) => (
          <button type="button" key={e.id} className="team-btn" style={{ '--c': teamColors[e.id] }} onClick={() => setSel(e.id)} aria-haspopup="dialog" aria-expanded={sel === e.id} aria-controls={'equipo-dialog-' + e.id}>
            <TeamIcon id={e.id} />
            <span>{e.corto}</span>
          </button>
        ))}
      </div>
      {cur && <TeamModal equipo={cur} onClose={() => setSel(null)} />}
    </>
  )
}

const themeIcons = {
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
}

function Lightbox({ src, alt, onClose }) {
  const closeRef = useRef(onClose)
  useEffect(() => { closeRef.current = onClose }, [onClose])
  useEffect(() => {
    const opener = document.activeElement
    const prev = document.body.style.overflow
    const onKey = (e) => { if (e.key === 'Escape') closeRef.current() }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      requestAnimationFrame(() => { if (opener && document.contains(opener)) opener.focus() })
    }
  }, [])
  const contenerTab = (e) => {
    if (e.key !== 'Tab') return
    const elementos = Array.from(e.currentTarget.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'))
    if (!elementos.length) return
    const primero = elementos[0]
    const ultimo = elementos[elementos.length - 1]
    if (e.shiftKey && document.activeElement === primero) {
      e.preventDefault()
      ultimo.focus()
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault()
      primero.focus()
    }
  }
  return (
    <div className="modal-bg lb" onClick={onClose}>
      <div className="lb-in" role="dialog" aria-modal="true" aria-label={alt} onClick={(e) => e.stopPropagation()} onKeyDown={contenerTab}>
        <button className="lb-x" aria-label="Cerrar" onClick={onClose} autoFocus>×</button>
        <img src={src} alt={alt} />
      </div>
    </div>
  )
}

const evIcons = {
  fecha: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  hora: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  lugar: <><path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
}
function EvIcon({ n }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{evIcons[n]}</svg>
}

function Eventos() {
  const [zoom, setZoom] = useState(null)
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0)
  const lista = eventosProximos
    .map((e) => { const [y, m, d] = e.fecha.split('-').map(Number); return { ...e, f: new Date(y, m - 1, d) } })
    .filter((e) => e.f >= hoy)
    .sort((a, b) => a.f - b.f)
  if (!lista.length) return null
  return (
    <section id="eventos" className="reveal">
      <h3>Próximos eventos</h3>
      <div className="events">
        {lista.map((e) => {
          const dias = Math.round((e.f - hoy) / 86400000)
          const badge = dias === 0 ? '¡Hoy!' : dias === 1 ? '¡Mañana!' : `En ${dias} días`
          const fecha = e.f.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
          return (
            <article className="ev" key={e.titulo + e.fecha}>
              <button className="ev-img" onClick={() => setZoom(e)} aria-label={'Ampliar el flyer de ' + e.titulo}>
                <img src={e.flyer} alt={e.alt || e.titulo} loading="lazy" />
                <span className="ev-zoom">Tocá para ampliar</span>
              </button>
              <div className="ev-body">
                <span className="ev-badge">{badge}</span>
                <h4>{e.titulo}</h4>
                {e.desc && <p className="ev-desc">{e.desc}</p>}
                <ul className="ev-meta">
                  <li><EvIcon n="fecha" /><span>{fecha.charAt(0).toUpperCase() + fecha.slice(1)}</span></li>
                  {e.hora && <li><EvIcon n="hora" /><span>{e.hora}</span></li>}
                  {e.lugar && <li><EvIcon n="lugar" /><span>{e.lugar}</span></li>}
                </ul>
                {e.enlace && <a className="btn" href={e.enlace} target="_blank" rel="noopener noreferrer">Más información</a>}
              </div>
            </article>
          )
        })}
      </div>
      {zoom && <Lightbox src={zoom.flyer} alt={zoom.alt || zoom.titulo} onClose={() => setZoom(null)} />}
    </section>
  )
}

function useCols() {
  const calc = () => (window.innerWidth >= 900 ? 3 : window.innerWidth >= 600 ? 2 : 1)
  const [n, setN] = useState(calc)
  useEffect(() => {
    const f = () => setN(calc())
    window.addEventListener('resize', f)
    return () => window.removeEventListener('resize', f)
  }, [])
  return n
}

function Noticias() {
  const n = useCols()
  const [noticiasActuales, setNoticiasActuales] = useState(noticias)
  const [cargando, setCargando] = useState(true)
  const [errorNoticias, setErrorNoticias] = useState(false)
  const [actualizado, setActualizado] = useState(null)
  const [page, setPage] = useState(0)
  const [play, setPlay] = useState(!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches))
  const [pausa, setPausa] = useState(false)
  const requestRef = useRef(null)

  const cargarNoticias = async () => {
    requestRef.current?.abort()
    const controller = new AbortController()
    requestRef.current = controller
    setCargando(true)
    try {
      const respuesta = await fetch('/api/noticias', { signal: controller.signal })
      if (!respuesta.ok) throw new Error('No se pudieron obtener las noticias')
      const datos = await respuesta.json()
      if (!Array.isArray(datos.noticias)) throw new Error('Respuesta de noticias inválida')
      if (requestRef.current !== controller) return
      setNoticiasActuales(datos.noticias)
      setActualizado(datos.actualizado || new Date().toISOString())
      setErrorNoticias(false)
      setPage(0)
    } catch (error) {
      if (error.name !== 'AbortError' && requestRef.current === controller) setErrorNoticias(true)
    } finally {
      if (requestRef.current === controller) {
        requestRef.current = null
        setCargando(false)
      }
    }
  }

  useEffect(() => {
    cargarNoticias()
    return () => {
      requestRef.current?.abort()
      requestRef.current = null
    }
  }, [])

  const total = noticiasActuales.length
  const pages = Math.max(1, Math.ceil(total / n))
  const p = Math.min(page, pages - 1)
  const idx = Math.max(0, Math.min(p * n, total - n))
  useEffect(() => {
    if (!play || pausa || pages < 2) return
    const t = setInterval(() => {
      if (!document.hidden) setPage((x) => (Math.min(x, pages - 1) + 1) % pages)
    }, 6500)
    return () => clearInterval(t)
  }, [play, pausa, pages])
  const go = (d) => setPage((x) => (Math.min(x, pages - 1) + d + pages) % pages)
  const fechaActualizacion = actualizado
    ? new Date(actualizado).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })
    : ''

  return (
    <section id="noticias" className="reveal" aria-roledescription="carrusel" aria-label="Noticias IA"
      onMouseEnter={() => setPausa(true)} onMouseLeave={() => setPausa(false)} onFocus={() => setPausa(true)} onBlur={() => setPausa(false)}>
      <div className="nw-head">
        <h3>Noticias IA</h3>
        <div className="nw-dots" role="group" aria-label="Páginas del carrusel">
          {Array.from({ length: pages }, (_, i) => (
            <button type="button" key={i} className={i === p ? 'on' : ''} aria-label={`Página ${i + 1} de ${pages}`} aria-current={i === p ? 'page' : undefined} onClick={() => setPage(i)} />
          ))}
        </div>
        <div className="nw-ctl">
          <button type="button" aria-label="Noticias anteriores" onClick={() => go(-1)} disabled={!total || pages < 2}>←</button>
          <button type="button" aria-label="Noticias siguientes" onClick={() => go(1)} disabled={!total || pages < 2}>→</button>
          <button type="button" aria-label={play ? 'Pausar el carrusel' : 'Reanudar el carrusel'} aria-pressed={!play} onClick={() => setPlay(!play)} disabled={pages < 2}>{play ? '❚❚' : '▶'}</button>
        </div>
      </div>
      <div className="nw-view">
        <div className="nw-track" style={{ '--n': n, '--i': idx }} aria-live={play && !pausa ? 'off' : 'polite'}>
          {noticiasActuales.map((nw, i) => {
            const vis = i >= idx && i < idx + n
            return (
              <article className="nw-card" key={nw.enlace || nw.titulo} aria-hidden={!vis}>
                <p className="nw-cat">{nw.categoria}</p>
                <h4 className="nw-t"><a href={nw.enlace} target="_blank" rel="noopener noreferrer" tabIndex={vis ? 0 : -1}>{nw.titulo}</a></h4>
                <p className="nw-date">{nw.fecha}</p>
                <div className="nw-body">
                  <div className={'nw-thumb' + (nw.imagen ? ' nw-thumb-photo' : '')} style={{ background: `linear-gradient(135deg, ${nw.colores[0]}, ${nw.colores[1]})` }} aria-hidden="true">
                    {nw.imagen && <img src={nw.imagen} alt="" loading="lazy" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display = 'none' }} />}
                    <b>{nw.cifra}</b><span>{nw.cifraTxt}</span>
                  </div>
                  <p className="nw-ex">{nw.texto}</p>
                </div>
                <p className="nw-src">Fuente: {nw.fuente}</p>
              </article>
            )
          })}
        </div>
        {cargando && <p className="nw-note">Buscando las noticias más recientes…</p>}
        {!cargando && !total && <p className="nw-note">No hay noticias disponibles en este momento. Volvé a intentarlo más tarde.</p>}
        {errorNoticias && <p className="nw-note">No se pudo actualizar el feed. Se volverá a intentar en la próxima visita.</p>}
      </div>
      <p className="nw-note">
        {actualizado ? `Actualizado: ${fechaActualizacion} · ` : ''}
        Noticias recientes de fuentes externas. Consultá cada publicación original para ver el detalle completo.
        <button type="button" onClick={cargarNoticias} disabled={cargando}> {cargando ? 'Actualizando…' : 'Actualizar ahora'}</button>
      </p>
    </section>
  )
}

function Calendar({ extra = {} }) {
  const hoy = new Date()
  const [m, setM] = useState({ y: hoy.getFullYear(), mo: hoy.getMonth() })
  const [direccion, setDireccion] = useState(1)
  const [seleccion, setSeleccion] = useState(null)
  const hoyKey = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`

  // Fechas fijas (data.js) + eventos publicados desde Supabase.
  const ev = (k) => {
    const a = events[k], b = extra[k]
    if (!a || !b) return a || b || ''
    const w = (t) => t.toLowerCase().split(' ').slice(0, 2).join(' ')
    return w(a) === w(b) ? b : a + ' / ' + b
  }
  const first = (new Date(m.y, m.mo, 1).getDay() + 6) % 7
  const days = new Date(m.y, m.mo + 1, 0).getDate()
  const eventosMes = []
  const cells = Array.from({ length: first }, (_, i) => <div key={'b' + i} className="c x" aria-hidden="true" />)

  for (let d = 1; d <= days; d++) {
    const k = `${m.y}-${String(m.mo + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const titulo = ev(k)
    if (titulo) eventosMes.push({ fecha: k, dia: d, titulo })
    cells.push(
      <button
        key={d}
        type="button"
        className={'c cal-day' + (titulo ? ' e' : '') + (k === hoyKey ? ' is-today' : '') + (seleccion === k ? ' is-selected' : '')}
        style={{ '--cal-i': d }}
        title={titulo || `${d} de ${meses[m.mo]}`}
        aria-label={titulo ? `${d} de ${meses[m.mo]}: ${titulo}` : `${d} de ${meses[m.mo]}`}
        aria-pressed={seleccion === k}
        onClick={() => setSeleccion(k)}
      >
        {d}
        {titulo && <span className="cal-day-dot" aria-hidden="true" />}
      </button>
    )
  }

  const go = (n) => {
    setDireccion(n)
    setSeleccion(null)
    setM((p) => {
      const t = new Date(p.y, p.mo + n, 1)
      return { y: t.getFullYear(), mo: t.getMonth() }
    })
  }
  const detalleSeleccion = seleccion ? ev(seleccion) : ''
  const fechaElegida = seleccion ? new Date(Number(seleccion.slice(0, 4)), Number(seleccion.slice(5, 7)) - 1, Number(seleccion.slice(8, 10))) : null
  const fechaTexto = fechaElegida ? fechaElegida.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : ''
  const titulosElegidos = detalleSeleccion ? detalleSeleccion.split(' / ') : []

  return (
    <div className="cal">
      <div className="cal-h">
        <button type="button" onClick={() => go(-1)} aria-label="Mes anterior">‹</button>
        <span key={`${m.y}-${m.mo}`} aria-live="polite" aria-atomic="true" className="cal-month-title">{meses[m.mo]} {m.y}</span>
        <button type="button" onClick={() => go(1)} aria-label="Mes siguiente">›</button>
      </div>
      <div className="cal-weekdays" aria-hidden="true">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d) => <div key={d} className="d">{d}</div>)}
      </div>
      <div key={`${m.y}-${m.mo}`} className={'cal-g cal-month-enter ' + (direccion < 0 ? 'cal-prev' : 'cal-next')} role="group" aria-label={`Calendario de ${meses[m.mo]} de ${m.y}`}>
        {cells}
      </div>
      <div className="cal-legend">
        <span><i className="cal-legend-dot" /> Fechas con actividades</span>
        {eventosMes.length > 0 && <span>{eventosMes.length} {eventosMes.length === 1 ? 'fecha destacada' : 'fechas destacadas'}</span>}
      </div>
      <div className={'cal-agenda' + (seleccion ? ' has-selection' : '')} aria-live="polite">
        {seleccion ? (
          <>
            <div className="cal-agenda-heading">
              <div>
                <span className="cal-agenda-eyebrow">AGENDA DEL DÍA</span>
                <h4>{fechaTexto.charAt(0).toUpperCase() + fechaTexto.slice(1)}</h4>
              </div>
              <button type="button" className="cal-clear" onClick={() => setSeleccion(null)} aria-label="Cerrar detalle de la fecha">×</button>
            </div>
            {titulosElegidos.length ? (
              <ul className="cal-agenda-list">{titulosElegidos.map((t, i) => <li key={i}><span className="cal-agenda-mark" />{t}</li>)}</ul>
            ) : <p className="cal-agenda-empty">No hay actividades programadas para esta fecha.</p>}
          </>
        ) : (
          <p className="cal-agenda-hint">Seleccioná una fecha para consultar sus actividades.</p>
        )}
      </div>
    </div>
  )
}

function Faq() {
  const [open, setOpen] = useState(null)
  return (
    <div className="faq">
      {faqs.map(([q, a], i) => {
        const expandida = open === i
        const triggerId = 'faq-trigger-' + i
        const panelId = 'faq-panel-' + i
        return (
          <div key={q} className={expandida ? 'open' : ''}>
            <button id={triggerId} type="button" onClick={() => setOpen(expandida ? null : i)}
              aria-expanded={expandida} aria-controls={panelId}>
              {q}<span className="chev" aria-hidden="true">⌄</span>
            </button>
            {expandida && <div id={panelId} className="a" role="region" aria-labelledby={triggerId}><Linkify text={a} /></div>}
          </div>
        )
      })}
    </div>
  )
}

const links = [['Inicio', '#concepto'], ['Perfil', '#perfil'], ['Prácticas', '#pasantias'], ['Plan de estudio', '#plan'], ['Eventos', '/eventos'], ['Noticias IA', '#noticias'], ['Preguntas', '#faq'], ['Alumnos', '/alumnos'], ['Contacto', '#contacto']]
// Orden real de aparición en la página (no el orden visual del menú).
const ids = ['concepto', 'perfil', 'pasantias', 'noticias', 'plan', 'faq', 'contacto']

// Materias del plan de estudio (Res. 3098-E), para el buscador
const materias = [
  [1, ['Álgebra', 'Análisis Matemático', 'Programación I', 'Ciencia y TIC', 'Base de Datos', 'Redes', 'Prácticas Profesionalizantes I', 'EDI I', 'Inglés Técnico']],
  [2, ['Ciencia de Datos', 'Estadística y Probabilidad', 'Programación II', 'Lógica', 'Introducción a la Inteligencia Artificial', 'Machine Learning', 'Prácticas Profesionalizantes II', 'EDI II']],
  [3, ['Gestión de Proyectos', 'Minería de Datos', 'Reconocimiento Visual', 'Ciberseguridad', 'Ética y Deontología Profesional', 'Analítica Web', 'Procesamiento del Lenguaje Natural', 'Prácticas Profesionalizantes III']],
]

const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

const indice = [
  ...links.map(([t, href]) => ({ t, w: 'Sección', href })),
  { t: 'Calendario académico', w: 'Eventos', href: '/eventos#calendario' },
  { t: 'Galería institucional', w: 'Eventos', href: '/eventos#galeria', x: 'fotos álbumes' },
  ...tabs.map(([t, , items]) => ({ t, w: 'Perfil', href: '#perfil', x: items.join(' ') })),
  ...internships.map((item) => ({ t: item.title, w: 'Prácticas', href: '#pasantias', x: item.description })),
  ...noticias.map((n) => ({ t: n.titulo, w: 'Noticias IA', href: '#noticias', x: n.fuente })),
  ...faqs.map(([q, a]) => ({ t: q, w: 'Preguntas frecuentes', href: '#faq', x: a })),
  ...materias.flatMap(([anio, lista]) => lista.map((m) => ({ t: m, w: `Plan de estudio · ${anio}.º año`, href: '#plan' }))),
].map((i) => ({ ...i, n: norm(i.t), h: norm(i.t + ' ' + (i.x || '')) }))

function useActive() {
  const [act, setAct] = useState(ids[0])
  useEffect(() => {
    let raf = 0
    const calc = () => {
      raf = 0
      const barra = document.querySelector('.hd-bar')
      // Al llegar al final del documento, la última sección debe quedar activa.
      const alFinal = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 12
      if (alFinal) {
        setAct('contacto')
        return
      }
      // La línea de activación queda dentro del contenido, debajo de la barra fija.
      const linea = Math.max(150, (barra?.getBoundingClientRect().height || 54) + 88)
      if (window.scrollY < 90) {
        setAct('concepto')
        return
      }

      // La sección activa es la última que ya alcanzó la línea de lectura.
      // Se usa el orden real del documento para que Plan no quede detrás de Noticias IA.
      let activa = 'concepto'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= linea) activa = id
      }
      setAct(activa)
    }
    const programar = () => {
      if (!raf) raf = requestAnimationFrame(calc)
    }
    window.addEventListener('scroll', programar, { passive: true })
    window.addEventListener('resize', programar)
    window.addEventListener('hashchange', programar)
    calc()
    return () => {
      window.removeEventListener('scroll', programar)
      window.removeEventListener('resize', programar)
      window.removeEventListener('hashchange', programar)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  return act
}

function Wordmark() {
  return (
    <div className="wm" role="img" aria-label="IES-6, Instituto de Educación Superior">
      <svg width="46" height="42" viewBox="0 0 46 42" aria-hidden="true">
        <g stroke="#58b4ef" strokeWidth="3" strokeLinecap="round" fill="none"><path d="M10 22L24 9M10 22L26 34M24 9L38 20" /></g>
        <circle cx="10" cy="22" r="6" fill="#58b4ef" /><circle cx="24" cy="9" r="5" fill="#3a8fd6" /><circle cx="26" cy="34" r="5" fill="#8fd3f7" /><circle cx="39" cy="20" r="4" fill="#3a8fd6" />
      </svg>
      <span className="wm-t" aria-hidden="true">
        <span className="wm-n">IES-6</span>
        <span className="wm-s">Instituto de Educación Superior</span>
      </span>
    </div>
  )
}

function SearchBox() {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const nq = norm(q.trim())
  const terms = nq.split(/\s+/).filter(Boolean)
  const res = nq.length < 2 ? [] : indice
    .filter((i) => terms.every((t) => i.h.includes(t)))
    .sort((a, b) => Number(b.n.includes(nq)) - Number(a.n.includes(nq)))
    .slice(0, 6)
  const show = open && nq.length >= 2
  const cerrar = () => { setOpen(false); setQ('') }
  // desde /eventos los enlaces internos (#plan, #faq…) deben apuntar a la página de inicio
  const ruta = window.location.pathname.replace(/\/+$/, '')
  const enOtraPagina = ruta === '/eventos' || ruta === '/alumnos'
  const destino = (h) => (h.startsWith('/') ? h : enOtraPagina ? '/' + h : h)
  const enviar = (e) => {
    e.preventDefault()
    if (res[0]) {
      const d = destino(res[0].href)
      if (d.startsWith('/')) window.location.href = d
      else window.location.hash = d
      cerrar()
    }
  }
  return (
    <form className="srch" role="search" onSubmit={enviar} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false) }}>
      <div className="srch-f">
        <label className="sr" htmlFor="buscar">Buscar en el sitio</label>
        <input id="buscar" type="search" placeholder="Buscar…" autoComplete="off" value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => { if (e.key === 'Escape') cerrar() }}
          aria-controls="res-busqueda" />
        <button type="submit" aria-label="Buscar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
        </button>
      </div>
      {show && (
        <>
          <p className="sr" role="status">{res.length ? `${res.length} resultados` : 'Sin resultados'}</p>
          <ul id="res-busqueda" className="srch-res" onMouseDown={(e) => e.preventDefault()}>
            {res.length
              ? res.map((r, i) => (
                <li key={r.t + i}><a href={destino(r.href)} onClick={cerrar}><b>{r.t}</b><small>{r.w}</small></a></li>
              ))
              : <li className="none">Sin resultados para “{q.trim()}”. Probá con otra palabra.</li>}
          </ul>
        </>
      )}
    </form>
  )
}

function NetSvg({ cls }) {
  const pts = [[70, 60], [120, 20], [190, 70], [250, 30], [60, 130], [130, 150]]
  return (
    <svg className={'net-c ' + cls} viewBox="0 0 300 200" aria-hidden="true" stroke="currentColor" strokeWidth="1" fill="currentColor">
      <path fill="none" d="M0 30L70 60L120 20L190 70L250 30L300 50M70 60L60 130L130 150L190 70M120 20L170 0M60 130L0 170M130 150L180 190M250 30L270 0" />
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 2 ? 4.5 : 3} />)}
    </svg>
  )
}

const pt = (a, r) => { const t = (a * Math.PI) / 180; return [200 + r * Math.cos(t), 200 + r * Math.sin(t)] }
const nodoAngulos = [-62, -18, 34, 122, 196, 248]

function HeroBadge() {
  return (
    <div className="hero-badge">
      <svg className="hb-rings" viewBox="0 0 400 400" aria-hidden="true">
        <circle className="r1" cx="200" cy="200" r="136" />
        <circle className="r2" cx="200" cy="200" r="147" />
        <g className="hb-spin"><circle className="r3" cx="200" cy="200" r="161" /></g>
        <circle className="r4" cx="200" cy="200" r="176" />
        {nodoAngulos.map((a) => {
          const [x1, y1] = pt(a, 176)
          const [x2, y2] = pt(a, 188)
          const [cx, cy] = pt(a, 193)
          return (
            <g key={a}>
              <line className="sp" x1={x1.toFixed(1)} y1={y1.toFixed(1)} x2={x2.toFixed(1)} y2={y2.toFixed(1)} />
              <circle className="nd" cx={cx.toFixed(1)} cy={cy.toFixed(1)} r="4.5" />
            </g>
          )
        })}
      </svg>
      <img className="hb-img" src="/logo.jpg" alt="Logo de la Tecnicatura Superior en Ciencia de Datos e Inteligencia Artificial, IES 6 sede Perico" width="248" height="248" />
    </div>

  )
}

// Efectos de la portada: un resplandor que sigue al mouse y un leve movimiento de profundidad (solo con mouse; se apaga con "reducir movimiento")
function useHeroFx() {
  useEffect(() => {
    const hero = document.querySelector('.hero')
    if (!hero || !window.matchMedia) return undefined
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let raf = 0
    const mover = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const r = hero.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width
        const y = (e.clientY - r.top) / r.height
        hero.style.setProperty('--gx', (x * 100).toFixed(1) + '%')
        hero.style.setProperty('--gy', (y * 100).toFixed(1) + '%')
        hero.style.setProperty('--px', ((x - 0.5) * 2).toFixed(3))
        hero.style.setProperty('--py', ((y - 0.5) * 2).toFixed(3))
      })
    }
    const entrar = () => hero.classList.add('hx-on')
    const salir = () => { hero.classList.remove('hx-on'); hero.style.setProperty('--px', '0'); hero.style.setProperty('--py', '0') }
    hero.addEventListener('pointermove', mover)
    hero.addEventListener('pointerenter', entrar)
    hero.addEventListener('pointerleave', salir)
    return () => {
      hero.removeEventListener('pointermove', mover)
      hero.removeEventListener('pointerenter', entrar)
      hero.removeEventListener('pointerleave', salir)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
}

export default function App() {
  const [nav, setNav] = useState(false)
  const [theme, setTheme] = useState(() => {
    try { const t = localStorage.getItem('tema'); if (t === 'dark' || t === 'light') return t } catch (e) { /* sin almacenamiento */ }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('tema', theme) } catch (e) { /* sin almacenamiento */ }
  }, [theme])
  useReveal()
  useScrollReveal()

  const act = useActive()
  useHeroFx()

  const rutaActual = window.location.pathname.replace(/\/+$/, '')
  const esEventos = rutaActual === '/eventos'
  const esAlumnos = rutaActual === '/alumnos'
  useEffect(() => {
    const cerrarConEscape = (e) => { if (e.key === 'Escape') setNav(false) }
    window.addEventListener('keydown', cerrarConEscape)
    return () => window.removeEventListener('keydown', cerrarConEscape)
  }, [])

  return (
    <>
      <a className="skip-link" href="#contenido-principal">Saltar al contenido</a>
      <header className="hd-top">
        <div className="wrap hd-top-in">
          <Wordmark />
          <span className="hd-sep" aria-hidden="true" />
          <img className="hd-badge" src="/logo.jpg" alt="" width="64" height="64" />
          <h1>Ciencia de Datos e IA</h1>
        </div>
      </header>
      <div className="hd-bar">
        <div className="wrap hd-bar-in">
          <button className={'burger' + (nav ? ' is-open' : '')} aria-label={nav ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={nav} aria-controls="menu-principal" onClick={() => setNav(!nav)}><span aria-hidden="true">{nav ? '×' : '☰'}</span></button>
          <a className="hd-brand" href={esEventos || esAlumnos ? '/' : '#concepto'}>
            <img className="brand" src="/logo.jpg" alt="" width="28" height="28" />
            <span>Ciencia de Datos e IA</span>
          </a>
          <nav id="menu-principal" aria-label="Principal" className={nav ? 'open' : ''} onClick={(e) => { if (e.target.closest('a')) setNav(false) }}>
            {links.map(([t, href]) => {
              const actual = href === '/eventos' ? esEventos : href === '/alumnos' ? esAlumnos : !esEventos && !esAlumnos && act === href.slice(1)
              const destino = (esEventos || esAlumnos) && href.startsWith('#') ? '/' + href : href
              return <a key={href} href={destino} aria-current={actual ? (href.startsWith('/') ? 'page' : 'location') : undefined}>{t}</a>
            })}
            <SearchBox />
          </nav>
          <button className="theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'} title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{theme === 'dark' ? themeIcons.sun : themeIcons.moon}</svg>
          </button>
        </div>
      </div>

      <main id="contenido-principal" tabIndex="-1">
      {esEventos ? <EventosView ui={{ Calendar, Lightbox }} /> : esAlumnos ? <StudentsViewExternal standalone /> : (<>
      <div className="hero" id="concepto">
        <NetSvg cls="net-tl" />
        <NetSvg cls="net-tr" />
        <NetSvg cls="net-bl" />
        <div className="wrap">
          <div className="hero-txt">
            <h2>¡Vení a estudiar con nosotros!<span>y aprendé a convertir datos en decisiones</span></h2>
            <p>La Ciencia de Datos combina estadística, programación e inteligencia artificial para entender problemas complejos y proponer soluciones basadas en evidencia.</p>
            <a className="btn btn-soft" href="#plan">Ver plan de estudio</a>
          </div>
          <HeroBadge />
        </div>
      </div>

      <div className="wrap">
        <Tabs />

        <section className="career-data reveal" aria-labelledby="career-data-title">
          <h3 id="career-data-title">Datos de la carrera</h3>
          <Stats />
        </section>

        <Internships />

        <Noticias />

        <div className="two">
          <section id="plan" className="reveal">
            <h3>Plan de estudio</h3>
            <div className="pdf plan-card">
              <div className="plan-file-icon" aria-hidden="true">
                <svg width="56" height="68" viewBox="0 0 56 68" fill="none">
                  <path d="M5 2h30l16 16v46a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" fill="currentColor" opacity=".16" />
                  <path d="M35 2v16h16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M3 42h48v14H3z" fill="#d94343" />
                  <text x="27" y="53" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">PDF</text>
                </svg>
              </div>
              <div className="plan-copy">
                <span className="plan-kicker">Documento de consulta</span>
                <p>Consultá las materias de cada año, la carga horaria y los requisitos de cursada.</p>
                <div className="plan-actions">
                  <a className="btn" href="/plan-de-estudio.pdf" target="_blank" rel="noopener noreferrer">Ver plan de estudio <span aria-hidden="true">↗</span></a>
                  <a className="plan-download" href="/plan-de-estudio.pdf" download>Descargar PDF <span aria-hidden="true">↓</span></a>
                </div>
              </div>
            </div>
          </section>
          <section id="eventos-home" className="reveal"><h3>Eventos y galería</h3><EventosTeaser /></section>
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

      </>)}
      </main>

      <footer>
        <div className="wrap ft-cols">
          <div>
            <h5>Coordinador</h5>
            <div className="coord">
              <div className="av">{coordinador.foto ? <img src={coordinador.foto} alt={coordinador.nombre} width="56" height="56" /> : coordinador.iniciales}</div>
              <div><p><b>{coordinador.nombre}</b></p><p>Coordinador de la carrera</p></div>
            </div>
          </div>
          <div className="ft-dir">
            <h5>Dirección</h5>
            <a className="ft-map" href={MAPS_LINK} target="_blank" rel="noopener noreferrer" aria-label="Ver la ubicación del IES N.º 6 en Google Maps">
              <svg width="20" height="26" viewBox="0 0 30 38" aria-hidden="true">
                <path d="M15 1C8 1 2 7 2 14c0 10 13 23 13 23s13-13 13-23C28 7 22 1 15 1z" fill="#4cc3bf" /><circle cx="15" cy="14" r="5" fill="#1f2d3a" />
              </svg>
              <span><b>IES N.º 6 – Sede Perico</b><small>Ver en Google Maps ↗</small></span>
            </a>
          </div>
          <div>
            <h5>Redes sociales</h5>
            <div className="soc">
              {Object.keys(socialIcons).map((k) => (
                social[k] && social[k] !== '#'
                  ? <a key={k} href={social[k]} aria-label={socialNames[k]} target="_blank" rel="noopener noreferrer">{socialIcons[k]}</a>
                  : <span key={k} className="soc-off" role="img" aria-label={socialNames[k] + ' (próximamente)'} title={socialNames[k] + ' (próximamente)'}>{socialIcons[k]}</span>
              ))}
            </div>
          </div>
          <div className="ft-team">
            <h5>Creadores</h5>
            <Creadores />
          </div>
        </div>
        <div className="wrap ft-bar">
          <span>© {new Date().getFullYear()} Tecnicatura Superior en Ciencia de Datos e IA · IES N.º 6 – Sede Perico, Jujuy{esNavidad() ? ' · ¡Felices Fiestas! 🎄' : ''}</span>
          <div className="ft-act">
            <a className="btn" href="https://nexo.jujuy.edu.ar/" target="_blank" rel="noopener noreferrer">Inscribite →</a>
            <button className="ft-up" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Volver arriba" title="Volver arriba">↑</button>
          </div>
        </div>
      </footer>
      <AccessibilityWidget />
      <CookieConsent />
    </>
  )
}
