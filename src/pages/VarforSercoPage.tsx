import { useTranslation } from "react-i18next";
import heroImg from "@/assets/hero-varfor.jpg";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SEO from "@/components/SEO";
import { CheckCircle } from "lucide-react";

const VarforSercoPage = () => {
  const { t } = useTranslation();
  const reasons = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({
    title: t(`whySercoPage.r${n}.title`),
    desc: t(`whySercoPage.r${n}.desc`),
  }));

  return (
    <div>
      <SEO pageKey="whySerco" />
      <PageHero kicker={t("whySercoPage.kicker")} title={t("whySercoPage.title")} description={t("whySercoPage.desc")} image={heroImg} imagePosition="center 30%" />

      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((r) => (
              <div key={r.title} className="group">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-1" />
                  <h3 className="font-display text-lg font-semibold text-foreground">{r.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed ml-8">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-28 bg-primary text-primary-foreground">
        <div className="container-wide text-center">
          <h2 className="text-[clamp(1.9rem,2.2vw+1rem,2.6rem)] font-black leading-tight uppercase text-primary-foreground mb-6">
            {t("whySercoPage.bestOfBoth")}
          </h2>
          <p className="text-lg text-primary-foreground/70 leading-relaxed max-w-3xl mx-auto normal-case">
            {t("whySercoPage.bestOfBothDesc")}
          </p>
        </div>
      </section>

      <CTABanner />
    </div>
  );
};

export default VarforSercoPage;