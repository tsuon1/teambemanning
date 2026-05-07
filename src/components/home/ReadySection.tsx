import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const ReadySection = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-background flex items-center justify-center" style={{ padding: '15vh 0' }}>
      <div className="container-wide text-center">
        <h2 className="font-black text-foreground mb-8 uppercase max-w-[640px] mx-auto leading-[1.2]" style={{ fontSize: 'var(--h2-size)' }}>
          {t("ready.title")}
        </h2>
        <Link to="/kontakt" className="inline-flex items-center gap-2 border border-foreground text-foreground font-medium text-sm px-7 py-3 rounded-full hover:bg-foreground hover:text-background transition-colors">
          {t("ready.cta")} <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default ReadySection;