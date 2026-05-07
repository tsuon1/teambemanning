import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Globe, ChevronDown } from "lucide-react";
import { languages } from "@/i18n/languages";
import { AnimatePresence, motion } from "framer-motion";
import { ROUTES, LangCode, resolveRoute } from "@/i18n/routes";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const current = languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchLanguage = (newLang: LangCode) => {
    // Find the equivalent URL of the current page in the target language.
    // If the current path doesn't map to a known page (e.g. NotFound),
    // fall back to that language's home.
    const resolved = resolveRoute(location.pathname);
    const targetPath = resolved
      ? ROUTES[resolved.pageKey][newLang]
      : ROUTES.home[newLang];

    setOpen(false);
    navigate(targetPath);
    // i18n.changeLanguage will be called by <LanguageRoute> on the new
    // route, but call here too for instant UI update before navigation
    // commits.
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-background/80 hover:text-background transition-colors text-sm font-medium"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline text-xs font-medium">{current.shortCode}</span>
        <ChevronDown className={`w-3 h-3 opacity-50 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 min-w-[180px] bg-background border border-border rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.08)] py-2 z-50 max-h-[60vh] overflow-y-auto"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code as LangCode)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-3 ${
                  i18n.language === lang.code
                    ? "text-foreground bg-secondary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <span className="text-xs font-medium text-muted-foreground w-5">{lang.shortCode}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
