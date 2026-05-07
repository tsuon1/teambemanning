import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import sercoLogo from "@/assets/serco-logo.png";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ROUTES, LangCode, resolveRoute, detectLangFromPath } from "@/i18n/routes";

interface DropdownProps {
  label: string;
  items: { name: string; href: string }[];
  isActive: boolean;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: () => void;
}

const NavDropdown = ({ label, items, isActive, open, onOpen, onClose, onNavigate }: DropdownProps) => (
  <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
    <button
      className={`flex items-center gap-1.5 font-medium text-sm tracking-[0.02em] transition-colors ${
        isActive ? "text-brand" : "text-background/80 hover:text-brand"
      }`}
    >
      {label}
      <ChevronDown className={`w-3 h-3 opacity-50 transition-transform ${open ? "rotate-180" : ""}`} />
    </button>
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full left-0 mt-2 min-w-[200px] bg-background border border-border rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.08)] py-2 z-50"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={onNavigate}
              className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors uppercase"
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { t } = useTranslation();

  // Resolve current language from the URL so all nav links point to the
  // matching language version of each page.
  const lang: LangCode =
    resolveRoute(location.pathname)?.lang ?? detectLangFromPath(location.pathname);
  const link = (key: keyof typeof ROUTES) => ROUTES[key][lang];

  const services = [
    { name: t("nav.transport"), href: link("transport") },
    { name: t("nav.logistics"), href: link("logistics") },
    { name: t("nav.industry"),  href: link("industry") },
    { name: t("nav.cleaning"),  href: link("cleaning") },
  ];

  const aboutLinks = [
    { name: t("nav.about"),    href: link("about") },
    { name: t("nav.partners"), href: link("partners") },
    { name: t("nav.news"),     href: link("news") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface text-background border-b border-background/10">
      <div className="container-wide flex items-center justify-between py-4 nav:py-5">
        <Link to={link("home")} className="flex items-center">
          <img src={sercoLogo} alt="SERCO Bemanning" className="h-10 nav:h-12 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden nav:flex items-center gap-8">
          <NavDropdown
            label={t("nav.services")}
            items={services}
            isActive={services.some((s) => location.pathname === s.href) || location.pathname === link("services")}
            open={openDropdown === "tjanster"}
            onOpen={() => setOpenDropdown("tjanster")}
            onClose={() => setOpenDropdown(null)}
            onNavigate={() => setOpenDropdown(null)}
          />

          <Link
            to={link("howItWorks")}
            className={`font-medium text-sm tracking-[0.02em] transition-colors ${
              location.pathname === link("howItWorks") ? "text-brand" : "text-background/80 hover:text-brand"
            }`}
          >
            {t("nav.howItWorks")}
          </Link>

          <Link
            to={link("whySerco")}
            className={`font-medium text-sm tracking-[0.02em] transition-colors ${
              location.pathname === link("whySerco") ? "text-brand" : "text-background/80 hover:text-brand"
            }`}
          >
            {t("nav.whySerco")}
          </Link>

          <Link
            to={link("careers")}
            className={`font-medium text-sm tracking-[0.02em] transition-colors ${
              location.pathname === link("careers") ? "text-brand" : "text-background/80 hover:text-brand"
            }`}
          >
            {t("nav.workWithUs")}
          </Link>

          <NavDropdown
            label={t("nav.aboutUs")}
            items={aboutLinks}
            isActive={aboutLinks.some((l) => l.href === location.pathname)}
            open={openDropdown === "about"}
            onOpen={() => setOpenDropdown("about")}
            onClose={() => setOpenDropdown(null)}
            onNavigate={() => setOpenDropdown(null)}
          />
        </nav>

        {/* Right side */}
        <div className="hidden nav:flex items-center gap-5">
          <LanguageSwitcher />
          <Link
            to={link("contact")}
            className="border border-background text-background font-medium text-sm px-6 py-2.5 rounded-full hover:bg-brand hover:text-background hover:border-brand transition-colors"
          >
            {t("nav.contactUs")}
          </Link>
        </div>

        {/* Mobile right side */}
        <div className="nav:hidden flex items-center gap-3 z-50">
          <LanguageSwitcher />
          <Link
            to={link("contact")}
            className="border border-background text-background font-medium text-xs px-4 py-2 rounded-full hover:bg-brand hover:text-foreground hover:border-brand transition-colors"
          >
            {t("nav.contactUs")}
          </Link>
          <button
            className="p-2 text-background"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Meny"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="nav:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="container-wide py-6 flex flex-col gap-1">
              <button
                onClick={() => setMobileDropdown(mobileDropdown === "tjanster" ? null : "tjanster")}
                className="flex items-center justify-between w-full px-3 py-2.5 text-xs text-muted-foreground font-bold tracking-widest uppercase"
              >
                {t("nav.services")}
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdown === "tjanster" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mobileDropdown === "tjanster" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        to={s.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-6 py-2.5 text-xs text-foreground hover:text-muted-foreground transition-colors uppercase tracking-widest"
                      >
                        {s.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="border-t border-border my-3" />

              <Link to={link("howItWorks")} onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-xs text-muted-foreground font-bold tracking-widest hover:text-foreground transition-colors uppercase">
                {t("nav.howItWorks")}
              </Link>
              <Link to={link("whySerco")} onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-xs text-muted-foreground font-bold tracking-widest hover:text-foreground transition-colors uppercase">
                {t("nav.whySerco")}
              </Link>
              <Link to={link("careers")} onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-xs text-muted-foreground font-bold tracking-widest hover:text-foreground transition-colors uppercase">
                {t("nav.workWithUs")}
              </Link>

              <div className="border-t border-border my-3" />

              <button
                onClick={() => setMobileDropdown(mobileDropdown === "about" ? null : "about")}
                className="flex items-center justify-between w-full px-3 py-2.5 text-xs text-muted-foreground font-bold tracking-widest uppercase"
              >
                {t("nav.aboutUs")}
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdown === "about" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mobileDropdown === "about" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    {aboutLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-6 py-2.5 text-xs text-foreground hover:text-muted-foreground transition-colors uppercase tracking-widest"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <Link
                to={link("contact")}
                onClick={() => setMobileOpen(false)}
                className="mt-3 border border-foreground text-foreground font-medium text-sm text-center px-6 py-2.5 rounded-full hover:bg-brand hover:text-foreground hover:border-brand transition-colors"
              >
                {t("nav.contactUs")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
