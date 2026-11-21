import React, { useState, useEffect, useRef } from 'react'
import { eventosProximos } from '../data.js'
import { consultar, supabaseListo } from '../supabase.js'

const aFecha = (s) => { const [y, m, d] = String(s).slice(0, 10).split('-').map(Number); return new Date(y, m - 1, d) }
const hoyMedianoche = () => { const h = new Date(); h.setHours(0, 0, 0, 0); return h }
const larga = (f) => { const t = f.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); return t.charAt(0).toUpperCase() + t.slice(1) }
const corta = (f) => f.toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' })
const media = (f) => f.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })
const nFotos = (n) => `${n} ${n === 1 ? 'foto' : 'fotos'}`

const fechaCompacta = (fecha, hora = '') => {
  const [y, m, d] = String(fecha).slice(0, 10).split('-')
  const hhmm = String(hora).match(/(\d{1,2}):(\d{2})/)
  const inicio = `${y}${m}${d}${hhmm ? 'T' + hhmm[1].padStart(2, '0') + hhmm[2] + '00' : ''}`
  if (!hhmm) {
    const siguiente = new Date(Number(y), Number(m) - 1, Number(d) + 1)
    const fin = [siguiente.getFullYear(), String(siguiente.getMonth() + 1).padStart(2, '0'), String(siguiente.getDate()).padStart(2, '0')].join('')
    return { inicio, fin, todoElDia: true }
  }
  const finDate = new Date(Number(y), Number(m) - 1, Number(d), Number(hhmm[1]), Number(hhmm[2]) + 60)
  const fin = [finDate.getFullYear(), String(finDate.getMonth() + 1).padStart(2, '0'), String(finDate.getDate()).padStart(2, '0')].join('') + 'T' + String(finDate.getHours()).padStart(2, '0') + String(finDate.getMinutes()).padStart(2, '0') + '00'
  return { inicio, fin, todoElDia: false }
}
const enlaceWhatsApp = (e) => {
  const mensaje = [e.titulo, larga(aFecha(e.fecha)), e.hora && 'Horario: ' + e.hora, e.lugar && 'Lugar: ' + e.lugar, e.desc, e.enlace].filter(Boolean).join('\n')
  return 'https://wa.me/?text=' + encodeURIComponent(mensaje)
}
const enlaceCalendar = (e) => {
  const fechas = fechaCompacta(e.fecha, e.hora)
  const params = new URLSearchParams({ action: 'TEMPLATE', text: e.titulo, dates: fechas.inicio + '/' + fechas.fin, details: [e.desc, e.enlace].filter(Boolean).join('\n'), location: e.lugar || '' })
  return 'https://calendar.google.com/calendar/render?' + params.toString()
}
const descargarICS = (e) => {
  const fechas = fechaCompacta(e.fecha, e.hora)
  const escapar = (v) => String(v || '').replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n')
  const lineaFecha = fechas.todoElDia
    ? `DTSTART;VALUE=DATE:${fechas.inicio}\nDTEND;VALUE=DATE:${fechas.inicio}\n`
    : `DTSTART:${fechas.inicio}\nDTEND:${fechas.fin}\n`
  const contenido = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//IES N6//Eventos//ES', 'BEGIN:VEVENT', lineaFecha.trim(), `SUMMARY:${escapar(e.titulo)}`, `LOCATION:${escapar(e.lugar)}`, `DESCRIPTION:${escapar([e.desc, e.enlace].filter(Boolean).join('\n'))}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n')
  const blob = new Blob([contenido], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = (String(e.titulo || 'evento').toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'evento') + '.ics'
  document.body.appendChild(a); a.click(); a.remove()
  URL.revokeObjectURL(url)
}
const COLORES = { eventos: '#6d3fd1', visitas: '#15803d', talleres: '#1d6fd6', proyectos: '#c2570c', 'vida estudiantil': '#c2185b' }
const colorDe = (c) => COLORES[String(c || '').toLowerCase()] || '#2f6f7e'

const Ico = ({ children }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
const IcCal = () => <Ico><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></Ico>
const IcImg = () => <Ico><rect x="3.5" y="4.5" width="17" height="15" rx="2.5" /><circle cx="9" cy="10" r="1.6" /><path d="m4 18 5-5 3.5 3.5L15 14l5 5" /></Ico>
const IcPin = () => <Ico><path d="M12 21s6-5.6 6-10.5a6 6 0 1 0-12 0C6 15.4 12 21 12 21Z" /><circle cx="12" cy="10.5" r="2.2" /></Ico>
const IcClock = () => <Ico><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></Ico>
const IcChev = () => <Ico><path d="m9 5 7 7-7 7" /></Ico>

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
  albumId: e.album_id || null,
})

const normalizaAlbum = (r) => ({
  id: r.id,
  titulo: r.titulo,
  categoria: r.categoria || 'Eventos',
  fecha: r.fecha ? String(r.fecha).slice(0, 10) : '',
  desc: r.descripcion || '',
  portada: r.portada_url || '',
  fotos: r.galeria && r.galeria[0] ? r.galeria[0].count : 0,
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

function useAlbumes() {
  const [albumes, setAlbumes] = useState(null)
  useEffect(() => {
    let vivo = true
    if (!supabaseListo) { setAlbumes([]); return undefined }
    consultar('albumes', 'select=*,galeria(count)&publicado=eq.true&order=fecha.desc.nullslast,created_at.desc')
      .then((rows) => vivo && setAlbumes(rows.map(normalizaAlbum)))
      .catch(() => vivo && setAlbumes([]))
    return () => { vivo = false }
  }, [])
  return albumes
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
  const { Calendar, Lightbox } = ui
  const eventos = useEventos()
  const albumes = useAlbumes()
  const [flyer, setFlyer] = useState(null)
  const [foto, setFoto] = useState(null)
  const [filtro, setFiltro] = useState('Todas')
  const [album, setAlbum] = useState(null)
  const [fotosAlbum, setFotosAlbum] = useState(null)
  const [cuantas, setCuantas] = useState(PASO)
  const [accionInfo, setAccionInfo] = useState(null)
  const albumRequestRef = useRef(0)
  const albumTriggerRef = useRef(null)
  const albumBackRef = useRef(null)

  useEffect(() => { document.title = 'Eventos · Ciencia de Datos e IA' }, [])
  useEffect(() => () => { albumRequestRef.current += 1 }, [])
  // Esperar a que los datos dinámicos estén listos antes de resolver el ancla.
  // Así /eventos#galeria y /eventos#calendario no quedan desplazados por el contenido que llega después.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id || eventos === null || albumes === null) return undefined
    let frame1 = 0
    let frame2 = 0
    frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (!el) return
        const reducir = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        el.scrollIntoView({ behavior: reducir ? 'auto' : 'smooth', block: 'start' })
      })
    })
    return () => {
      if (frame1) cancelAnimationFrame(frame1)
      if (frame2) cancelAnimationFrame(frame2)
    }
  }, [eventos, albumes])

  const abrirAlbum = (a, bajar) => {
    albumTriggerRef.current = document.activeElement
    const solicitud = ++albumRequestRef.current
    setAlbum(a); setFotosAlbum(null); setCuantas(PASO)
    requestAnimationFrame(() => albumBackRef.current?.focus())
    consultar('galeria', `select=*&publicado=eq.true&album_id=eq.${encodeURIComponent(a.id)}&order=orden.asc,created_at.asc`)
      .then((rows) => { if (albumRequestRef.current === solicitud) setFotosAlbum(rows) })
      .catch(() => { if (albumRequestRef.current === solicitud) setFotosAlbum([]) })
    if (bajar) requestAnimationFrame(() => {
      const el = document.getElementById('galeria')
      if (!el) return
      const reducir = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ behavior: reducir ? 'auto' : 'smooth' })
    })
  }
  const volverGaleria = () => {
    albumRequestRef.current += 1
    setAlbum(null)
    setFotosAlbum(null)
    requestAnimationFrame(() => albumTriggerRef.current?.isConnected && albumTriggerRef.current.focus())
  }

  const hoy = hoyMedianoche()
  const lista = (eventos || []).map((e) => ({ ...e, f: aFecha(e.fecha) }))
  const extra = {}
  lista.forEach((e) => { const t = e.titulo.length > 48 ? e.titulo.slice(0, 47) + '…' : e.titulo; extra[e.fecha] = extra[e.fecha] ? extra[e.fecha] + ' / ' + t : t })
  const proximos = lista.filter((e) => e.f >= hoy).sort((a, b) => a.f - b.f)
  const anteriores = lista.filter((e) => e.f < hoy).sort((a, b) => b.f - a.f)

  const albs = albumes || []
  const cats = ['Todas', ...new Set(albs.map((a) => a.categoria))]
  const visibles = filtro === 'Todas' ? albs : albs.filter((a) => a.categoria === filtro)

  const tarjeta = (e, esProximo) => {
    const al = albs.find((a) => a.id === e.albumId)
    const portada = e.flyer || (al && al.portada) || ''
    const dias = Math.round((e.f - hoy) / 86400000)
    const badge = dias === 0 ? '¡Hoy!' : dias === 1 ? '¡Mañana!' : `En ${dias} días`
    return (
      <article className={'evc' + (portada ? '' : ' sin-img')} key={e.id}>
        {portada && (
          <button type="button" className="evc-img" onClick={() => setFlyer({ src: portada, alt: e.alt })} aria-label={'Ampliar la imagen de ' + e.titulo}>
            <img src={portada} alt={e.alt} loading="lazy" decoding="async"
              onError={(event) => {
                const button = event.currentTarget.closest('.evc-img')
                const card = button?.closest('.evc')
                if (button) button.remove()
                card?.classList.add('sin-img')
              }} />
          </button>
        )}
        <div className="evc-body">
          <div className="evc-top">
            <span className="pill"><IcCal />Actividad institucional</span>
            {esProximo && <span className="ev-badge">{badge}</span>}
          </div>
          <h4>{e.titulo}</h4>
          <div className="evc-meta">
            <span className="evc-date"><IcCal />{corta(e.f)}</span>
            {e.hora && <span><IcClock />{e.hora}</span>}
            {al && <span><IcImg />{nFotos(al.fotos)}</span>}
            {e.lugar && <span><IcPin />{e.lugar}</span>}
          </div>
          {e.desc && <p>{e.desc}</p>}
          <div className="evc-actions evc-icon-actions" aria-label="Opciones del evento">
            <button type="button" className={`evc-icon-btn evc-icon-whatsapp ${accionInfo?.id === e.id && accionInfo.tipo === 'whatsapp' ? 'is-active' : ''}`} aria-label="Información sobre compartir por WhatsApp" aria-expanded={accionInfo?.id === e.id && accionInfo.tipo === 'whatsapp'} onClick={() => setAccionInfo(accionInfo?.id === e.id && accionInfo.tipo === 'whatsapp' ? null : { id: e.id, tipo: 'whatsapp' })}><Ico><path d="M20.2 11.7a8.2 8.2 0 0 1-12.1 7.1L3 20l1.3-4.8a8.2 8.2 0 1 1 15.9-3.5Z"/><path d="M8.5 8.2c.4 2.5 2.1 4.3 4.8 5.4l1.4-1.2 2 1c-.1 1.2-.9 2-2.1 2-3.7-.3-7.2-3.8-7.4-7.3 0-1.1.8-1.9 1.9-2l1 2-1.6 1.1"/></Ico></button>
            <button type="button" className={`evc-icon-btn evc-icon-calendar ${accionInfo?.id === e.id && accionInfo.tipo === 'calendar' ? 'is-active' : ''}`} aria-label="Información sobre guardar en Google Calendar" aria-expanded={accionInfo?.id === e.id && accionInfo.tipo === 'calendar'} onClick={() => setAccionInfo(accionInfo?.id === e.id && accionInfo.tipo === 'calendar' ? null : { id: e.id, tipo: 'calendar' })}><IcCal /></button>
            <button type="button" className={`evc-icon-btn evc-icon-download ${accionInfo?.id === e.id && accionInfo.tipo === 'download' ? 'is-active' : ''}`} aria-label="Información sobre descargar el evento" aria-expanded={accionInfo?.id === e.id && accionInfo.tipo === 'download'} onClick={() => setAccionInfo(accionInfo?.id === e.id && accionInfo.tipo === 'download' ? null : { id: e.id, tipo: 'download' })}><Ico><path d="M12 3v12m-5-5 5 5 5-5"/><path d="M5 17v3h14v-3"/></Ico></button>
          </div>
          {accionInfo?.id === e.id && <div className="evc-action-info" role="region" aria-live="polite">
            <div className="evc-action-info-copy">
              <strong>{accionInfo.tipo === 'whatsapp' ? 'Compartir por WhatsApp' : accionInfo.tipo === 'calendar' ? 'Guardar en Google Calendar' : 'Descargar evento (.ics)'}</strong>
              <p>{accionInfo.tipo === 'whatsapp' ? 'Envía la invitación con la fecha, el horario, el lugar y los detalles para compartirla con otras personas.' : accionInfo.tipo === 'calendar' ? 'Abre Google Calendar con los datos del evento para que puedas guardarlo en tu calendario y configurar recordatorios.' : 'Descarga un archivo compatible con calendarios de celulares y computadoras, como Apple Calendar y Outlook.'}</p>
            </div>
            {accionInfo.tipo === 'whatsapp' && <a className="evc-info-action" href={enlaceWhatsApp(e)} target="_blank" rel="noopener noreferrer">Abrir WhatsApp</a>}
            {accionInfo.tipo === 'calendar' && <a className="evc-info-action" href={enlaceCalendar(e)} target="_blank" rel="noopener noreferrer">Continuar a Calendar</a>}
            {accionInfo.tipo === 'download' && <button type="button" className="evc-info-action" onClick={() => descargarICS(e)}>Descargar archivo</button>}
          </div>}
          <div className="evc-extra-actions">
            {e.enlace && <a className="evc-go" href={e.enlace} target="_blank" rel="noopener noreferrer">Más información <IcChev /></a>}
            {al && <button type="button" className="evc-go" onClick={() => abrirAlbum(al, true)}>Ver álbum <IcChev /></button>}
          </div>
        </div>
      </article>
    )
  }

  return (
    <div className="wrap ev-page">
      <div className="ev-page-head">
        <h2>Eventos</h2>
        <p>Próximas actividades, calendario académico y fotos de los lugares donde participaron los alumnos.</p>
      </div>

      <div className="ev-layout">
        <div>
          <section id="proximos">
            <h3>Próximos eventos</h3>
            {eventos === null ? <p className="ev-vacio" role="status">Cargando eventos…</p> : proximos.length
              ? proximos.map((e) => tarjeta(e, true))
              : <p className="ev-vacio">Por ahora no hay eventos próximos. Mirá el calendario y las fotos de los anteriores.</p>}
          </section>
          <section id="anteriores">
            <h3>Eventos anteriores</h3>
            {eventos === null ? <p className="ev-vacio">Cargando eventos…</p> : anteriores.length
              ? anteriores.map((e) => tarjeta(e, false))
              : <p className="ev-vacio">Todavía no hay eventos anteriores cargados.</p>}
          </section>
        </div>
        <aside>
          <section id="calendario"><h3>Calendario académico</h3><Calendar extra={extra} /></section>
        </aside>
      </div>

      <section id="galeria">
        <h3>Galería institucional</h3>
        <p className="gal-sub">Momentos, aprendizajes y experiencias de la carrera</p>
        {albumes === null ? <p className="ev-vacio" role="status">Cargando galería…</p> : album ? (
          <div className="album-view" aria-busy={fotosAlbum === null}>
            <div className="alb-open-head">
              <button ref={albumBackRef} type="button" className="chip" onClick={volverGaleria}>← Volver a la galería</button>
              <div>
                <h4>{album.titulo}</h4>
                <p>{album.fecha ? media(aFecha(album.fecha)) + ' · ' : ''}{nFotos(album.fotos)}</p>
              </div>
            </div>
            {album.desc && <p className="gal-sub">{album.desc}</p>}
            {fotosAlbum === null ? <p className="ev-vacio" role="status">Cargando fotos…</p> : !fotosAlbum.length ? (
              <p className="ev-vacio">Este álbum todavía no tiene fotos cargadas.</p>
            ) : (
              <>
                <div className="gal">
                  {fotosAlbum.slice(0, cuantas).map((f) => (
                    <figure key={f.id}>
                      <button type="button" className="gal-item" onClick={() => setFoto(f)} aria-label={'Ampliar foto: ' + (f.titulo || album.titulo)}>
                        <img src={f.foto_url} alt={f.titulo || album.titulo} loading="lazy" decoding="async"
                          onError={(event) => {
                            const button = event.currentTarget.closest('.gal-item')
                            event.currentTarget.remove()
                            if (button) {
                              button.classList.add('is-broken')
                              button.disabled = true
                              button.setAttribute('aria-label', 'Fotografía no disponible')
                            }
                          }} />
                      </button>
                      {f.titulo && <figcaption>{f.titulo}</figcaption>}
                    </figure>
                  ))}
                </div>
                {fotosAlbum.length > cuantas && <button type="button" className="btn gal-more" onClick={() => setCuantas(cuantas + PASO)}>Ver más fotos</button>}
              </>
            )}
          </div>
        ) : !albs.length ? (
          <p className="ev-vacio">Todavía no hay álbumes cargados. Pronto vas a ver acá las actividades de los alumnos.</p>
        ) : (
          <>
            <div className="chip-row" role="group" aria-label="Filtrar álbumes por categoría">
              {cats.map((c) => (
                <button type="button" key={c} className={'chip' + (filtro === c ? ' on' : '')} aria-pressed={filtro === c} onClick={() => setFiltro(c)}>{c}</button>
              ))}
            </div>
            <div className="albs">
              {visibles.map((a) => (
                <button type="button" key={a.id} className="alb" onClick={() => abrirAlbum(a, false)} aria-label={`Ver álbum ${a.titulo}, ${nFotos(a.fotos)}`}>
                  {a.portada && <img src={a.portada} alt="" loading="lazy" decoding="async"
                    onError={(event) => {
                      const card = event.currentTarget.closest('.alb')
                      event.currentTarget.remove()
                      card?.classList.add('sin-portada')
                    }} />}
                  <span className="alb-tag" style={{ background: colorDe(a.categoria) }}>{a.categoria}</span>
                  <span className="alb-info">
                    <b>{a.titulo}</b>
                    <span className="alb-meta">
                      {a.fecha && <span><IcCal />{media(aFecha(a.fecha))}</span>}
                      <span><IcImg />{nFotos(a.fotos)}</span>
                      <span className="alb-go">Ver álbum →</span>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </section>

      {flyer && <Lightbox src={flyer.src} alt={flyer.alt} onClose={() => setFlyer(null)} />}
      {foto && <Lightbox src={foto.foto_url} alt={foto.titulo || (album && album.titulo) || 'Foto de la galería'} onClose={() => setFoto(null)} />}
    </div>
  )
}
