import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  PageKey,
  ROUTES,
  SUPPORTED_LANGS,
  resolveRoute,
  getAlternates,
  LangCode,
} from "@/i18n/routes";

const SITE_URL = "https://www.sercobemanning.se";
const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/458X0KN74HbbIDrxLC1Z1MnFXUL2/social-images/social-1775755444342-serco_bemmaning-logga.webp";

const OG_LOCALE: Record<LangCode, string> = {
  sv: "sv_SE",
  en: "en_US",
  ro: "ro_RO",
};

interface SEOProps {
  /** Page identifier — when provided, title/description are pulled from i18n
   *  (`seo.<pageKey>.title` / `.description`) and hreflang alternates are
   *  emitted automatically. */
  pageKey?: PageKey;
  /** Optional explicit title (overrides translation). */
  title?: string;
  /** Optional explicit description (overrides translation). */
  description?: string;
  /** Optional path override; defaults to current pathname */
  path?: string;
  image?: string;
  /** Additional JSON-LD object(s) to inject */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

const SEO = ({ pageKey, title, description, path, image, jsonLd, noindex }: SEOProps) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const pathname = path ?? location.pathname;
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  // Resolve which page (and language) this URL represents, so we can emit
  // a correct canonical and hreflang alternates even on edge routes.
  const resolved = resolveRoute(pathname);
  const effectivePageKey = pageKey ?? resolved?.pageKey;
  const lang = (resolved?.lang ?? (i18n.language as LangCode)) as LangCode;

  // Canonical: when we know the pageKey use the language-correct route from
  // the route map; otherwise fall back to the current pathname.
  const canonicalPath = effectivePageKey
    ? ROUTES[effectivePageKey][lang]
    : pathname;
  const canonical = `${SITE_URL}${canonicalPath === "/" ? "" : canonicalPath}`;

  // Title / description — explicit prop wins, otherwise pull from i18n.
  const seoTitle =
    title ??
    (effectivePageKey ? t(`seo.${effectivePageKey}.title`) : undefined) ??
    "SERCO Bemanning";
  const seoDescription =
    description ??
    (effectivePageKey ? t(`seo.${effectivePageKey}.description`) : undefined) ??
    "";

  const alternates = effectivePageKey ? getAlternates(effectivePageKey, SITE_URL) : null;

  const ldArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <html lang={lang} />
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* hreflang alternates — one per supported language + x-default */}
      {alternates && (
        <link rel="alternate" hrefLang="sv" href={alternates.sv} />
      )}
      {alternates && (
        <link rel="alternate" hrefLang="en" href={alternates.en} />
      )}
      {alternates && (
        <link rel="alternate" hrefLang="ro" href={alternates.ro} />
      )}
      {alternates && (
        <link rel="alternate" hrefLang="x-default" href={alternates.xDefault} />
      )}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="SERCO Bemanning" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={OG_LOCALE[lang]} />
      {SUPPORTED_LANGS.filter((l) => l !== lang).map((l) => (
        <meta key={l} property="og:locale:alternate" content={OG_LOCALE[l]} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={ogImage} />

      {ldArray.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
