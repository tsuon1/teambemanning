import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, MessageCircle, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import sercoLogo from "@/assets/serco-logo.png";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ROUTES, LangCode, resolveRoute, detectLangFromPath } from "@/i18n/routes";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
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

  const simpleLinks = [
    { name: t("nav.howItWorks"),       href: home },
    { name: t("nav.whyTeambemanning"), href: home },
    { name: t("nav.workWithUs"),       href: home },
  ];

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenGroup(null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface text-background border-b border-background/10">
      <div className="container-wide flex items-stretch justify-between min-h-[88px] sm:min-h-[104px]">
        {/* Left: Meny + Logo */}
        <div className="flex items-center">
          <Link to={home} className="flex items-center">
            <img
              src={sercoLogo}
              alt="Teambemanning"
              className="h-10 sm:h-12 w-auto"
            />
          </Link>
        </div>

        {/* Right: action tiles */}
        <div className="flex items-stretch">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex flex-col items-center justify-center gap-1 px-5 text-background/90 hover:text-brand transition-colors"
            aria-label="Meny"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span className="text-[11px] font-medium tracking-wide">{t("nav.menu", { defaultValue: "Meny" })}</span>
          </button>

          <Link
            to={link("contact")}
            className="hidden sm:flex flex-col items-center justify-center gap-1 px-5 text-background/90 hover:text-brand transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-[11px] font-medium tracking-wide">{t("nav.contact", { defaultValue: "Kontakt" })}</span>
          </Link>

          <div className="hidden sm:flex items-center px-3 border-l border-background/10">
            <LanguageSwitcher />
          </div>

          <Link
            to={link("contact")}
            className="flex flex-col items-center justify-center gap-1 px-6 sm:px-8 bg-brand text-white hover:brightness-110 transition-all"
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
            <span className="text-[11px] font-semibold tracking-wide whitespace-nowrap">
              {t("nav.contactUs")}
            </span>
          </Link>
        </div>
      </div>

      {/* Slide-out menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[var(--nav-h,96px)] bg-black/40 z-40"
              onClick={closeMenu}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed left-0 top-0 bottom-0 w-full max-w-[420px] bg-surface text-background z-40 pt-[var(--nav-h,96px)] overflow-y-auto border-r border-background/10"
            >
              <nav className="flex flex-col py-4">
                {/* Services group */}
                <button
                  onClick={() => setOpenGroup(openGroup === "services" ? null : "services")}
                  className="flex items-center justify-between w-full px-6 py-4 text-left text-base font-semibold border-b border-background/10 hover:text-brand transition-colors"
                >
                  {t("nav.services")}
                  <Plus
                    className={`w-5 h-5 transition-transform ${openGroup === "services" ? "rotate-45" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {openGroup === "services" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-background/5"
                    >
                      {services.map((s) => (
                        <Link
                          key={s.name}
                          to={s.href}
                          onClick={closeMenu}
                          className="block px-10 py-3 text-sm text-background/80 hover:text-brand transition-colors"
                        >
                          {s.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {simpleLinks.map((l) => (
                  <Link
                    key={l.name}
                    to={l.href}
                    onClick={closeMenu}
                    className="block px-6 py-4 text-base font-semibold border-b border-background/10 hover:text-brand transition-colors"
                  >
                    {l.name}
                  </Link>
                ))}

                {/* About group */}
                <button
                  onClick={() => setOpenGroup(openGroup === "about" ? null : "about")}
                  className="flex items-center justify-between w-full px-6 py-4 text-left text-base font-semibold border-b border-background/10 hover:text-brand transition-colors"
                >
                  {t("nav.aboutUs")}
                  <Plus
                    className={`w-5 h-5 transition-transform ${openGroup === "about" ? "rotate-45" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {openGroup === "about" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-background/5"
                    >
                      {aboutLinks.map((l) => (
                        <Link
                          key={l.name}
                          to={l.href}
                          onClick={closeMenu}
                          className="block px-10 py-3 text-sm text-background/80 hover:text-brand transition-colors"
                        >
                          {l.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link
                  to={link("contact")}
                  onClick={closeMenu}
                  className="block px-6 py-4 text-base font-semibold border-b border-background/10 hover:text-brand transition-colors"
                >
                  {t("nav.contact", { defaultValue: "Kontakt" })}
                </Link>

                <div className="px-6 py-6 sm:hidden">
                  <LanguageSwitcher />
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
