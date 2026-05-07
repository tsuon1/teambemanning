import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import sv from './locales/sv.json';
import en from './locales/en.json';
import ro from './locales/ro.json';
import { detectLangFromPath } from './routes';

// Pick the initial language from the URL prefix (sv | en | ro).
// This ensures the server and the client both initialise i18n to the
// SAME language (the one matching the URL), avoiding hydration
// mismatches between the prerendered HTML and the first client render.
// localStorage is intentionally NOT consulted: the URL is the source of
// truth for which language a page is in.
const initialLang =
  typeof window !== 'undefined' && window.location
    ? detectLangFromPath(window.location.pathname)
    : 'sv';

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      sv: { translation: sv },
      en: { translation: en },
      ro: { translation: ro },
    },
    lng: initialLang,
    fallbackLng: 'sv',
    interpolation: { escapeValue: false },
    react: {
      // Render synchronously so SSR output contains real strings, not keys.
      useSuspense: false,
    },
  });
}

i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = lng;
  }
});

export default i18n;
