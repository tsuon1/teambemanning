import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import i18n from './i18n';
import { detectLangFromPath } from './i18n/routes';

export function render(url: string) {
  // Set i18n to the language matching the URL prefix BEFORE rendering so
  // server output (titles, body copy, hreflang) is in the right language.
  // The client's <LanguageRoute> wrapper will set the same language on
  // hydration, so first paint matches.
  const lang = detectLangFromPath(url);
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  const helmetContext = {} as { helmet?: any };
  const html = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  const helmet = helmetContext.helmet;
  const head = helmet
    ? [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ].join('')
    : '';

  // Helmet's <html lang=...> attribute lives on htmlAttributes — extract
  // so prerender can set it on the static <html> tag.
  const htmlAttrs = helmet?.htmlAttributes?.toString?.() ?? '';

  return { html, head, htmlAttrs, lang };
}
