const FEEDS = [
  // Argentina: actualidad, educación, industria y políticas públicas.
  'https://news.google.com/rss/search?q=%28%22inteligencia+artificial%22+OR+%22IA+generativa%22+OR+%22ciencia+de+datos%22+OR+rob%C3%B3tica%29+when%3A7d&hl=es-419&gl=AR&ceid=AR%3Aes-419',
  // Latinoamérica y España: investigación e innovación en español.
  'https://news.google.com/rss/search?q=%28%22inteligencia+artificial%22+OR+%22aprendizaje+autom%C3%A1tico%22+OR+%22visi%C3%B3n+artificial%22+OR+%22procesamiento+del+lenguaje%22%29+when%3A7d&hl=es-419&gl=MX&ceid=MX%3Aes-419',
  // Robótica, ciberseguridad y tecnología aplicada.
  'https://news.google.com/rss/search?q=%28rob%C3%B3tica+OR+robotics+OR+ciberseguridad+OR+%22AI+security%22+OR+%22computer+vision%22%29+when%3A7d&hl=es-419&gl=ES&ceid=ES%3Aes',
  // Cobertura internacional en inglés.
  'https://news.google.com/rss/search?q=%28%22generative+AI%22+OR+%22artificial+intelligence%22+OR+%22machine+learning%22+OR+%22data+science%22+OR+robotics%29+when%3A7d&hl=en-US&gl=US&ceid=US%3Aen',
  // Medios tecnológicos con RSS propio: suelen incluir imágenes y enlaces directos.
  'https://techcrunch.com/category/artificial-intelligence/feed/',
  'https://arstechnica.com/ai/feed/'
]
const PALETTE = [
  ['#0b57a4', '#2a9d9a'], ['#5b21b6', '#2563eb'],
  ['#0f766e', '#0b57a4'], ['#1d4ed8', '#0891b2'],
  ['#b45309', '#be123c'], ['#0e7490', '#4338ca']
]
const EXCLUDED = /\b(movie|film|steelbook|soundtrack|trailer|actor|actress|cinema|película|peliculas|películas|estreno|reparto)\b/i
const LOW_VALUE = /\b(acciones|cotización|ticker|bolsa|stock price|nombra|nombró|nombramiento|director independiente|directora independiente|consejero delegado)\b/i
const RELEVANT = /(inteligencia artificial|ia generativa|generative ai|artificial intelligence|machine learning|aprendizaje automático|aprendizaje automatico|ciencia de datos|data science|deep learning|computer vision|visión artificial|vision artificial|computer-vision|robotics|robótica|robotica|large language model|\bllm\b|neural network|redes neuronales|ai-powered|ai[- ]driven|ciberseguridad.*ia|ia.*ciberseguridad)/i

function categoryFor(item) {
  const value = item.title.toLowerCase()
  if (/ciberseguridad|ciberataque|phishing|malware|ransomware|ai security/.test(value)) return 'CIBERSEGURIDAD · IA'
  if (/robot|robotics|rob[oó]tica|brazo rob[oó]tico|drones?|automatizaci[oó]n/.test(value)) return 'ROBÓTICA · INNOVACIÓN'
  if (/agricultura|agr[ií]cola|cultivos|huertos|orchard/.test(value)) return 'IA · AGRO E INDUSTRIA'
  if (/educaci|universidad|escuela|docente|estudiante|aula/.test(value)) return 'IA · EDUCACIÓN'
  if (/empleo|trabajo|laboral|empresa|industria|comercio/.test(value)) return 'IA · TRABAJO E INDUSTRIA'
  if (/medicina|salud|hospital|diagnóstico|diagnostico|paciente/.test(value)) return 'IA · SALUD'
  if (/datos|data science|machine learning|aprendizaje automático|aprendizaje automatico|estadístic|estadistic/.test(value)) return 'CIENCIA DE DATOS · ML'
  return 'ACTUALIDAD · INTELIGENCIA ARTIFICIAL'
}

function titleTokens(title) {
  const normalized = title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const stop = new Set(['ante', 'para', 'por', 'con', 'del', 'las', 'los', 'una', 'uno', 'como', 'sobre', 'desde', 'entre'])
  return new Set(normalized.split(/[^a-z0-9]+/).filter(word => word.length > 2 && !stop.has(word)))
}

function isNearDuplicate(title, previousTitles) {
  const current = titleTokens(title)
  for (const previous of previousTitles) {
    const other = titleTokens(previous)
    const intersection = [...current].filter(word => other.has(word)).length
    const overlap = intersection / Math.max(1, Math.min(current.size, other.size))
    // El solapamiento sobre el título más corto detecta titulares de la misma noticia
    // aunque cada medio use palabras distintas o agregue su nombre al final.
    if (intersection >= 4 && overlap >= 0.55) return true
  }
  return false
}

function isWeakRoboticsMatch(item) {
  const title = item.title.toLowerCase()
  return /rob[oó]tica|robotics|robots?/.test(title) &&
    titleTokens(item.title).size < 5 &&
    !/inteligencia artificial|artificial intelligence|machine learning|automatizaci[oó]n|robot humanoide|robot industrial|drones? aut[oó]nomos/.test(title)
}

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
function imageFrom(item) {
  const patterns = [
    /<media:content[^>]*\burl=["']([^"']+)["']/i,
    /<media:thumbnail[^>]*\burl=["']([^"']+)["']/i,
    /<enclosure[^>]*\burl=["']([^"']+)["']/i,
    /<img[^>]*\bsrc=["']([^"']+)["']/i
  ]
  for (const pattern of patterns) {
    const match = item.match(pattern)
    if (!match) continue
    const raw = decode(match[1]).trim()
    try {
      const url = new URL(raw.startsWith('//') ? 'https:' + raw : raw)
      if (url.protocol === 'https:') return url.href
    } catch { /* URL de imagen no válida */ }
  }
  return ''
}
function parseFeed(xml) {
  return [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].map(([, item]) => {
    const source = item.match(/<source(?:\s[^>]*)?>([\s\S]*?)<\/source>/i)
    const title = tag(item, 'title')
    const image = imageFrom(item)
    let description = tag(item, 'description')
    const sourceName = source ? cleanText(source[1]) : ''
    description = description.replace(/\s+/g, ' ').trim()
    if (title && description.toLowerCase().startsWith(title.toLowerCase())) {
      description = description.slice(title.length).replace(/^[\s:–—-]+/, '').trim()
    }
    const normalize = value => value.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, ' ').trim()
    const titleWithoutSource = sourceName && title.toLowerCase().endsWith(' - ' + sourceName.toLowerCase())
      ? title.slice(0, -(sourceName.length + 3))
      : title
    const descriptionKey = normalize(description)
    const titleKey = normalize(titleWithoutSource)
    const sourceKey = normalize(sourceName)
    const isOnlyHeadline = !description || description.length < 80 ||
      descriptionKey === sourceKey ||
      descriptionKey === titleKey ||
      descriptionKey === normalize(titleWithoutSource + ' ' + sourceName)
    if (isOnlyHeadline) {
      description = 'Leé la publicación original para conocer todos los detalles.'
    }
    const date = new Date(tag(item, 'pubDate'))
    const link = tag(item, 'link')
    return { title, link, description, image, source: sourceName, date }
  }).filter(item => {
    const text = item.title + ' ' + item.description
    return item.title && item.link && !Number.isNaN(item.date.getTime()) &&
      item.date.getTime() <= Date.now() + 86400000 &&
      item.date.getTime() >= Date.now() - 14 * 86400000 &&
      RELEVANT.test(text) && !EXCLUDED.test(item.title) && !LOW_VALUE.test(item.title) && !isWeakRoboticsMatch(item)
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
    const selected = []
    const ordered = responses.flat().sort((a, b) => b.date - a.date)
    for (const item of ordered) {
      const key = item.title.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()
      if (seen.has(key) || isNearDuplicate(item.title, selected.map(entry => entry.title))) continue
      seen.add(key)
      selected.push(item)
      if (selected.length === 16) break
    }

    const urls = await Promise.all(selected.map(item => resolvePublisherUrl(item.link)))
    const previewImages = await Promise.all(selected.map(async (item, index) => {
      if (item.image) return item.image
      // Google News no expone una URL de imagen fiable en su RSS. Para enlaces
      // directos de medios, intentamos leer og:image sin depender de servicios pagos.
      const articleUrl = urls[index]
      if (!articleUrl || articleUrl.includes('news.google.com/')) return ''
      try {
        const response = await fetch(articleUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; IES6Noticias/1.0)' },
          signal: AbortSignal.timeout(3500)
        })
        if (!response.ok) return ''
        const html = (await response.text()).slice(0, 250000)
        const match = html.match(/<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]+content=["']([^"']+)["']/i) ||
          html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["'](?:og:image|twitter:image)["']/i)
        if (!match) return ''
        const imageUrl = new URL(decode(match[1]), articleUrl)
        return imageUrl.protocol === 'https:' ? imageUrl.href : ''
      } catch { return '' }
    }))
    const items = selected.map((item, index) => ({
      categoria: categoryFor(item),
      titulo: item.title,
      fecha: item.date.toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' }),
      cifra: 'IA',
      cifraTxt: 'noticia reciente',
      colores: PALETTE[index % PALETTE.length],
      imagen: previewImages[index] || '',
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
