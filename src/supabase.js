// Conexión liviana a Supabase (API REST). No necesita instalar paquetes.
// Variables a cargar en Vercel y en un archivo .env local (ver .env.example):
//   VITE_SUPABASE_URL      → Project Settings › API › Project URL
//   VITE_SUPABASE_ANON_KEY → Project Settings › API › clave "anon" / "publishable" (nunca la service_role)
const BASE = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/+$/, '')
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabaseListo = Boolean(BASE && KEY)

export async function consultar(tabla, query = 'select=*') {
  if (!supabaseListo) throw new Error('Supabase no está configurado')
  const res = await fetch(`${BASE}/rest/v1/${tabla}?${query}`, { headers: { apikey: KEY } })
  if (!res.ok) throw new Error(`Supabase respondió ${res.status}`)
  return res.json()
}
