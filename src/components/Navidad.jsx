import React, { useEffect } from 'react'
import { esNavidad } from '../navidad.js'

// Posiciones de los copos: fijas (no aleatorias) para que no cambien entre renders.
const COPOS = Array.from({ length: 26 }, (_, i) => {
  const r = (n) => { const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453; return x - Math.floor(x) }
  return { x: Math.round(r(1) * 100), s: 3 + Math.round(r(2) * 4), d: 9 + Math.round(r(3) * 9), l: -Math.round(r(4) * 18), dx: Math.round((r(5) - 0.5) * 80) }
})

export default function Navidad() {
  const activo = esNavidad()
  useEffect(() => {
    if (!activo) return undefined
    document.documentElement.classList.add('navidad')
    return () => document.documentElement.classList.remove('navidad')
  }, [activo])
  if (!activo) return null
  return (
    <>
      <div className="nv-lights" aria-hidden="true" />
      <div className="nv-snow" aria-hidden="true">
        {COPOS.map((c, i) => (
          <i key={i} style={{ '--x': c.x + '%', '--s': c.s + 'px', '--d': c.d + 's', '--l': c.l + 's', '--dx': c.dx + 'px' }} />
        ))}
      </div>
    </>
  )
}
