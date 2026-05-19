import { Link } from "react-router-dom";
import { ArrowUpRight, Zap, ShieldCheck, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-home.png";

const HeroSection = () => {
  const { t } = useTranslation();

  const trustPoints = [
    { icon: Zap, label: "Snabb tillsättning" },
    { icon: ShieldCheck, label: "Kvalitetssäkrad personal" },
    { icon: RefreshCw, label: "Kontinuerlig uppföljning" },
  ];

  return (
    <section className="relative min-h-[88vh] md:min-h-screen overflow-hidden bg-secondary">
      <link rel="preload" as="image" href={heroImage} />
      <img
        src={heroImage}
        alt=""
        fetchPriority="high"
        decoding="sync"
        className="absolute inset-0 w-full h-full object-cover object-[72%_25%] md:object-[68%_22%] hero-img-fade"
        style={{ filter: "brightness(1.05) contrast(1.02)" }}
      />
      {/* Dark gradient overlay — stronger on the left for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 md:bg-none" />

      <div className="relative z-10 min-h-[88vh] md:min-h-screen flex flex-col container-wide">
        <div className="flex-1 flex items-center pt-[120px] pb-[80px] md:pt-[140px] md:pb-[100px]">
          <div className="max-w-[680px] hero-content-in">
            <h1
              className="text-white mb-8 font-bold normal-case"
              style={{
                fontSize: 'var(--h1-size)',
                lineHeight: 1.08,
                letterSpacing: '-0.015em',
                textShadow: '0 2px 12px rgba(0,0,0,0.4)',
              }}
            >
              <span className="block uppercase">Rätt personal.</span>
              <span className="block text-white/85 font-normal normal-case mt-2" style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: '-0.01em' }}>
                När arbetet inte får stanna.
              </span>
            </h1>

            <p
              className="text-white/75 font-normal mb-10 normal-case max-w-[580px]"
              style={{ fontSize: 'var(--p-size)', lineHeight: 1.65 }}
            >
              Vi hjälper företag inom industri, lager, bygg, administration, restaurang och vård &amp; omsorg att snabbt hitta pålitlig personal — med rätt kompetens, tydlig uppföljning och trygg leverans.
            </p>

            <div className="flex flex-wrap items-end gap-x-7 gap-y-4 mb-10">
              <div className="flex flex-col items-center">
                <p
                  className="text-white/90 font-semibold uppercase mb-3 tracking-[0.18em] inline-flex items-center"
                  style={{ fontSize: 'var(--h5-size)' }}
                >
                  <span className="inline-block w-6 h-px bg-brand mr-2" />
                  <span className="text-brand">HITTA</span>
                  <span className="inline-block w-6 h-px bg-brand ml-2" />
                </p>
                <Link
                  to="/kontakt"
                  className="inline-flex items-center gap-2 bg-brand text-white font-semibold text-sm px-[30px] py-[17px] rounded-none hover:scale-[1.03] hover:shadow-[0_10px_30px_-8px_hsl(var(--brand)/0.6)] transition-all"
                >
                  Kontakta oss <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <Link
                to="/tjanster"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white/85 hover:text-white underline underline-offset-[6px] decoration-white/30 hover:decoration-brand transition-colors normal-case pb-[18px]"
              >
                Se våra tjänster <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust points */}
            <div className="pt-7 border-t border-white/15">
              <ul className="flex flex-wrap gap-x-7 gap-y-3">
                {trustPoints.map(({ icon: Icon, label }) => (
                  <li key={label} className="inline-flex items-center gap-2 text-white/80 text-[13px] font-medium normal-case">
                    <Icon className="w-4 h-4 text-brand shrink-0" strokeWidth={2.25} />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroImgFade {
          from { opacity: 0; transform: scale(1.04); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes heroContentIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-img-fade {
          opacity: 1;
          animation: heroImgFade 1.4s ease-out both;
        }
        .hero-content-in > * {
          opacity: 0;
          animation: heroContentIn 0.7s cubic-bezier(0.25, 0.1, 0.25, 1) both;
        }
        .hero-content-in > *:nth-child(1) { animation-delay: 0.15s; }
        .hero-content-in > *:nth-child(2) { animation-delay: 0.28s; }
        .hero-content-in > *:nth-child(3) { animation-delay: 0.40s; }
        .hero-content-in > *:nth-child(4) { animation-delay: 0.52s; }
        .hero-content-in > *:nth-child(5) { animation-delay: 0.64s; }
        @media (prefers-reduced-motion: reduce) {
          .hero-img-fade, .hero-content-in > * { animation: none; opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
