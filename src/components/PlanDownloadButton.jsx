import React, { useEffect, useState } from 'react'
import './PlanDownloadButton.css'

// From Uiverse.io by nazar-gavrylyk - https://uiverse.io/nazar-gavrylyk/evil-dragon-24
// MIT License, Copyright (c) nazar-gavrylyk (Nazar)
// Adapted for the IES N.º 6 plan de estudio download action.

const FILE_URL = '/plan-de-estudio.pdf'
const FILE_NAME = 'plan-de-estudio.pdf'

export default function PlanDownloadButton() {
  const [status, setStatus] = useState('idle')
  const [fileUrl, setFileUrl] = useState('')

  useEffect(() => () => {
    if (fileUrl) URL.revokeObjectURL(fileUrl)
  }, [fileUrl])

  const handleDownload = async () => {
    if (status === 'downloading') return
    setStatus('downloading')

    try {
      const response = await fetch(FILE_URL)
      if (!response.ok) throw new Error('No se pudo obtener el PDF')

      const blob = await response.blob()
      const objectUrl = URL.createObjectURL(blob)
      setFileUrl(objectUrl)

      const link = document.createElement('a')
      link.href = objectUrl
      link.download = FILE_NAME
      document.body.appendChild(link)
      link.click()
      link.remove()

      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <a className="plan-download-control is-done" href={fileUrl} target="_blank" rel="noopener noreferrer">
        <span className="plan-download-control__circle" aria-hidden="true">
          <svg className="plan-download-control__icon" viewBox="0 0 24 24" fill="none">
            <path d="m5 12 4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="plan-download-control__text">Open</span>
      </a>
    )
  }

  return (
    <button
      className={`plan-download-control${status === 'downloading' ? ' is-downloading' : ''}`}
      type="button"
      onClick={handleDownload}
      disabled={status === 'downloading'}
      aria-label={status === 'downloading' ? 'Descargando el plan de estudio' : 'Descargar plan de estudio en PDF'}
      aria-live="polite"
    >
      <span className="plan-download-control__circle" aria-hidden="true">
        <svg className="plan-download-control__icon" viewBox="0 0 24 24" fill="none">
          <path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M5 20h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="plan-download-control__text">{status === 'downloading' ? 'Downloading' : status === 'error' ? 'Retry' : 'Download'}</span>
      <span className="plan-download-control__progress" aria-hidden="true" />
    </button>
  )
}
