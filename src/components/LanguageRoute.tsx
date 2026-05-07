import { ReactElement, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LangCode } from "@/i18n/routes";

interface LanguageRouteProps {
  lang: LangCode;
  children: ReactElement;
}

/**
 * Wraps a Route element and ensures i18next is set to `lang` BEFORE the
 * children render. Done synchronously (not in useEffect) so SSR output is
 * already in the correct language for that URL.
 *
 * The useEffect on the client persists the choice into localStorage via
 * the existing i18n languageChanged handler.
 */
const LanguageRoute = ({ lang, children }: LanguageRouteProps) => {
  const { i18n } = useTranslation();

  // Synchronous language switch — runs on every render, including SSR.
  if (i18n.language !== lang) {
    // changeLanguage is sync when resources are already loaded (they are,
    // bundled at init in src/i18n/index.ts).
    i18n.changeLanguage(lang);
  }

  // Defensive client-side sync in case Strict Mode / hydration order races.
  useEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [i18n, lang]);

  return children;
};

export default LanguageRoute;