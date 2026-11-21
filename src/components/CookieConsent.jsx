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
                <div className="privacy-detail-section">
                  <strong>1. ¿Qué información se recopila?</strong>
                  <p>
                    Si aceptás la analítica, Google Analytics puede recopilar páginas visitadas,
                    interacciones, duración de la visita, tipo de dispositivo, navegador, idioma,
                    datos técnicos de conexión y una ubicación aproximada. También puede utilizar
                    cookies e identificadores en línea.
                  </p>
                </div>
                <div className="privacy-detail-section">
                  <strong>2. ¿Para qué se utiliza?</strong>
                  <p>
                    Los datos se utilizan con fines exclusivamente académicos para conocer el uso
                    de las secciones, evaluar la navegación y realizar el trabajo práctico de
                    Analítica Web. No se solicitan datos personales para aceptar la medición.
                  </p>
                </div>
                <div className="privacy-detail-section">
                  <strong>3. Cookies y elección</strong>
                  <p>
                    La analítica es opcional. Si la rechazás, Google Analytics no se activa desde
                    este aviso y podés seguir utilizando el sitio. La decisión se guarda en este
                    navegador; podés cambiarla en cualquier momento desde el acceso «Privacidad».
                  </p>
                </div>
                <div className="privacy-detail-section">
                  <strong>4. Servicios externos</strong>
                  <p>
                    El sitio utiliza Google Analytics para medición y Supabase para alojar
                    determinados contenidos e imágenes. Algunas secciones pueden ofrecer enlaces
                    o funciones de terceros, como Google Drive, WhatsApp o el asistente virtual.
                    Al abrir esos servicios o interactuar con ellos, se aplican sus propias
                    políticas de privacidad y cookies.
                  </p>
                </div>
                <div className="privacy-detail-section">
                  <strong>5. Conservación de la información</strong>
                  <p>
                    Este sitio es una demostración temporal con fines educativos. Los datos de
                    analítica se conservarán durante el desarrollo y la evaluación de la actividad
                    académica; al finalizar y aprobarse la materia, se prevé eliminar los datos
                    recopilados y cerrar o eliminar la propiedad de medición utilizada para esta
                    práctica.
                  </p>
                </div>
                <div className="privacy-detail-section">
                  <strong>6. Consultas y derechos</strong>
                  <p>
                    Podés rechazar o retirar tu consentimiento desde este mismo sitio. Para
                    consultas sobre el uso de la información, utilizá los canales de contacto
                    institucional publicados en la sección Contacto.
                  </p>
                </div>
                <div className="privacy-detail-links">
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                    Privacidad de Google ↗
                  </a>
                  <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">
                    Privacidad de Supabase ↗
                  </a>
                </div>
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
