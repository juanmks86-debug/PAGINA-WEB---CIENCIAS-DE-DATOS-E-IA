import React, { useState, useEffect } from 'react'
import { eventosProximos } from '../data.js'
import { consultar, supabaseListo } from '../supabase.js'

const aFecha = (s) => { const [y, m, d] = String(s).slice(0, 10).split('-').map(Number); return new Date(y, m - 1, d) }
const hoyMedianoche = () => { const h = new Date(); h.setHours(0, 0, 0, 0); return h }
const larga = (f) => { const t = f.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); return t.charAt(0).toUpperCase() + t.slice(1) }
const corta = (f) => f.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })

const normaliza = (e) => ({
  id: e.id ?? e.titulo + e.fecha,
  titulo: e.titulo,
  fecha: String(e.fecha).slice(0, 10),
  hora: e.hora || '',
  lugar: e.lugar || '',
  desc: e.descripcion ?? e.desc ?? '',
  flyer: e.flyer_url ?? e.flyer ?? '',
  alt: e.alt || e.titulo,
  enlace: e.enlace || '',
})

// Devuelve null mientras carga. Si Supabase no está configurado o falla, usa los datos locales de data.js.
export function useEventos() {
  const [eventos, setEventos] = useState(null)
  useEffect(() => {
    let vivo = true
    const local = () => eventosProximos.map(normaliza)
    if (!supabaseListo) { setEventos(local()); return undefined }
    consultar('eventos', 'select=*&publicado=eq.true&order=fecha.asc')
      .then((rows) => vivo && setEventos(rows.map(normaliza)))
      .catch(() => vivo && setEventos(local()))
    return () => { vivo = false }
  }, [])
  return eventos
}

function useFotos() {
  const [fotos, setFotos] = useState(null)
  useEffect(() => {
    let vivo = true
    if (!supabaseListo) { setFotos([]); return undefined }
    consultar('galeria', 'select=*&publicado=eq.true&order=orden.asc,created_at.desc')
      .then((rows) => vivo && setFotos(rows))
      .catch(() => vivo && setFotos([]))
    return () => { vivo = false }
  }, [])
  return fotos
}

export function EventosTeaser() {
  const eventos = useEventos()
  const hoy = hoyMedianoche()
  const prox = (eventos || []).map((e) => ({ ...e, f: aFecha(e.fecha) })).filter((e) => e.f >= hoy).sort((a, b) => a.f - b.f)[0]
  return (
    <div className="et">
      {prox ? (
        <>
          <span className="ev-badge">Próximo evento</span>
          <h4>{prox.titulo}</h4>
          <p>{larga(prox.f)}{prox.hora ? ' · ' + prox.hora : ''}</p>
        </>
      ) : (
        <>
          <h4>Eventos, calendario y fotos</h4>
          <p>Mirá el calendario académico, los eventos de la carrera y las fotos de los lugares donde participaron los alumnos.</p>
        </>
      )}
      <a className="btn" href="/eventos">Ver todos los eventos</a>
    </div>
  )
}

const PASO = 12

export default function EventosView({ ui }) {
  const { Calendar, EvIcon, Lightbox } = ui
  const eventos = useEventos()
  const fotos = useFotos()
  const [flyer, setFlyer] = useState(null)
  const [foto, setFoto] = useState(null)
  const [filtro, setFiltro] = useState('Todas')
  const [cuantas, setCuantas] = useState(PASO)

  useEffect(() => { document.title = 'Eventos · Ciencia de Datos e IA' }, [])

  const hoy = hoyMedianoche()
  const lista = (eventos || []).map((e) => ({ ...e, f: aFecha(e.fecha) }))
  const proximos = lista.filter((e) => e.f >= hoy).sort((a, b) => a.f - b.f)
  const anteriores = lista.filter((e) => e.f < hoy).sort((a, b) => b.f - a.f)

  const lista_fotos = fotos || []
  const nombres = ['Todas', ...new Set(lista_fotos.map((f) => f.evento).filter(Boolean))]
  const visibles = filtro === 'Todas' ? lista_fotos : lista_fotos.filter((f) => f.evento === filtro)

  const verFotos = (nombre) => {
    setFiltro(nombre); setCuantas(PASO)
    const el = document.getElementById('galeria')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="wrap ev-page">
      <div className="ev-page-head">
        <h2>Eventos</h2>
        <p>Próximas actividades, calendario académico y fotos de los lugares donde participaron los alumnos.</p>
      </div>

      <section id="proximos">
        <h3>Próximos eventos</h3>
        {eventos === null ? <p className="ev-vacio">Cargando eventos…</p> : proximos.length ? (
          <div className="events">
            {proximos.map((e) => {
              const dias = Math.round((e.f - hoy) / 86400000)
              const badge = dias === 0 ? '¡Hoy!' : dias === 1 ? '¡Mañana!' : `En ${dias} días`
              return (
                <article className={'ev' + (e.flyer ? '' : ' ev-sin-img')} key={e.id}>
                  {e.flyer && (
                    <button className="ev-img" onClick={() => setFlyer(e)} aria-label={'Ampliar el flyer de ' + e.titulo}>
                      <img src={e.flyer} alt={e.alt} loading="lazy" />
                      <span className="ev-zoom">Tocá para ampliar</span>
                    </button>
                  )}
                  <div className="ev-body">
                    <span className="ev-badge">{badge}</span>
                    <h4>{e.titulo}</h4>
                    {e.desc && <p className="ev-desc">{e.desc}</p>}
                    <ul className="ev-meta">
                      <li><EvIcon n="fecha" /><span>{larga(e.f)}</span></li>
                      {e.hora && <li><EvIcon n="hora" /><span>{e.hora}</span></li>}
                      {e.lugar && <li><EvIcon n="lugar" /><span>{e.lugar}</span></li>}
                    </ul>
                    {e.enlace && <a className="btn" href={e.enlace} target="_blank" rel="noopener noreferrer">Más información</a>}
                  </div>
                </article>
              )
            })}
          </div>
        ) : <p className="ev-vacio">Por ahora no hay eventos próximos. Mirá el calendario y las fotos de los anteriores.</p>}
      </section>

      <div className="two">
        <section id="calendario"><h3>Calendario académico</h3><Calendar /></section>
        <section id="anteriores">
          <h3>Eventos anteriores</h3>
          {anteriores.length ? (
            <ul className="ev-past">
              {anteriores.map((e) => (
                <li key={e.id}>
                  <span className="f">{corta(e.f)}</span>
                  <div>
                    <b>{e.titulo}</b>
                    {e.lugar && <small>{e.lugar}</small>}
                    {lista_fotos.some((f) => f.evento === e.titulo) && (
                      <button className="chip" onClick={() => verFotos(e.titulo)}>Ver fotos</button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : <p className="ev-vacio">Todavía no hay eventos anteriores cargados.</p>}
        </section>
      </div>

      <section id="galeria">
        <h3>Galería</h3>
        {fotos === null ? <p className="ev-vacio">Cargando fotos…</p> : !lista_fotos.length ? (
          <p className="ev-vacio">Todavía no hay fotos cargadas. Pronto vas a ver acá las actividades de los alumnos.</p>
        ) : (
          <>
            <div className="chip-row" role="group" aria-label="Filtrar fotos por evento">
              {nombres.map((n) => (
                <button key={n} className={'chip' + (filtro === n ? ' on' : '')} aria-pressed={filtro === n} onClick={() => { setFiltro(n); setCuantas(PASO) }}>{n}</button>
              ))}
            </div>
            <div className="gal">
              {visibles.slice(0, cuantas).map((f) => (
                <figure key={f.id}>
                  <button className="gal-item" onClick={() => setFoto(f)} aria-label={'Ampliar foto: ' + (f.titulo || f.evento || 'galería')}>
                    <img src={f.foto_url} alt={f.titulo || f.evento || 'Foto de la galería'} loading="lazy" />
                  </button>
                  {(f.titulo || f.evento) && <figcaption>{f.titulo || f.evento}</figcaption>}
                </figure>
              ))}
            </div>
            {visibles.length > cuantas && <button className="btn gal-more" onClick={() => setCuantas(cuantas + PASO)}>Ver más fotos</button>}
          </>
        )}
      </section>

      {flyer && <Lightbox src={flyer.flyer} alt={flyer.alt} onClose={() => setFlyer(null)} />}
      {foto && <Lightbox src={foto.foto_url} alt={foto.titulo || foto.evento || 'Foto de la galería'} onClose={() => setFoto(null)} />}
    </div>
  )
}
