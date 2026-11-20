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
  // Google News suele entregar RSS 2.0; algunos medios tecnológicos publican Atom.
  const rssItems = [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].map(match => match[1])
  const atomItems = [...xml.matchAll(/<entry(?:\s[^>]*)?>([\s\S]*?)<\/entry>/gi)].map(match => match[1])
  const entries = [...rssItems, ...atomItems]
  return entries.map(item => {
    const isAtom = /<entry(?:\s[^>]*)?>/i.test(item) || /<published[\s>]|<updated[\s>]/i.test(item)
    const source = item.match(/<source(?:\s[^>]*)?>([\s\S]*?)<\/source>/i)
    const author = item.match(/<author(?:\s[^>]*)?>([\s\S]*?)<\/author>/i)
    const title = tag(item, 'title')
    const image = imageFrom(item)
    let description = tag(item, 'description') || tag(item, 'summary') || tag(item, 'content')
    const sourceName = source ? cleanText(tag(source[1], 'title') || source[1]) :
      author ? cleanText(tag(author[1], 'name') || author[1]) : ''
    description = description.replace(/\s+/g, ' ').trim()
    if (description.toLowerCase().startsWith(title.toLowerCase())) {
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
    const dateValue = tag(item, 'pubDate') || tag(item, 'published') || tag(item, 'updated') || tag(item, 'dc:date')
    const date = new Date(dateValue)
    let link = tag(item, 'link')
    if (isAtom) {
      const alternate = [...item.matchAll(/<link\b([^>]*)\/?\s*>/gi)]
        .map(match => match[1])
        .find(attrs => !/\brel=["'](?:self|enclosure)["']/i.test(attrs))
      const href = alternate && alternate.match(/\bhref=["']([^"']+)["']/i)
      if (href) link = decode(href[1])
    }
    if (!link) {
      const enclosureLink = item.match(/<link\b[^>]*\brel=["']enclosure["'][^>]*\bhref=["']([^"']+)["']/i)
      if (enclosureLink) link = decode(enclosureLink[1])
    }
    return { title, link, description, image, source: sourceName, date }
  }).filter(item => {
    const text = item.title + ' ' + item.description
    return item.title && item.link && !Number.isNaN(item.date.getTime()) &&
      item.date.getTime() <= Date.now() + 86400000 &&
      item.date.getTime() >= Date.now() - 14 * 86400000 &&
      RELEVANT.test(text) && !EXCLUDED.test(item.title) && !LOW_VALUE.test(item.title) && !isWeakRoboticsMatch(item)
  })
}
function articleIdFromGoogleUrl(value) {
  try {
    const url = new URL(value)
    if (url.hostname !== 'news.google.com') return ''
    return url.pathname.match(/\\/(?:rss\\/)?(?:articles|read)\\/([\\w-]+)/)?.[1] || ''
  } catch {
    return ''
  }
}

function googleDecodeParams(html) {
  const sg = html.match(/data-n-a-sg="([^"]+)"/)?.[1]
  const ts = html.match(/data-n-a-ts="([^"]+)"/)?.[1]
  return sg && ts ? { sg, ts: Number(ts) } : null
}

function googleBatchBody(articleId, { sg, ts }) {
  const inner = JSON.stringify([
    'garturlreq',
    [['X', 'X', ['X', 'X'], null, null, 1, 1, 'US:en', null, 1, null, null, null, null, null, 0, 1], 'X', 'X', 1, [1, 1, 1], 1, 1, null, 0, 0, null, 0],
    articleId, ts, sg
  ])
  return 'f.req=' + encodeURIComponent(JSON.stringify([[['Fbv4je', inner, null, 'generic']]]))
}

function googleBatchResult(body) {
  for (const line of body.split('\\n')) {
    if (!line.startsWith('[[')) continue
    try {
      const rows = JSON.parse(line)
      for (const row of rows) {
        if (row[1] !== 'Fbv4je' || typeof row[2] !== 'string') continue
        const url = JSON.parse(row[2])?.[1]
        if (typeof url === 'string' && /^https?:\\/\\//i.test(url)) return url
      }
    } catch { /* Respuesta de Google no reconocida */ }
  }
  return ''
}

async function resolvePublisherUrl(url) {
  if (!url || !url.includes('news.google.com/')) return url
  const articleId = articleIdFromGoogleUrl(url)
  if (!articleId) return url
  try {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9'
    }
    // Google ya no redirige por HTTP: la página contiene una firma necesaria
    // para consultar su endpoint interno Fbv4je y recuperar la URL editorial.
    const page = await fetch('https://news.google.com/rss/articles/' + articleId, {
      method: 'GET',
      redirect: 'follow',
      headers,
      signal: AbortSignal.timeout(4500)
    })
    if (!page.ok) return url
    const html = await page.text()
    const params = googleDecodeParams(html)
    if (!params) return url
    const response = await fetch('https://news.google.com/_/DotsSplashUi/data/batchexecute', {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: googleBatchBody(articleId, params),
      signal: AbortSignal.timeout(4500)
    })
    if (!response.ok) return url
    const publisherUrl = googleBatchResult(await response.text())
    return publisherUrl || url
  } catch {
    return url
  }
}

async function mapWithConcurrency(items, limit, callback) {
  const output = new Array(items.length)
  let next = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++
      output[index] = await callback(items[index], index)
    }
  })
  await Promise.all(workers)
  return output
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
      const key = item.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()
      if (seen.has(key) || isNearDuplicate(item.title, selected.map(entry => entry.title))) continue
      seen.add(key)
      selected.push(item)
      if (selected.length === 16) break
    }

    const urls = await mapWithConcurrency(selected, 5, item => resolvePublisherUrl(item.link))
    const previewImages = await mapWithConcurrency(selected, 6, async (item, index) => {
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
    })
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
