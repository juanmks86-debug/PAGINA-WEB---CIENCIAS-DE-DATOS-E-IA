import React, { useEffect, useState } from 'react'

const CONSENT_KEY = 'ies6-analytics-consent-v1'
const GA_ID = 'G-QCRKTLKXQ2'

function iniciarAnalitica() {
  if (typeof window === 'undefined' || document.getElementById('ies6-google-analytics')) return
  window.dataLayer = window.dataLayer || []
  window.gtag = function () { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
  const script = document.createElement('script')
  script.id = 'ies6-google-analytics'
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID
  document.head.appendChild(script)
}

export default function CookieConsent() {
  const [decision, setDecision] = useState(() => {
    try { return localStorage.getItem(CONSENT_KEY) } catch { return null }
  })
  const [details, setDetails] = useState(false)

  useEffect(() => {
    if (decision === 'accepted') iniciarAnalitica()
  }, [decision])

  const guardarDecision = (value) => {
    try { localStorage.setItem(CONSENT_KEY, value) } catch { /* elección válida durante esta visita */ }
    if (value === 'accepted') iniciarAnalitica()
    else if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied' })
    setDecision(value)
    setDetails(false)
  }

  return (
    <>
      {decision !== null && (
        <button type="button" className="privacy-settings"
          onClick={() => { setDecision(null); setDetails(false) }}
          aria-label="Revisar preferencias de privacidad">
          <span aria-hidden="true">◈</span> Privacidad
        </button>
      )}
      {decision === null && (
        <div className="privacy-backdrop" role="presentation">
          <section className="privacy-banner" role="dialog" aria-modal="true" aria-labelledby="privacy-title">
            <div className="privacy-heading">
              <span className="privacy-symbol" aria-hidden="true">◈</span>
              <div>
                <p className="privacy-eyebrow">INFORMACIÓN PARA VISITANTES</p>
                <h2 id="privacy-title">Privacidad y cookies</h2>
              </div>
            </div>
            <p>
              Este sitio forma parte de un proyecto académico de la materia <strong>Analítica Web</strong>.
              Utilizamos Google Analytics para medir cómo se navega la página y evaluar su funcionamiento.
            </p>
            <p>
              Si aceptás, se activarán las cookies y tecnologías de análisis de Google. La información se
              utilizará con fines educativos durante la evaluación del proyecto.
            </p>
            {details && (
              <div className="privacy-details">
                <strong>¿Qué información puede recopilarse?</strong>
                <p>
                  Datos de interacción y navegación, páginas visitadas, duración de la visita,
                  información del dispositivo y datos técnicos asociados a la conexión. Google puede
                  tratar identificadores en línea conforme a sus propias políticas.
                </p>
                <p>
                  Podés rechazar la analítica sin perder acceso a ninguna sección del sitio.
                  Tu elección se guarda en este navegador y podés revisarla desde el acceso «Privacidad».
                </p>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                  Política de privacidad de Google ↗
                </a>
              </div>
            )}
            <div className="privacy-actions">
              <button type="button" className="privacy-reject" onClick={() => guardarDecision('rejected')}>Rechazar analítica</button>
              <button type="button" className="privacy-more" onClick={() => setDetails(!details)}>
                {details ? 'Ocultar detalles' : 'Más información'}
              </button>
              <button type="button" className="privacy-accept" onClick={() => guardarDecision('accepted')}>Aceptar analítica</button>
            </div>
            <p className="privacy-footnote">La analítica es opcional. El sitio funciona aunque la rechaces.</p>
          </section>
        </div>
      )}
    </>
  )
}
