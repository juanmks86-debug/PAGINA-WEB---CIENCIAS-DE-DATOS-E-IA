const FEEDS = [
  'https://news.google.com/rss/search?q=%28%22inteligencia+artificial%22+OR+%22IA+generativa%22+OR+%22machine+learning%22%29+when%3A7d&hl=es-419&gl=AR&ceid=AR%3Aes-419',
  'https://news.google.com/rss/search?q=%28artificial+intelligence+OR+generative+AI%29+when%3A7d&hl=en-US&gl=US&ceid=US%3Aen'
]
const PALETTE = [
  ['#0b57a4', '#2a9d9a'], ['#5b21b6', '#2563eb'],
  ['#0f766e', '#0b57a4'], ['#1d4ed8', '#0891b2'],
  ['#b45309', '#be123c'], ['#0e7490', '#4338ca']
]

function decode(value = '') {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
}
function tag(xml, name) {
  const match = xml.match(new RegExp('<' + name + '(?:\\s[^>]*)?>([\\s\\S]*?)<\\/' + name + '>', 'i'))
  return match ? decode(match[1]).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : ''
}
function parseFeed(xml) {
  return [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].map(([, item]) => {
    const source = item.match(/<source(?:\s[^>]*)?>([\s\S]*?)<\/source>/i)
    const link = tag(item, 'link')
    const title = tag(item, 'title')
    const description = tag(item, 'description')
    const date = new Date(tag(item, 'pubDate'))
    return { title, link, description, source: source ? decode(source[1]).replace(/<[^>]*>/g, '').trim() : '', date }
  }).filter(item => item.title && item.link && !Number.isNaN(item.date.getTime()) &&
    item.date.getTime() <= Date.now() + 86400000 && item.date.getTime() >= Date.now() - 14 * 86400000)
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Método no permitido' })
  }
  try {
    const responses = await Promise.all(FEEDS.map(async url => {
      const response = await fetch(url, { headers: { 'User-Agent': 'IES6-NoticiasIA/1.0' }, signal: AbortSignal.timeout(9000) })
      if (!response.ok) throw new Error('Feed no disponible')
      return parseFeed(await response.text())
    }))
    const seen = new Set()
    const items = responses.flat().sort((a, b) => b.date - a.date).filter(item => {
      const key = item.link.split('?')[0]
      if (seen.has(key)) return false
      seen.add(key)
      return true
    }).slice(0, 8).map((item, index) => ({
      categoria: 'ACTUALIDAD · INTELIGENCIA ARTIFICIAL',
      titulo: item.title,
      fecha: item.date.toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' }),
      cifra: 'IA',
      cifraTxt: 'noticia reciente',
      colores: PALETTE[index % PALETTE.length],
      texto: item.description || 'Leé la publicación original para conocer todos los detalles.',
      fuente: item.source || 'Google News · fuente original',
      enlace: item.link
    }))
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    return res.status(200).json({ noticias: items, actualizado: new Date().toISOString() })
  } catch {
    res.setHeader('Cache-Control', 'no-store')
    return res.status(502).json({ error: 'No se pudieron consultar las fuentes de noticias.' })
  }
}
