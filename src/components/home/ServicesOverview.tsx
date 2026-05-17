import { Link, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  Truck,
  HardHat,
  Package,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRef, useState, useEffect } from "react";
import transportImg from "@/assets/service-transport.png";
import logistikImg from "@/assets/service-logistik.png";
import industriImg from "@/assets/service-industri.png";
import lokalvardImg from "@/assets/service-lokalvard.png";
import {
  ROUTES,
  PageKey,
  LangCode,
  resolveRoute,
  detectLangFromPath,
} from "@/i18n/routes";

const ServicesOverview = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const lang: LangCode =
    resolveRoute(location.pathname)?.lang ?? detectLangFromPath(location.pathname);

  // Each card is a premium link card. URLs come from the language-aware
  // route map so EN and RO visitors land on the matching localized page.
  const services: {
    transKey: string;
    pageKey: PageKey;
    image: string;
    Icon: LucideIcon;
  }[] = [
    { transKey: "transport",  pageKey: "transport",  image: transportImg, Icon: Truck },
    { transKey: "industry",   pageKey: "industry",   image: industriImg, Icon: HardHat },
    { transKey: "logistics",  pageKey: "logistics",  image: logistikImg, Icon: Package },
    { transKey: "cleaning",   pageKey: "cleaning",   image: lokalvardImg, Icon: Sparkles },
  ];

  // Mobile carousel: track which card is currently in view, plus
  // arrow + bullet controls to step through the four service cards.
  const trackRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);

  // Reveal desktop/tablet grid cards in sync when the section scrolls
  // into view. Uses IntersectionObserver with a small threshold so the
  // animation triggers just as the section enters the viewport.
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

  // Update the active bullet as the user swipes/scrolls horizontally.
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
    // Wrap around for autoplay (and clamp manual nav via min/max in callers)
    const total = services.length;
    const wrapped = ((idx % total) + total) % total;
    el.scrollTo({ left: wrapped * el.clientWidth, behavior: "smooth" });
  };

  // Autoscroll the mobile carousel every 4s, pause on user interaction
  // and respect prefers-reduced-motion.
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

  return (
    <section className="bg-background">
      <div style={{ backgroundColor: "#1f3a40" }}>
        <div className="container-wide pt-20 pb-28 md:pt-28 md:pb-36">
        {/* Section header — kicker, headline, supporting intro */}
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <p
            className="font-black text-background/50 mb-4 uppercase"
            style={{ fontSize: "var(--h5-size)", letterSpacing: "var(--h5-track)" }}
          >
            {t("services.kicker")}
          </p>
          <h2
            className="font-black text-background leading-tight"
            style={{ fontSize: "var(--h2-size)" }}
          >
            {t("services.title")}
          </h2>
          <p className="mt-5 text-background/60 text-base md:text-lg leading-relaxed normal-case">
            {t("services.intro")}
          </p>
        </div>

        {/* Mobile carousel (one card at a time) with arrows + bullets.
            Hidden from sm and up where the grid takes over. */}
        <div className="sm:hidden">
          <div
            ref={trackRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-4 px-4 gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onPointerDown={() => setIsPaused(true)}
            onTouchStart={() => setIsPaused(true)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {services.map((service) => {
              const href = ROUTES[service.pageKey][lang];
              const title = t(`services.${service.transKey}.title`);
              const desc = t(`services.${service.transKey}.desc`);
              return (
                <Link
                  key={service.transKey}
                  to={href}
                  aria-label={`${title} — ${t("services.readMore")}`}
                  className="group relative shrink-0 w-full snap-center overflow-hidden bg-transparent flex flex-col transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md"
                >
                  <div className="relative aspect-square overflow-hidden bg-transparent rounded-t-[12px]">
                    <img
                      src={service.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2 bg-background/5 ring-1 ring-background/10 rounded-lg backdrop-blur-sm">
                    <h3 className="font-display font-black text-background text-xl leading-tight">
                      {title}
                    </h3>
                    <p className="text-sm text-background/70 leading-relaxed normal-case line-clamp-3">
                      {desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-background mt-1">
                      {t("services.readMore").replace(/\s*→\s*$/, "")}
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bullet pagination — one dot per service. */}
          <div className="mt-6 flex items-center justify-center gap-2" role="tablist">
            {services.map((service, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={service.transKey}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={t(`services.${service.transKey}.title`)}
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

        {/* Desktop / tablet grid:
            - sm (≥640px):  2×2 grid
            - xl (≥1280px): 4 across */}
        <div ref={gridRef} className="hidden sm:grid grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
          {services.map((service, idx) => {
            const href = ROUTES[service.pageKey][lang];
            const title = t(`services.${service.transKey}.title`);
            const desc = t(`services.${service.transKey}.desc`);

            return (
              <Link
                key={service.transKey}
                to={href}
                aria-label={`${title} — ${t("services.readMore")}`}
                className={`group relative overflow-hidden bg-transparent flex flex-col h-full transition-all duration-700 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md ${
                  gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: gridVisible ? `${idx * 120}ms` : "0ms",
                }}
              >
                {/* Illustration area — white background lets the line art breathe */}
                <div className="relative aspect-square overflow-hidden bg-transparent rounded-t-[12px]">
                  <img
                    src={service.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>

                {/* Text block below illustration */}
                <div className="p-5 md:p-6 flex flex-col gap-2 bg-background/5 ring-1 ring-background/10 rounded-lg backdrop-blur-sm transition-colors duration-500 group-hover:bg-background/10 flex-1">
                  <h3 className="font-display font-black text-background text-xl md:text-2xl leading-tight">
                    {title}
                  </h3>
                  <p className="text-sm text-background/70 leading-relaxed normal-case line-clamp-3">
                    {desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-background mt-auto pt-2 transition-all duration-500 group-hover:gap-2.5 group-hover:text-brand">
                    <span className="relative">
                      {t("services.readMore").replace(/\s*→\s*$/, "")}
                      <span
                        aria-hidden="true"
                        className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-brand transition-all duration-500"
                      />
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      </div>

      {/* Dome bottom — same downward arch as How It Works, gray surface-muted color */}
      <div aria-hidden style={{ lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="block w-full h-[clamp(60px,11vw,200px)]"
        >
          <path d="M0,0 Q720,260 1440,0 Z" fill="#1f3a40" />
        </svg>
      </div>
    </section>
  );
};

export default ServicesOverview;