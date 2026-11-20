const FEEDS = [
  'https://news.google.com/rss/search?q=%28%22inteligencia+artificial%22+OR+%22IA+generativa%22+OR+%22aprendizaje+autom%C3%A1tico%22+OR+%22ciencia+de+datos%22+OR+rob%C3%B3tica+OR+%22visi%C3%B3n+artificial%22%29+when%3A7d&hl=es-419&gl=AR&ceid=AR%3Aes-419',
  'https://news.google.com/rss/search?q=%28%22generative+AI%22+OR+%22artificial+intelligence%22+OR+%22machine+learning%22+OR+%22data+science%22+OR+robotics+OR+%22computer+vision%22+OR+%22AI+cybersecurity%22%29+when%3A7d&hl=en-US&gl=US&ceid=US%3Aen'
]
const PALETTE = [
  ['#0b57a4', '#2a9d9a'], ['#5b21b6', '#2563eb'],
  ['#0f766e', '#0b57a4'], ['#1d4ed8', '#0891b2'],
  ['#b45309', '#be123c'], ['#0e7490', '#4338ca']
]
const EXCLUDED = /\b(movie|film|steelbook|soundtrack|trailer|actor|actress|cinema|película|peliculas|películas|estreno|reparto)\b/i
const RELEVANT = /(inteligencia artificial|ia generativa|generative ai|artificial intelligence|machine learning|aprendizaje automático|aprendizaje automatico|ciencia de datos|data science|deep learning|computer vision|visión artificial|vision artificial|computer-vision|robotics|robótica|robotica|large language model|\bllm\b|neural network|redes neuronales|ai-powered|ai[- ]driven|ciberseguridad.*ia|ia.*ciberseguridad)/i

function decode(value = '') {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
}
function cleanText(value = '') {
  return decode(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}
function tag(xml, name) {
  const match = xml.match(new RegExp('<' + name + '(?:\\s[^>]*)?>([\\s\\S]*?)<\\/' + name + '>', 'i'))
  return match ? cleanText(match[1]) : ''
}
function parseFeed(xml) {
  return [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].map(([, item]) => {
    const source = item.match(/<source(?:\s[^>]*)?>([\s\S]*?)<\/source>/i)
    const title = tag(item, 'title')
    let description = tag(item, 'description')
    const sourceName = source ? cleanText(source[1]) : ''
    description = description.replace(/\s+/g, ' ').trim()
    if (title && description.toLowerCase().startsWith(title.toLowerCase())) {
      description = description.slice(title.length).replace(/^[\s:–—-]+/, '').trim()
    }
    const date = new Date(tag(item, 'pubDate'))
    const link = tag(item, 'link')
    return { title, link, description, source: sourceName, date }
  }).filter(item => {
    const text = item.title + ' ' + item.description
    return item.title && item.link && !Number.isNaN(item.date.getTime()) &&
      item.date.getTime() <= Date.now() + 86400000 &&
      item.date.getTime() >= Date.now() - 14 * 86400000 &&
      RELEVANT.test(text) && !EXCLUDED.test(item.title)
  })
}
async function resolvePublisherUrl(url) {
  if (!url || !url.includes('news.google.com/')) return url
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; IES6Noticias/1.0)', 'Range': 'bytes=0-1023' },
      signal: AbortSignal.timeout(4500)
    })
    const finalUrl = response.url || url
    if (response.body) await response.body.cancel().catch(() => {})
    return finalUrl && !finalUrl.includes('news.google.com/') ? finalUrl : url
  } catch {
    return url
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Método no permitido' })
  }
  try {
    const results = await Promise.allSettled(FEEDS.map(async url => {
      const response = await fetch(url, {
        headers: { 'User-Agent': 'IES6-NoticiasIA/1.0' },
        signal: AbortSignal.timeout(9000)
      })
      if (!response.ok) throw new Error('Feed no disponible')
      return parseFeed(await response.text())
    }))
    const responses = results.filter(result => result.status === 'fulfilled').map(result => result.value)
    if (!responses.length) throw new Error('Todas las fuentes fallaron')

    const seen = new Set()
    const selected = responses.flat().sort((a, b) => b.date - a.date).filter(item => {
      const key = item.link.split('?')[0]
      if (seen.has(key)) return false
      seen.add(key)
      return true
    }).slice(0, 8)

    const urls = await Promise.all(selected.map(item => resolvePublisherUrl(item.link)))
    const items = selected.map((item, index) => ({
      categoria: 'ACTUALIDAD · INTELIGENCIA ARTIFICIAL',
      titulo: item.title,
      fecha: item.date.toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' }),
      cifra: 'IA',
      cifraTxt: 'noticia reciente',
      colores: PALETTE[index % PALETTE.length],
      texto: item.description || 'Leé la publicación original para conocer todos los detalles.',
      fuente: item.source || 'Medio de comunicación',
      enlace: urls[index]
    }))
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    return res.status(200).json({ noticias: items, actualizado: new Date().toISOString() })
  } catch {
    res.setHeader('Cache-Control', 'no-store')
    return res.status(502).json({ error: 'No se pudieron consultar las fuentes de noticias.' })
  }
}
