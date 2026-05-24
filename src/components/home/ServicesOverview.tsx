import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Factory,
  Truck,
  HardHat,
  Briefcase,
  UtensilsCrossed,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRef, useState, useEffect } from "react";

type Service = {
  key: string;
  title: string;
  desc: string;
  Icon: LucideIcon;
  href: string;
};

const ServicesOverview = () => {
  const { t } = useTranslation();

  const services: Service[] = [
    {
      key: "industri",
      title: "Industri & produktion",
      desc: "Vi hjälper företag med kompetent personal inom industri, produktion, montering, maskinoperatörer, svetsare och andra praktiska yrkesroller.",
      Icon: Factory,
      href: "/kontakt",
    },
    {
      key: "lager",
      title: "Lager & logistik",
      desc: "Bemanning för lager, truck, orderplock, materialhantering, distribution och logistikflöden.",
      Icon: Truck,
      href: "/kontakt",
    },
    {
      key: "bygg",
      title: "Bygg & hantverk",
      desc: "Vi bemannar med yrkeskunnig personal inom bygg, snickeri, plattsättning och andra hantverksnära uppdrag.",
      Icon: HardHat,
      href: "/kontakt",
    },
    {
      key: "admin",
      title: "Administration",
      desc: "Stöd inom administrativa roller, kontor, kundservice och enklare tjänstemannauppdrag.",
      Icon: Briefcase,
      href: "/kontakt",
    },
    {
      key: "restaurang",
      title: "Restaurang & service",
      desc: "Personal till hotell, restaurang, kök, service och andra kundnära uppdrag.",
      Icon: UtensilsCrossed,
      href: "/kontakt",
    },
    {
      key: "vard",
      title: "Vård & omsorg",
      desc: "Bemanning inom vård och omsorg när verksamheter behöver trygg och pålitlig personal.",
      Icon: HeartPulse,
      href: "/kontakt",
    },
  ];

  const trackRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setGridVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setGridVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const slide = el.clientWidth;
      if (slide <= 0) return;
      const idx = Math.round(el.scrollLeft / slide);
      setActiveIndex(Math.max(0, Math.min(services.length - 1, idx)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [services.length]);

  const scrollToIndex = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const total = services.length;
    const wrapped = ((idx % total) + total) % total;
    el.scrollTo({ left: wrapped * el.clientWidth, behavior: "smooth" });
  };

  useEffect(() => {
    if (isPaused) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const slide = el.clientWidth;
      if (slide <= 0) return;
      const current = Math.round(el.scrollLeft / slide);
      const next = (current + 1) % services.length;
      el.scrollTo({ left: next * slide, behavior: "smooth" });
    }, 4000);
    return () => window.clearInterval(id);
  }, [isPaused, services.length]);

  const readMore = t("services.readMore", { defaultValue: "Läs mer" }).replace(/\s*→\s*$/, "");

  return (
    <section className="bg-background">
      <div style={{ backgroundColor: "#284953" }}>
        <div className="container-wide pt-20 pb-28 md:pt-28 md:pb-36">
          <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
            <p
              className="font-black mb-4 uppercase text-background"
              style={{ fontSize: "var(--h5-size)", letterSpacing: "var(--h5-track)" }}
            >
              <span className="text-brand">Våra</span> bemanningsområden
            </p>
            <h2
              className="font-black text-background leading-[1.05]"
              style={{ fontSize: "var(--h2-size)" }}
            >
              <span className="block font-bold uppercase">RÄTT PERSON</span>
              <span
                className="block italic font-normal normal-case"
                style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: "-0.01em" }}
              >
                på rätt plats
              </span>
            </h2>
            <p className="mt-5 text-background/60 text-base md:text-lg leading-relaxed normal-case">
              Vi hjälper lokala företag att snabbt hitta trygg och kompetent personal inom de områden där det behövs som mest.
            </p>
          </div>


          {/* Mobile carousel */}
          <div className="sm:hidden">
            <div
              ref={trackRef}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-4 px-4 gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              onPointerDown={() => setIsPaused(true)}
              onTouchStart={() => setIsPaused(true)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {services.map(({ key, title, desc, Icon, href }) => (
                <Link
                  key={key}
                  to={href}
                  aria-label={`${title} — ${readMore}`}
                  className="group relative shrink-0 w-full snap-center overflow-hidden bg-transparent flex flex-col transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[2px]"
                >
                  <div className="relative aspect-[2/1] overflow-hidden rounded-t-full bg-brand flex items-end justify-center pb-6">
                    <Icon className="w-12 h-12 text-white" strokeWidth={1.5} aria-hidden="true" />
                  </div>

                  <div className="p-5 flex flex-col gap-2 bg-background/5 ring-1 ring-background/10 rounded-[2px] backdrop-blur-sm">
                    <h3 className="font-display font-black text-background text-xl leading-tight">
                      {title}
                    </h3>
                    <p className="text-sm text-background/70 leading-relaxed normal-case line-clamp-3">
                      {desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-background mt-1">
                      {readMore}
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2" role="tablist">
              {services.map((s, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={s.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={s.title}
                    onClick={() => {
                      setIsPaused(true);
                      scrollToIndex(i);
                    }}
                    className={`rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-brand w-6 h-2"
                        : "bg-background/30 hover:bg-background/60 w-2 h-2"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Desktop / tablet grid: 3 columns × 2 rows */}
          <div ref={gridRef} className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {services.map(({ key, title, desc, Icon, href }, idx) => (
              <Link
                key={key}
                to={href}
                aria-label={`${title} — ${readMore}`}
                className={`group relative overflow-hidden bg-transparent flex flex-col h-full transition-all duration-700 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[2px] ${
                  gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: gridVisible ? `${idx * 100}ms` : "0ms",
                }}
              >
                <div className="relative aspect-[2/1] overflow-hidden rounded-t-full bg-brand flex items-end justify-center pb-6 md:pb-8 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                  <Icon className="w-14 h-14 md:w-16 md:h-16 text-white transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.5} aria-hidden="true" />
                </div>

                <div className="p-5 md:p-6 flex flex-col gap-2 bg-background/5 ring-1 ring-background/10 rounded-[2px] backdrop-blur-sm transition-colors duration-500 group-hover:bg-background/10 flex-1">
                  <h3 className="font-display font-black text-background text-xl md:text-2xl leading-tight">
                    {title}
                  </h3>
                  <p className="text-sm text-background/70 leading-relaxed normal-case line-clamp-3">
                    {desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-background mt-auto pt-2 transition-all duration-500 group-hover:gap-2.5 group-hover:text-brand">
                    <span className="relative">
                      {readMore}
                      <span
                        aria-hidden="true"
                        className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-brand transition-all duration-500"
                      />
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div aria-hidden style={{ lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="block w-full h-[clamp(60px,11vw,200px)]"
        >
          <path d="M0,0 Q720,260 1440,0 Z" fill="#284953" />
        </svg>
      </div>
    </section>
  );
};

export default ServicesOverview;
