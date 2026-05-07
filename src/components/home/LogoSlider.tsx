import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
const INTERVAL = 5000;

const LogoSlider = () => {
  const { t } = useTranslation();
  const [startIndex, setStartIndex] = useState(0);

  const goNext = useCallback(() => {
    setStartIndex((prev) => (prev + 1) % partners.length);
  }, []);

  const goPrev = useCallback(() => {
    setStartIndex((prev) => (prev - 1 + partners.length) % partners.length);
  }, []);

  // Auto-advance on all viewports
  useEffect(() => {
    const timer = setInterval(goNext, INTERVAL);
    return () => clearInterval(timer);
  }, [goNext, startIndex]);

  const visibleDesktop = Array.from({ length: VISIBLE_DESKTOP }, (_, i) =>
    partners[(startIndex + i) % partners.length]
  );
  const current = partners[startIndex];

  return (
    <section className="bg-black py-8 overflow-hidden">
      <div className="container-wide">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/70 text-center mb-4">
          {t("logoSlider.trustedBy")}
        </p>

        {/* Desktop / tablet: 5 logos with arrows */}
        <div className="hidden min-[600px]:flex items-center justify-center gap-2">
          <button
            onClick={goPrev}
            className="text-white/70 hover:text-white transition-colors shrink-0 p-2"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 grid grid-cols-5 items-center">
            {visibleDesktop.map(({ name, logo }, i) => (
              <div key={`${name}-${i}`} className="flex items-center justify-center px-4">
                <img
                  src={logo}
                  alt={name}
                  className="logo-fade h-9 max-w-[130px] object-contain brightness-0 invert opacity-80"
                />
              </div>
            ))}
          </div>
          <button
            onClick={goNext}
            className="text-white/70 hover:text-white transition-colors shrink-0 p-2"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile: single logo + arrows */}
        <div className="min-[600px]:hidden flex items-center justify-center">
          <button
            onClick={goPrev}
            className="text-white/70 hover:text-white transition-colors shrink-0 p-2"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 flex items-center justify-center overflow-hidden min-h-[36px]">
            <img
              key={current.name}
              src={current.logo}
              alt={current.name}
              className="logo-fade h-9 max-w-[130px] object-contain brightness-0 invert opacity-80"
            />
          </div>
          <button
            onClick={goNext}
            className="text-white/70 hover:text-white transition-colors shrink-0 p-2"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
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
