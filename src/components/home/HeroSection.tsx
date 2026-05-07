import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-home.jpg";

const HeroSection = () => {
  const { t } = useTranslation();

  const kickerText = t("hero.kicker");
  const kickerWords = kickerText.split(" ");
  const kickerFirst = kickerWords[0];
  const kickerRest = kickerWords.slice(1).join(" ");

  return (
    <section className="relative min-h-[70vh] md:min-h-[88vh] overflow-hidden bg-secondary">
      <link rel="preload" as="image" href={heroImage} />
      <img
        src={heroImage}
        alt=""
        fetchPriority="high"
        decoding="sync"
        className="absolute inset-0 w-full h-full object-cover object-[95%_100%] hero-img-fade"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />

      <div className="relative z-10 min-h-[70vh] md:min-h-[88vh] flex flex-col container-wide">
        <div className="flex-1 flex items-center pt-[96px] pb-[12vh] md:pb-[calc(12vh+120px)] lg:pb-[calc(12vh+160px)]">
          <div className="max-w-[760px] lg:max-w-[760px] md:max-w-[55%] hero-content-in">
            <p
              className="text-white font-black uppercase mb-4"
              style={{ fontSize: 'var(--h5-size)', letterSpacing: 'var(--h5-track)' }}
            >
              <span className="text-brand">{kickerFirst}</span>
              {kickerRest ? ` ${kickerRest}` : ""}
            </p>

            <h1
              className="font-black text-white mb-[18px]"
              style={{
                fontSize: 'var(--h1-size)',
                lineHeight: 'var(--h1-line)',
                textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              }}
            >
              <span className="max-[545px]:hidden whitespace-pre-line">{t("hero.title")}</span>
              <span className="hidden max-[545px]:block whitespace-pre-line">
                KOMPETENS{"\n"}FÖR VARJE{"\n"}BEHOV
              </span>
            </h1>

            <p
              className="text-white/70 font-medium mb-7 lg:max-w-[560px] normal-case"
              style={{ fontSize: 'var(--p-size)', lineHeight: 'var(--p-line)' }}
            >
              <span className="lg:hidden">
                Vi hjälper företag inom<br />
                transport, logistik, industri och<br />
                lokalvård att snabbt hitta rätt kompetens.
              </span>
              <span className="hidden lg:inline">{t("hero.desc")}</span>
            </p>

            <div className="flex items-center gap-6">
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 bg-brand text-white font-medium text-sm px-[29px] py-[16px] rounded-full hover:scale-105 transition-transform"
              >
                {t("hero.cta")} <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/jobba-hos-oss"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white underline underline-offset-4 transition-colors normal-case"
              >
              {t("hero.link")} <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroImgFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes heroContentIn {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .hero-img-fade {
          opacity: 1;
          animation: heroImgFade 1.2s ease-out both;
        }
        .hero-content-in {
          opacity: 1;
          animation: heroContentIn 0.7s cubic-bezier(0.25, 0.1, 0.25, 1) both;
          animation-delay: 0.1s;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-img-fade, .hero-content-in {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
