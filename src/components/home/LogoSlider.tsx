import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import logoDhl from "@/assets/logo-dhl.png";
import logoTransgund from "@/assets/logo-trangsund.png";
import logoLofgren from "@/assets/logo-lofgren.png";

const partners = [
  { name: "DHL", logo: logoDhl },
  { name: "Löfgren Transport", logo: logoLofgren },
  { name: "Trängsunds Åkeri", logo: logoTransgund },
];

const INTERVAL = 5000;

const LogoSlider = () => {
  const { t } = useTranslation();
  const [startIndex, setStartIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const goNext = useCallback(() => {
    setStartIndex((prev) => (prev + 1) % partners.length);
  }, []);

  const goPrev = useCallback(() => {
    setStartIndex((prev) => (prev - 1 + partners.length) % partners.length);
  }, []);

  // Auto-advance only on mobile, only after mount.
  useEffect(() => {
    if (!mounted) return;
    const mq = window.matchMedia("(max-width: 599px)");
    if (!mq.matches) return;
    const timer = setInterval(goNext, INTERVAL);
    return () => clearInterval(timer);
  }, [goNext, mounted, startIndex]);

  const current = partners[startIndex];

  return (
    <section className="bg-black py-8 overflow-hidden">
      <div className="container-wide">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/70 text-center mb-4">
          {t("logoSlider.trustedBy")}
        </p>

        {/* Desktop / tablet: show all logos in a grid (default, SSR-visible) */}
        <div className="hidden min-[600px]:grid grid-cols-3 items-center">
          {partners.map(({ name, logo }) => (
            <div key={name} className="flex items-center justify-center px-4">
              <img
                src={logo}
                alt={name}
                className="h-9 max-w-[130px] object-contain brightness-0 invert opacity-80"
              />
            </div>
          ))}
        </div>

        {/* Mobile: single logo + arrows (CSS-only fade between active logo) */}
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
