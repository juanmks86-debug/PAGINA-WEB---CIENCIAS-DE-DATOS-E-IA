// El tema navideño se activa solo durante diciembre de cada año (según la fecha del visitante).
// Para probarlo fuera de diciembre: abrí cualquier página con ?navidad=1 (queda activo mientras dure la pestaña).
// Para apagarlo en esa pestaña: ?navidad=0. Para volver al modo automático: ?navidad=auto
const CLAVE = 'navidad-prueba'

export function esNavidad(fecha = new Date()) {
  try {
    const q = new URLSearchParams(window.location.search).get('navidad')
    if (q === '1' || q === '0') sessionStorage.setItem(CLAVE, q)
    else if (q === 'auto') sessionStorage.removeItem(CLAVE)
    const forzado = sessionStorage.getItem(CLAVE)
    if (forzado === '1') return true
    if (forzado === '0') return false
  } catch (e) { /* sin sessionStorage: se usa solo la fecha */ }
  return fecha.getMonth() === 11
}
