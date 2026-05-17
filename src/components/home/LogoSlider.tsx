import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import logoAxelent from "@/assets/logo-axelent.png";
import logoSporda from "@/assets/logo-sporda.png";
import logoHexagon from "@/assets/logo-hexagon.png";
import logoFixstud from "@/assets/logo-fixstud.png";
import logoImage7 from "@/assets/logo-image7.png";
import logoVarnamo from "@/assets/logo-varnamo.png";

const partners = [
  { name: "Axelent", logo: logoAxelent },
  { name: "Sporda Nonwoven", logo: logoSporda },
  { name: "Hexagon", logo: logoHexagon },
  { name: "Fix & Stud AB", logo: logoFixstud },
  { name: "Partner", logo: logoImage7 },
  { name: "Värnamo of Sweden", logo: logoVarnamo },
];

const VISIBLE_DESKTOP = 5;
const VISIBLE_TABLET = 3;
const INTERVAL = 5000;

const LogoSlider = () => {
  const { t } = useTranslation();
  const [startIndex, setStartIndex] = useState(0);

  const goNext = useCallback(() => {
    setStartIndex((prev) => (prev + 1) % partners.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(goNext, INTERVAL);
    return () => clearInterval(timer);
  }, [goNext, startIndex]);

  const visibleDesktop = Array.from({ length: VISIBLE_DESKTOP }, (_, i) =>
    partners[(startIndex + i) % partners.length]
  );
  const visibleTablet = Array.from({ length: VISIBLE_TABLET }, (_, i) =>
    partners[(startIndex + i) % partners.length]
  );
  const current = partners[startIndex];

  return (
    <section className="py-8 overflow-hidden" style={{ backgroundColor: "#192e33" }}>
      <div className="container-wide">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/70 text-center mb-4">
          {t("logoSlider.trustedBy")}
        </p>

        {/* Desktop: 5 logos */}
        <div className="hidden lg:flex items-center justify-between">
          {visibleDesktop.map(({ name, logo }, i) => (
            <img
              key={`${name}-${i}`}
              src={logo}
              alt={name}
              className="logo-fade h-9 max-w-[130px] object-contain brightness-0 invert opacity-80"
            />
          ))}
        </div>

        {/* Tablet: 3 logos */}
        <div className="hidden min-[600px]:flex lg:hidden items-center justify-between">
          {visibleTablet.map(({ name, logo }, i) => (
            <img
              key={`${name}-${i}`}
              src={logo}
              alt={name}
              className="logo-fade h-9 max-w-[130px] object-contain brightness-0 invert opacity-80"
            />
          ))}
        </div>

        {/* Mobile: single logo */}
        <div className="min-[600px]:hidden flex items-center justify-center overflow-hidden min-h-[36px]">
          <img
            key={current.name}
            src={current.logo}
            alt={current.name}
            className="logo-fade h-9 max-w-[130px] object-contain brightness-0 invert opacity-80"
          />
        </div>
      </div>

      <style>{`
        @keyframes logoFadeIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 0.8; transform: translateX(0); }
        }
        .logo-fade {
          animation: logoFadeIn 0.5s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-fade { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default LogoSlider;
