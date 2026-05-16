import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Plus, Mail, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import sercoLogo from "@/assets/serco-logo.png";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ROUTES, LangCode, resolveRoute, detectLangFromPath } from "@/i18n/routes";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { t } = useTranslation();

  const lang: LangCode =
    resolveRoute(location.pathname)?.lang ?? detectLangFromPath(location.pathname);
  const link = (key: keyof typeof ROUTES) => ROUTES[key][lang];

  const home = link("home");
  const services = [
    { name: t("nav.transport"), href: home },
    { name: t("nav.logistics"), href: home },
    { name: t("nav.industry"),  href: home },
    { name: t("nav.cleaning"),  href: home },
  ];
  const aboutLinks = [
    { name: t("nav.about"),    href: home },
    { name: t("nav.partners"), href: home },
    { name: t("nav.news"),     href: home },
  ];

  const close = () => { setMenuOpen(false); setMobileDropdown(null); };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 text-white bg-surface/40 backdrop-blur-sm">
      <div className="grid grid-cols-[auto_1fr_auto] items-stretch">
        {/* Left: Meny trigger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col items-center justify-center gap-1.5 px-6 md:px-10 py-5 hover:bg-white/5 transition-colors"
          aria-label="Meny"
        >
          {menuOpen ? <X className="w-6 h-6" strokeWidth={2} /> : <Menu className="w-6 h-6" strokeWidth={2} />}
          <span className="text-xs font-medium tracking-wide">{menuOpen ? t("nav.close") || "Stäng" : "Meny"}</span>
        </button>

        {/* Center: Logo with slash separator */}
        <div className="flex items-center gap-4 md:gap-6 pl-2 md:pl-6">
          <span className="text-white/40 text-3xl md:text-4xl font-light leading-none select-none">/</span>
          <Link to={home} className="flex items-center" onClick={close}>
            <img src={sercoLogo} alt="SERCO Bemanning" className="h-14 md:h-20 w-auto" />
          </Link>
        </div>

        {/* Right: icon stack items + brand CTA block */}
        <div className="flex items-stretch">
          <Link
            to={link("contact")}
            className="hidden sm:flex flex-col items-center justify-center gap-1.5 px-4 md:px-6 py-5 text-white hover:bg-white/5 transition-colors"
          >
            <Mail className="w-5 h-5" strokeWidth={1.75} />
            <span className="text-xs font-medium tracking-wide">{t("nav.contact") || "Kontakt"}</span>
          </Link>

          <div className="hidden md:flex flex-col items-center justify-center gap-1.5 px-4 md:px-6 py-5 hover:bg-white/5 transition-colors">
            <LanguageSwitcher />
          </div>

          {/* Brand CTA block — Akavia-style */}
          <Link
            to={link("contact")}
            className="flex flex-col items-center justify-center gap-1.5 px-6 md:px-10 py-5 bg-brand text-white hover:brightness-110 transition-all"
          >
            <Plus className="w-6 h-6" strokeWidth={2} />
            <span className="text-xs font-semibold tracking-wide">{t("nav.contactUs")}</span>
          </Link>
        </div>
      </div>

      {/* Slide-down full menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="bg-surface border-t border-white/10 overflow-hidden"
          >
            <div className="container-wide py-10 grid md:grid-cols-3 gap-10">
              <div>
                <button
                  onClick={() => setMobileDropdown(mobileDropdown === "tjanster" ? null : "tjanster")}
                  className="flex items-center justify-between w-full text-left text-white font-display text-xl font-bold uppercase tracking-wide mb-3"
                >
                  {t("nav.services")}
                  <ChevronDown className={`w-5 h-5 transition-transform md:hidden ${mobileDropdown === "tjanster" ? "rotate-180" : ""}`} />
                </button>
                <div className={`flex-col gap-2 ${mobileDropdown === "tjanster" ? "flex" : "hidden md:flex"}`}>
                  {services.map((s) => (
                    <Link key={s.name} to={s.href} onClick={close} className="text-white/70 hover:text-brand transition-colors text-sm uppercase tracking-wide py-1">
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link to={home} onClick={close} className="text-white font-display text-xl font-bold uppercase tracking-wide hover:text-brand transition-colors">
                  {t("nav.howItWorks")}
                </Link>
                <Link to={home} onClick={close} className="text-white font-display text-xl font-bold uppercase tracking-wide hover:text-brand transition-colors">
                  {t("nav.whyTeambemanning")}
                </Link>
                <Link to={home} onClick={close} className="text-white font-display text-xl font-bold uppercase tracking-wide hover:text-brand transition-colors">
                  {t("nav.workWithUs")}
                </Link>
              </div>

              <div>
                <button
                  onClick={() => setMobileDropdown(mobileDropdown === "about" ? null : "about")}
                  className="flex items-center justify-between w-full text-left text-white font-display text-xl font-bold uppercase tracking-wide mb-3"
                >
                  {t("nav.aboutUs")}
                  <ChevronDown className={`w-5 h-5 transition-transform md:hidden ${mobileDropdown === "about" ? "rotate-180" : ""}`} />
                </button>
                <div className={`flex-col gap-2 ${mobileDropdown === "about" ? "flex" : "hidden md:flex"}`}>
                  {aboutLinks.map((l) => (
                    <Link key={l.name} to={l.href} onClick={close} className="text-white/70 hover:text-brand transition-colors text-sm uppercase tracking-wide py-1">
                      {l.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
