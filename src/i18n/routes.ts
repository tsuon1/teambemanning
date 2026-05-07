// Central route map driving language-prefixed URLs, hreflang alternates,
// SSR language detection, and the prerender route list.
//
// Each pageKey corresponds to one logical page. Each language has its own
// fully translated URL — there are NO shared URLs between languages.

export type LangCode = 'sv' | 'en' | 'ro';

export const SUPPORTED_LANGS: LangCode[] = ['sv', 'en', 'ro'];
export const DEFAULT_LANG: LangCode = 'sv';

export type PageKey =
  | 'home'
  | 'services'
  | 'transport'
  | 'logistics'
  | 'industry'
  | 'cleaning'
  | 'howItWorks'
  | 'whySerco'
  | 'careers'
  | 'about'
  | 'partners'
  | 'news'
  | 'contact';

export const ROUTES: Record<PageKey, Record<LangCode, string>> = {
  home:        { sv: '/',                       en: '/en',                          ro: '/ro' },
  services:    { sv: '/tjanster',               en: '/en/services',                 ro: '/ro/servicii' },
  transport:   { sv: '/tjanster/transport',     en: '/en/services/transport',       ro: '/ro/servicii/transport' },
  logistics:   { sv: '/tjanster/logistik',      en: '/en/services/logistics',       ro: '/ro/servicii/logistica' },
  industry:    { sv: '/tjanster/industri',      en: '/en/services/industry',        ro: '/ro/servicii/industrie' },
  cleaning:    { sv: '/tjanster/lokalvard',     en: '/en/services/cleaning',        ro: '/ro/servicii/curatenie' },
  howItWorks:  { sv: '/hur-det-gar-till',       en: '/en/how-it-works',             ro: '/ro/cum-functioneaza' },
  whySerco:    { sv: '/varfor-serco',           en: '/en/why-serco',                ro: '/ro/de-ce-serco' },
  careers:     { sv: '/jobba-hos-oss',          en: '/en/careers',                  ro: '/ro/cariere' },
  about:       { sv: '/om-oss',                 en: '/en/about-us',                 ro: '/ro/despre-noi' },
  partners:    { sv: '/partners',               en: '/en/partners',                 ro: '/ro/parteneri' },
  news:        { sv: '/nyheter',                en: '/en/news',                     ro: '/ro/stiri' },
  contact:     { sv: '/kontakt',                en: '/en/contact',                  ro: '/ro/contact' },
};

/** Flat list of every prerenderable URL in canonical order. */
export const ALL_ROUTES: string[] = (Object.keys(ROUTES) as PageKey[]).flatMap(
  (key) => SUPPORTED_LANGS.map((lang) => ROUTES[key][lang])
);

/** Reverse lookup: pathname -> { lang, pageKey }. Returns null if unknown. */
export function resolveRoute(pathname: string): { lang: LangCode; pageKey: PageKey } | null {
  // Normalize trailing slashes (except root).
  const normalized =
    pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  for (const key of Object.keys(ROUTES) as PageKey[]) {
    for (const lang of SUPPORTED_LANGS) {
      if (ROUTES[key][lang] === normalized) return { lang, pageKey: key };
    }
  }
  return null;
}

/** Detect the language for a path purely by its prefix (used as a fallback). */
export function detectLangFromPath(pathname: string): LangCode {
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en';
  if (pathname === '/ro' || pathname.startsWith('/ro/')) return 'ro';
  return 'sv';
}

/** Build hreflang alternates for a given pageKey. Absolute URLs. */
export function getAlternates(pageKey: PageKey, siteUrl: string) {
  const map = ROUTES[pageKey];
  return {
    sv: `${siteUrl}${map.sv === '/' ? '' : map.sv}`,
    en: `${siteUrl}${map.en}`,
    ro: `${siteUrl}${map.ro}`,
    xDefault: `${siteUrl}${map.sv === '/' ? '' : map.sv}`,
  };
}

/** Build a localized path for a given pageKey + language. */
export function localizedPath(pageKey: PageKey, lang: LangCode): string {
  return ROUTES[pageKey][lang];
}