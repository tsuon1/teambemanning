import { useTranslation } from "react-i18next";
import { Heart, Shield, TrendingUp, Users, Award, Zap, UserRound, ClipboardList, ShieldCheck, Briefcase, GraduationCap, Rocket, Handshake, HeartHandshake } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTABanner from "@/components/CTABanner";
import SEO from "@/components/SEO";
import heroImg from "@/assets/hero-jobba.jpg";

const JobbaHosOssPage = () => {
  const { t } = useTranslation();

  const whyItems = [
    { key: "j1", icon: <Heart className="w-6 h-6" /> },
    { key: "j2", icon: <Shield className="w-6 h-6" /> },
    { key: "j3", icon: <TrendingUp className="w-6 h-6" /> },
    { key: "j4", icon: <Award className="w-6 h-6" /> },
    { key: "j5", icon: <Users className="w-6 h-6" /> },
    { key: "j6", icon: <Zap className="w-6 h-6" /> },
  ];

  const offerItems = [
    { key: "o1", icon: <UserRound className="w-4 h-4" /> },
    { key: "o2", icon: <ClipboardList className="w-4 h-4" /> },
    { key: "o3", icon: <ShieldCheck className="w-4 h-4" /> },
    { key: "o4", icon: <Briefcase className="w-4 h-4" /> },
    { key: "o5", icon: <GraduationCap className="w-4 h-4" /> },
    { key: "o6", icon: <Rocket className="w-4 h-4" /> },
    { key: "o7", icon: <Handshake className="w-4 h-4" /> },
    { key: "o8", icon: <HeartHandshake className="w-4 h-4" /> },
  ];

  return (
    <div>
      <SEO pageKey="careers" />
      <PageHero kicker={t("jobPage.kicker")} title={t("jobPage.title")} description={t("jobPage.desc")} image={heroImg} imagePosition="center 30%" />

      <section className="section-padding bg-background">
        <div className="container-wide">
          <SectionHeading kicker={t("jobPage.whyKicker")} title={t("jobPage.whyTitle")} description={t("jobPage.whyDesc")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyItems.map((item) => (
              <div key={item.key} className="bg-card border border-border rounded-xl p-6 hover:border-accent/20 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">{item.icon}</div>
                <h3 className="font-display font-semibold text-foreground mb-2">{t(`jobPage.${item.key}.title`)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(`jobPage.${item.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <SectionHeading kicker={t("jobPage.offerKicker")} title={t("jobPage.offerTitle")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerItems.map((item) => (
              <div key={item.key} className="flex items-center gap-3 bg-card rounded-lg p-4 border border-border">
                <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center shrink-0">{item.icon}</div>
                <span className="text-sm font-medium text-foreground">{t(`jobPage.${item.key}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide">
          <SectionHeading kicker={t("jobPage.whoKicker")} title={t("jobPage.whoTitle")} />
          <div className="space-y-4 text-muted-foreground leading-relaxed text-lg text-center max-w-2xl mx-auto -mt-8">
            <p>{t("jobPage.whoP1")}</p>
            <p>{t("jobPage.whoP2")}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-warm">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading kicker={t("jobPage.youthKicker")} title={t("jobPage.youthTitle")} align="left" />
              <p className="text-muted-foreground leading-relaxed -mt-8">{t("jobPage.youthDesc")}</p>
            </div>
            <div>
              <SectionHeading kicker={t("jobPage.sportsKicker")} title={t("jobPage.sportsTitle")} align="left" />
              <p className="text-muted-foreground leading-relaxed -mt-8">{t("jobPage.sportsDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide">
          <SectionHeading title={t("jobPage.applyTitle")} description={t("jobPage.applyDesc")} />
          <form className="max-w-lg mx-auto space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.name")}</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition" placeholder={t("contact.namePlaceholder")} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.emailLabel")}</label>
              <input type="email" className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition" placeholder={t("contact.emailPlaceholder")} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.phoneLabel")}</label>
              <input type="tel" className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition" placeholder={t("contact.phonePlaceholder")} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t("jobPage.area")}</label>
              <select className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition">
                <option value="">{t("jobPage.areaPlaceholder")}</option>
                <option>{t("nav.transport")}</option>
                <option>{t("nav.logistics")}</option>
                <option>{t("nav.industry")}</option>
                <option>{t("nav.cleaning")}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.message")}</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition resize-none" placeholder={t("jobPage.messagePlaceholder")} />
            </div>
            <button type="submit" className="w-full px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent-glow transition-colors">
              {t("jobPage.submitApplication")}
            </button>
          </form>
        </div>
      </section>

      <CTABanner title={t("jobPage.ctaTitle")} description={t("jobPage.ctaDesc")} buttonText={t("jobPage.ctaButton")} />
    </div>
  );
};

export default JobbaHosOssPage;