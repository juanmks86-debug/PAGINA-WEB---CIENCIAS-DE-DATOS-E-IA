import React, { useEffect, useState } from 'react'
import { esNavidad } from '../navidad.js'

// Posiciones fijas para evitar saltos entre renders.
const COPOS = Array.from({ length: 22 }, (_, i) => {
  const r = (n) => { const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453; return x - Math.floor(x) }
  return { x: Math.round(r(1) * 100), s: 3 + Math.round(r(2) * 4), d: 10 + Math.round(r(3) * 9), l: -Math.round(r(4) * 18), dx: Math.round((r(5) - 0.5) * 65) }
})

export default function Navidad() {
  const disponible = esNavidad()
  const [visible, setVisible] = useState(disponible)

  useEffect(() => {
    document.documentElement.classList.toggle('navidad', visible)
    return () => document.documentElement.classList.remove('navidad')
  }, [visible])

  if (!disponible) return null

  return (
    <>
      {visible && (
        <>
          <div className="nv-lights" aria-hidden="true" />
          <div className="nv-snow" aria-hidden="true">
            {COPOS.map((c, i) => (
              <i key={i} style={{ '--x': c.x + '%', '--s': c.s + 'px', '--d': c.d + 's', '--l': c.l + 's', '--dx': c.dx + 'px' }} />
            ))}
          </div>
        </>
      )}
      <button
        type="button"
        className="nv-toggle"
        aria-pressed={visible}
        onClick={() => setVisible((current) => !current)}
        title={visible ? 'Desactivar decoración navideña' : 'Activar decoración navideña'}
      >
        <span aria-hidden="true">🎄</span>
        <span>{visible ? 'Desactivar Navidad' : 'Activar Navidad'}</span>
      </button>
    </>
  )
}
