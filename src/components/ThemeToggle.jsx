// From Uiverse.io by Galahhad - https://uiverse.io/Galahhad/silent-robin-40
// MIT License, Copyright (c) Galahhad (Galahad)
import React from 'react'
import './ThemeToggle.css'

export default function ThemeToggle({ theme, onChange }) {
  const isDark = theme === 'dark'

  return (
    <label className="bb8-theme-toggle" title={isDark ? 'Modo claro' : 'Modo oscuro'}>
      <input
        className="bb8-theme-toggle__checkbox"
        type="checkbox"
        role="switch"
        checked={isDark}
        onChange={(event) => onChange(event.target.checked ? 'dark' : 'light')}
        aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      />
      <div className="bb8-theme-toggle__container">
        <div className="bb8-theme-toggle__scenery" aria-hidden="true">
          {Array.from({ length: 7 }, (_, index) => <div className="bb8-theme-toggle__star" key={index} />)}
          <div className="bb8-theme-tatto-1" />
          <div className="bb8-theme-tatto-2" />
          <div className="bb8-theme-gomrassen" />
          <div className="bb8-theme-hermes" />
          <div className="bb8-theme-chenini" />
          {Array.from({ length: 3 }, (_, index) => <div className="bb8-theme-toggle__cloud" key={index} />)}
        </div>
        <div className="bb8-theme-droid" aria-hidden="true">
          <div className="bb8-theme-droid__head-container">
            <div className="bb8-theme-droid__antenna" />
            <div className="bb8-theme-droid__antenna" />
            <div className="bb8-theme-droid__head" />
          </div>
          <div className="bb8-theme-droid__body" />
        </div>
        <div className="bb8-theme-hidden" aria-hidden="true">
          <div className="bb8-theme-droid__shadow" />
        </div>
      </div>
    </label>
  )
}
