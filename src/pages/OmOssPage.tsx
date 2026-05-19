import { Heart, Trophy, Users, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTABanner from "@/components/CTABanner";
import SEO from "@/components/SEO";
import heroImg from "@/assets/hero-about.jpg";
import teamVd from "@/assets/team-vd.jpg";
import teamBemanning from "@/assets/team-bemanning.jpg";
import teamKandidat from "@/assets/team-kandidat.jpg";
import teamGroup from "@/assets/team-bemanning.png";

const OmOssPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <SEO pageKey="about" />
      <PageHero kicker={t("aboutPage.kicker")} title={t("aboutPage.title")} description={t("aboutPage.desc")} image={teamGroup} imagePosition="center 30%" />

      <section className="section-padding bg-background">
        <div className="container-wide">
          <SectionHeading kicker={t("aboutPage.storyKicker")} title={t("aboutPage.storyTitle")} align="left" />
          <div className="space-y-4 text-muted-foreground leading-relaxed -mt-8">
            <p>{t("aboutPage.storyP1")}</p>
            <p>{t("aboutPage.storyP2")}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <SectionHeading kicker={t("aboutPage.visionKicker")} title={t("aboutPage.visionTitle")} align="left" />
          <p className="text-muted-foreground leading-relaxed text-lg -mt-8">{t("aboutPage.visionDesc")}</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide">
          <SectionHeading kicker={t("aboutPage.valuesKicker")} title={t("aboutPage.valuesTitle")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { key: "v1", icon: <Heart className="w-6 h-6" /> },
              { key: "v2", icon: <Trophy className="w-6 h-6" /> },
              { key: "v3", icon: <Users className="w-6 h-6" /> },
              { key: "v4", icon: <ShieldCheck className="w-6 h-6" /> },
            ].map((v) => (
              <div key={v.key} className="bg-card border border-border rounded-xl p-6">
                <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center mb-4">{v.icon}</div>
                <h3 className="font-display font-semibold text-foreground mb-2">{t(`aboutPage.${v.key}.title`)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(`aboutPage.${v.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-warm">
        <div className="container-wide">
          <SectionHeading kicker={t("aboutPage.teamKicker")} title={t("aboutPage.teamTitle")} />
          <div className="rounded-[2px] overflow-hidden mb-12 -mt-4">
            <img
              src={teamGroup}
              alt={t("aboutPage.teamTitle")}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { nameKey: "nameCeo", roleKey: "roleCeo", image: teamVd },
              { nameKey: "nameHr", roleKey: "roleStaffing", image: teamBemanning },
              { nameKey: "nameTeamlead", roleKey: "roleCandidate", image: teamKandidat },
            ].map((m, i) => (
              <div key={i} className="text-center">
                <div className="w-40 h-40 rounded-full mx-auto mb-5 bg-muted overflow-hidden">
                  <img
                    src={m.image}
                    alt={t(`aboutPage.${m.nameKey}`)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display font-semibold text-foreground">{t(`aboutPage.${m.nameKey}`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`aboutPage.${m.roleKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
};

export default OmOssPage;