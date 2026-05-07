import { useTranslation } from "react-i18next";
import heroImg from "@/assets/hero-process.jpg";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTABanner from "@/components/CTABanner";
import SEO from "@/components/SEO";
import { FileText, Clock, SlidersHorizontal, ShieldCheck } from "lucide-react";

const SaFungerarDetPage = () => {
  const { t } = useTranslation();
  const steps = [1, 2, 3, 4, 5, 6].map((n) => ({
    step: String(n).padStart(2, "0"),
    title: t(`processPage.s${n}.title`),
    desc: t(`processPage.s${n}.desc`),
  }));

  const benefits = [
    { key: "b1", icon: <FileText className="w-5 h-5" /> },
    { key: "b2", icon: <Clock className="w-5 h-5" /> },
    { key: "b3", icon: <SlidersHorizontal className="w-5 h-5" /> },
    { key: "b4", icon: <ShieldCheck className="w-5 h-5" /> },
  ];

  return (
    <div>
      <SEO pageKey="howItWorks" />
      <PageHero kicker={t("processPage.kicker")} title={t("processPage.title")} description={t("processPage.desc")} image={heroImg} />

      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="space-y-0">
            {steps.map((s, i) => (
              <div key={s.step} className="relative flex gap-8 pb-12 last:pb-0">
                {i < steps.length - 1 && <div className="absolute left-[23px] top-12 bottom-0 w-px bg-border" />}
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-display font-bold text-sm">{s.step}</div>
                </div>
                <div className="pt-2">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <SectionHeading title={t("processPage.benefitsTitle")} description={t("processPage.benefitsDesc")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((item) => (
              <div key={item.key} className="bg-card rounded-xl p-6 border border-border">
                <div className="text-accent mb-4">{item.icon}</div>
                <h3 className="font-display font-semibold text-foreground mb-2">{t(`processPage.${item.key}.title`)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(`processPage.${item.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner description={t("processPage.ctaDesc")} />
    </div>
  );
};

export default SaFungerarDetPage;