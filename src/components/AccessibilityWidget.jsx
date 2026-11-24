import React, { useEffect, useState } from 'react'

const DEFAULTS = { scale: 1, contrast: false, links: false, readable: false, motion: false }

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('ies6-accesibilidad') || 'null')
      return saved ? { ...DEFAULTS, ...saved } : DEFAULTS
    } catch { return DEFAULTS }
  })

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--a11y-font-scale', String(settings.scale))
    root.classList.toggle('a11y-high-contrast', settings.contrast)
    root.classList.toggle('a11y-highlight-links', settings.links)
    root.classList.toggle('a11y-readable-font', settings.readable)
    root.classList.toggle('a11y-reduced-motion', settings.motion)
    try { localStorage.setItem('ies6-accesibilidad', JSON.stringify(settings)) } catch { /* almacenamiento opcional */ }
  }, [settings])

  const update = (key, value) => setSettings(current => ({ ...current, [key]: value }))
  const reset = () => setSettings(DEFAULTS)

  return (
    <div className="a11y-widget">
      {open && (
        <section className="a11y-panel" id="a11y-panel" aria-label="Opciones de accesibilidad">
          <div className="a11y-panel-head">
            <div><span className="a11y-kicker">IES N.º 6</span><h2>Accesibilidad</h2></div>
            <button type="button" className="a11y-close" onClick={() => setOpen(false)} aria-label="Cerrar opciones">×</button>
          </div>
          <p className="a11y-help">Personalizá la lectura de la página.</p>
          <div className="a11y-font-controls">
            <span className="a11y-control-label">Tamaño de letra</span>
            <div className="a11y-font-buttons">
              <button type="button" onClick={() => update('scale', Math.max(1, +(settings.scale - .1).toFixed(2)))} disabled={settings.scale <= 1} aria-label="Reducir tamaño de letra">A−</button>
              <strong aria-live="polite">{Math.round(settings.scale * 100)}%</strong>
              <button type="button" onClick={() => update('scale', Math.min(1.4, +(settings.scale + .1).toFixed(2)))} disabled={settings.scale >= 1.4} aria-label="Aumentar tamaño de letra">A+</button>
            </div>
          </div>
          <div className="a11y-options">
            <button type="button" className={settings.contrast ? 'is-active' : ''} aria-pressed={settings.contrast} onClick={() => update('contrast', !settings.contrast)}><span aria-hidden="true">◐</span><span><b>Alto contraste</b><small>Mejora la diferencia entre texto y fondo</small></span></button>
            <button type="button" className={settings.links ? 'is-active' : ''} aria-pressed={settings.links} onClick={() => update('links', !settings.links)}><span aria-hidden="true">↗</span><span><b>Resaltar enlaces</b><small>Subraya los enlaces de la página</small></span></button>
            <button type="button" className={settings.readable ? 'is-active' : ''} aria-pressed={settings.readable} onClick={() => update('readable', !settings.readable)}><span aria-hidden="true">Aa</span><span><b>Letra más legible</b><small>Usa una tipografía sencilla y clara</small></span></button>
            <button type="button" className={settings.motion ? 'is-active' : ''} aria-pressed={settings.motion} onClick={() => update('motion', !settings.motion)}><span aria-hidden="true">Ⅱ</span><span><b>Reducir movimiento</b><small>Desactiva animaciones y desplazamientos</small></span></button>
          </div>
          <button type="button" className="a11y-reset" onClick={reset}>Restablecer ajustes</button>
        </section>
      )}
      <button type="button" className="a11y-trigger" aria-label={open ? 'Cerrar menú de accesibilidad' : 'Abrir menú de accesibilidad'} aria-expanded={open} aria-controls="a11y-panel" title="Accesibilidad" onClick={() => setOpen(value => !value)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="4.5" r="2.1"/><path d="M4 8.5h16M12 8.5v5m0 0-4 7m4-7 4 7M7 8.5l2 5h6l2-5"/></svg>
      </button>
    </div>
  )
}
