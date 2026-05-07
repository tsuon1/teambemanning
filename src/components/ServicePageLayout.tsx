import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle, ClipboardCheck, SearchCheck, UserCheck, MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTABanner from "@/components/CTABanner";

interface ServicePageLayoutProps {
  heroImage: string;
  heroImagePosition?: string;
  pageKey: string;
  whyIcons?: Record<string, React.ReactNode>;
}

const ServicePageLayout = ({
  heroImage,
  heroImagePosition = "center 30%",
  pageKey,
  whyIcons = {},
}: ServicePageLayoutProps) => {
  const { t } = useTranslation();

  const helpItems = [1, 2, 3, 4, 5, 6].map((n) => t(`${pageKey}.h${n}`));
  const roles = Array.from({ length: 7 }, (_, i) => {
    const val = t(`${pageKey}.role${i + 1}`, { defaultValue: "" });
    return val;
  }).filter(Boolean);
  const whyItems = [1, 2, 3, 4, 5, 6].map((n) => ({
    title: t(`${pageKey}.w${n}.title`),
    desc: t(`${pageKey}.w${n}.desc`),
  }));
  const commonNeeds = [1, 2, 3, 4, 5, 6].map((n) => t(`${pageKey}.n${n}`));

  return (
    <div>
      <PageHero kicker={t(`${pageKey}.kicker`)} title={t(`${pageKey}.title`)} description={t(`${pageKey}.desc`)} image={heroImage} imagePosition={heroImagePosition} />

      <section className="section-padding bg-background">
        <div className="container-wide">
          <SectionHeading title={t(`${pageKey}.introTitle`)} align="left" />
          <p className="text-muted-foreground leading-relaxed text-lg -mt-8">{t(`${pageKey}.introText`)}</p>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <SectionHeading kicker={t("serviceLayout.offerKicker")} title={t(`${pageKey}.helpTitle`)} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {helpItems.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-card rounded-xl p-5 border border-border">
                <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-foreground text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide">
          <SectionHeading kicker={t("serviceLayout.rolesKicker")} title={t(`${pageKey}.rolesTitle`)} />
          <div className="flex flex-wrap gap-3 justify-center">
            {roles.map((role) => (
              <span key={role} className="px-5 py-2.5 bg-secondary rounded-full text-sm font-medium text-foreground">{role}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-warm">
        <div className="container-wide">
          <SectionHeading kicker={t("serviceLayout.experienceKicker")} title={t("serviceLayout.experienceTitle")} align="left" />
          <p className="text-muted-foreground leading-relaxed text-lg -mt-8">{t(`${pageKey}.experienceText`)}</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide">
          <SectionHeading kicker={t("serviceLayout.qualityKicker")} title={t("serviceLayout.qualityTitle")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { key: "q1", icon: <ClipboardCheck className="w-6 h-6" /> },
              { key: "q2", icon: <SearchCheck className="w-6 h-6" /> },
              { key: "q3", icon: <UserCheck className="w-6 h-6" /> },
              { key: "q4", icon: <MessageCircle className="w-6 h-6" /> },
            ].map((q) => (
              <div key={q.key} className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center mx-auto mb-4">{q.icon}</div>
                <h3 className="font-display font-black text-foreground mb-2 uppercase">{t(`serviceLayout.${q.key}.title`)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(`serviceLayout.${q.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide">
          <div className="max-w-3xl mb-12">
            <span className="inline-block text-accent font-display font-semibold text-sm tracking-widest uppercase mb-3">{t("serviceLayout.advantagesKicker")}</span>
            <h2 className="font-display text-3xl md:text-4xl font-black leading-tight uppercase">{t("serviceLayout.advantagesTitle")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyItems.map((w) => (
              <div key={w.title} className="bg-primary-foreground/5 rounded-xl p-6 border border-primary-foreground/10">
                {whyIcons[w.title] && <div className="text-primary-foreground/70 mb-3">{whyIcons[w.title]}</div>}
                <h3 className="font-display font-black mb-2 uppercase">{w.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide">
          <SectionHeading kicker={t("serviceLayout.needsKicker")} title={t("serviceLayout.needsTitle")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonNeeds.map((need) => (
              <div key={need} className="flex items-center gap-3 p-4">
                <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                <span className="text-foreground text-sm">{need}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner title={t(`${pageKey}.ctaTitle`, { defaultValue: "" }) || undefined} />
    </div>
  );
};

export default ServicePageLayout;