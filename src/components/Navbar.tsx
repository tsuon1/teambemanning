import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, MessageCircle, Plus, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import sercoLogo from "@/assets/teambemanning-logo.png";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ROUTES, LangCode, resolveRoute, detectLangFromPath } from "@/i18n/routes";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className="fixed top-0 left-0 right-0 z-50 text-background bg-surface"
    >
      {/* Decorative curve hanging from the navbar — anchored under the logo */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-full -mt-[3px]"
        style={{ lineHeight: 0, perspective: "600px", transformStyle: "preserve-3d" }}
      >
        <div className="container-wide">
          <div
            className={scrolled ? "animate-bubble-retract" : "animate-bubble-extend"}
            style={{ transformOrigin: "0% 0%", willChange: "transform" }}
          >
            <div className="relative w-[240px] sm:w-[340px] md:w-[420px] h-[56px] sm:h-[72px]">
              {/* Left filler so the surface extends to the viewport edge */}
              <div
                className="absolute top-0 bottom-0 right-full w-screen bg-surface"
                aria-hidden
              />
              <svg
                viewBox="0 0 640 80"
                preserveAspectRatio="xMinYMin meet"
                className="block h-full w-full"
              >
                <path
                  d="M0,0 L0,30 C100,58 240,60 380,32 C460,16 520,4 640,0 Z"
                  fill="hsl(var(--surface))"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>






      <div className="container-wide flex items-stretch justify-between min-h-[76px] sm:min-h-[89px]">
        {/* Left: Meny + Logo */}
        <div
          className="flex items-center -ml-2 sm:ml-0"
        >
          <Link
            to={home}
            className="flex items-center origin-bottom-left transition-transform duration-700 ease-out"
            style={{ transform: scrolled ? "translateY(0) scale(1)" : `translateY(24px) scale(${isMobile ? 1.2 : 1.5})` }}
          >
            <img
              src={sercoLogo}
              alt="Teambemanning"
              className="h-[42px] sm:h-[53px] w-auto"
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

          <a
            href="tel:+4687585607"
            className="hidden sm:flex flex-col items-center justify-center gap-1 px-5 text-background/90 hover:text-brand transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="text-[11px] font-medium tracking-wide uppercase">{t("nav.call", { defaultValue: "Ring" })}</span>
          </a>

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

      {/* Slide-out menu panel — rendered via portal to escape header's containing block (backdrop-filter) */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-[55]"
              onClick={closeMenu}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-[420px] bg-surface text-background z-[60] pt-[88px] overflow-y-auto border-r border-background/10 shadow-2xl"
            >
              <button
                onClick={closeMenu}
                aria-label="Stäng meny"
                className="absolute top-4 right-4 p-2 text-background/80 hover:text-brand transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
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
                  className="block px-6 py-4 text-base font-semibold uppercase border-b border-background/10 hover:text-brand transition-colors"
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
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
};

export default Navbar;
