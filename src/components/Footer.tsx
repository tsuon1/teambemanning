import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import sercoLogo from "@/assets/serco-logo.png";
import { ROUTES, LangCode, resolveRoute, detectLangFromPath } from "@/i18n/routes";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();
  const location = useLocation();
  const lang: LangCode =
    resolveRoute(location.pathname)?.lang ?? detectLangFromPath(location.pathname);
  const link = (key: keyof typeof ROUTES) => ROUTES[key][lang];

  return (
    <footer className="bg-foreground text-background pt-20 pb-10 lg:pt-28 lg:pb-14">
      <div className="container-wide">
        <div className="grid md:grid-cols-2 gap-8 items-center pb-14 lg:pb-20">
          <div>
            <h2 className="text-[clamp(1.8rem,2.5vw,2.8rem)] font-black leading-tight mb-3 uppercase">
              {t("footer.newsletter")}
            </h2>
            <p className="text-background/60 normal-case">{t("footer.newsletterDesc")}</p>
          </div>
          <form className="flex gap-3 items-center" onSubmit={(e) => { e.preventDefault(); setEmail(""); }}>
            <input type="email" placeholder={t("footer.emailPlaceholder")} value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 px-4 py-3 bg-background/10 text-background rounded-full border border-background/20 outline-none text-sm placeholder:text-background/40" required />
            <button type="submit" className="px-5 py-3 bg-background text-foreground font-medium text-sm rounded-full hover:bg-background/90 transition-colors flex items-center gap-1.5">
              {t("footer.send")} <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        <div className="border-t border-background/15 pt-12 grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <Link to={link("home")} className="inline-block mb-4">
              <img src={sercoLogo} alt="SERCO Bemanning" className="h-10" />
            </Link>
            <p className="text-sm leading-relaxed text-background/50 normal-case">{t("footer.tagline")}</p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4 tracking-wide">{t("footer.servicesTitle")}</h4>
            <ul className="space-y-2.5 text-sm text-background/50">
              <li><Link to={link("transport")} className="hover:text-background transition-colors">{t("nav.transport")}</Link></li>
              <li><Link to={link("logistics")} className="hover:text-background transition-colors">{t("nav.logistics")}</Link></li>
              <li><Link to={link("industry")} className="hover:text-background transition-colors">{t("nav.industry")}</Link></li>
              <li><Link to={link("cleaning")} className="hover:text-background transition-colors">{t("nav.cleaning")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4 tracking-wide">{t("footer.companyTitle")}</h4>
            <ul className="space-y-2.5 text-sm text-background/50">
              <li><Link to={link("about")} className="hover:text-background transition-colors">{t("footer.aboutUs")}</Link></li>
              <li><Link to={link("whySerco")} className="hover:text-background transition-colors">{t("footer.whySerco")}</Link></li>
              <li><Link to={link("howItWorks")} className="hover:text-background transition-colors">{t("footer.howItWorks")}</Link></li>
              <li><Link to={link("careers")} className="hover:text-background transition-colors">{t("footer.workWithUs")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4 tracking-wide">{t("footer.contactTitle")}</h4>
            <ul className="space-y-2.5 text-sm text-background/50">
              <li><a href="tel:+4687585607" className="hover:text-background transition-colors">08-758 56 07</a></li>
              <li><a href="mailto:info@personaluthyrning.net" className="hover:text-background transition-colors">info@personaluthyrning.net</a></li>
              <li>Sjöängsvägen 6, 192 72 Sollentuna</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-background/15 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-background/40">
          <p>&copy; {new Date().getFullYear()} {t("footer.copyright")}</p>
          <Link to={link("contact")} className="hover:text-background transition-colors">{t("footer.privacy")}</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
