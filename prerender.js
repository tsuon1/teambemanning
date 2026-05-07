import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

// Explicit route list — must match the <Route path="..."> entries in src/App.tsx.
// Includes Swedish (default), English (/en/...) and Romanian (/ro/...) versions.
// Do NOT derive routes from filenames.
const routesToPrerender = [
  // Swedish (default)
  '/',
  '/tjanster',
  '/tjanster/transport',
  '/tjanster/logistik',
  '/tjanster/industri',
  '/tjanster/lokalvard',
  '/hur-det-gar-till',
  '/varfor-serco',
  '/jobba-hos-oss',
  '/om-oss',
  '/partners',
  '/nyheter',
  '/kontakt',

  // English
  '/en',
  '/en/services',
  '/en/services/transport',
  '/en/services/logistics',
  '/en/services/industry',
  '/en/services/cleaning',
  '/en/how-it-works',
  '/en/why-serco',
  '/en/careers',
  '/en/about-us',
  '/en/partners',
  '/en/news',
  '/en/contact',

  // Romanian
  '/ro',
  '/ro/servicii',
  '/ro/servicii/transport',
  '/ro/servicii/logistica',
  '/ro/servicii/industrie',
  '/ro/servicii/curatenie',
  '/ro/cum-functioneaza',
  '/ro/de-ce-serco',
  '/ro/cariere',
  '/ro/despre-noi',
  '/ro/parteneri',
  '/ro/stiri',
  '/ro/contact',
]

const parentRoutes = new Set(
  routesToPrerender.filter((route) =>
    route !== '/' && routesToPrerender.some((candidate) => candidate !== route && candidate.startsWith(`${route}/`))
  )
)

;(async () => {
  for (const route of routesToPrerender) {
    const { html: appHtml, head, htmlAttrs, lang } = render(route)
    let html = template
      .replace('<!--app-head-->', head)
      .replace('<!--app-html-->', appHtml)
    // Update <html lang="sv"> to the actual rendered language so the static
    // HTML's lang attribute matches the route.
    if (lang) {
      html = html.replace(/<html\s+lang="[^"]*"/i, `<html lang="${lang}"`)
    }
    // Forward any extra htmlAttributes Helmet declared (defensive — currently
    // we only set lang via Helmet, which we already injected via the regex).
    void htmlAttrs

    // Output structure:
    //   /                    -> dist/index.html
    //   leaf route           -> dist/<route> and dist/<route>.html
    //   parent route         -> dist/<route>/index.html and dist/<route>.html
    // Parent routes can't also be emitted as exact files because that would
    // collide with the directory needed for their child routes.
    const filePaths =
      route === '/'
        ? [toAbsolute('dist/index.html')]
        : parentRoutes.has(route)
          ? [toAbsolute(`dist${route}.html`), toAbsolute(`dist${route}/index.html`)]
          : [toAbsolute(`dist${route}`), toAbsolute(`dist${route}.html`)]

    for (const filePath of filePaths) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true })
      fs.writeFileSync(filePath, html)
      console.log('pre-rendered:', path.relative(toAbsolute('.'), filePath))
    }
  }
})()
