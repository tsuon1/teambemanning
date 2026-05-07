import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ROUTES, LangCode, resolveRoute, detectLangFromPath } from "@/i18n/routes";

interface CTABannerProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

const CTABanner = ({ title, description, buttonText, buttonLink }: CTABannerProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const lang: LangCode =
    resolveRoute(location.pathname)?.lang ?? detectLangFromPath(location.pathname);
  const resolvedLink = buttonLink ?? ROUTES.contact[lang];
  const displayTitle = title || t("cta.defaultTitle");
  const displayButton = buttonText || t("cta.defaultButton");

  return (
    <section className="bg-secondary" style={{ paddingBlock: 'var(--section-pad)' }}>
      <div className="text-center container-wide">
        <h2 className="font-black text-foreground mb-4 leading-tight uppercase max-w-[640px] mx-auto text-center text-balance" style={{ fontSize: 'var(--h2-size)' }}>
          {displayTitle}
        </h2>
        {description && (
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto normal-case text-center" style={{ fontSize: 'var(--p-size)', lineHeight: 'var(--p-line)' }}>
            {description}
          </p>
        )}
        {!description && <div className="mb-8" />}
        <Link to={resolvedLink} className="inline-flex items-center gap-2 border border-foreground text-foreground font-medium text-sm px-7 py-3 rounded-[2px] hover:bg-brand hover:text-foreground hover:border-brand transition-colors">
          {displayButton} <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default CTABanner;