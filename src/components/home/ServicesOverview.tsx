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
import transportImg from "@/assets/service-transport.jpg";
import logistikImg from "@/assets/service-logistik.jpg";
import industriImg from "@/assets/service-industri.jpg";
import lokalvardImg from "@/assets/service-lokalvard.jpg";
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
    <section className="bg-foreground">
      <div className="container-wide pt-20 pb-12 md:pt-28 md:pb-16">
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
                  className="group relative shrink-0 w-full snap-center overflow-hidden ring-1 ring-background/30 shadow-[0_0_20px_-8px_hsl(0_0%_100%/0.08)] transition-all duration-500 hover:shadow-[0_0_20px_-8px_hsl(var(--brand)/0.35)] hover:ring-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  style={{ borderRadius: "5px" }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden" style={{ borderRadius: "5px" }}>
                    <img
                      src={service.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-3">
                      <h3 className="font-display font-black text-white text-xl leading-tight">
                        {title}
                      </h3>
                      <p className="text-sm text-white/75 leading-relaxed normal-case line-clamp-3">
                        {desc}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white mt-1">
                        {t("services.readMore").replace(/\s*→\s*$/, "")}
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Static icon tabs below the image — one per service category.
              The active category is highlighted in orange. */}
          <div className="mt-5 px-6 flex items-center justify-between" role="tablist">
            {services.map((service, i) => {
              const isActive = i === activeIndex;
              const Icon = service.Icon;
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
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 ${
                    isActive
                      ? "bg-brand text-foreground ring-2 ring-brand shadow-[0_0_0_4px_hsl(var(--brand)/0.25)]"
                      : "ring-1 ring-background/30 text-background/60 hover:text-background hover:ring-background/60"
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.25 : 2} />
                </button>
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
                className={`group relative overflow-hidden ring-1 ring-background/30 bg-background/[0.02] shadow-[0_0_20px_-8px_hsl(0_0%_100%/0.08)] transition-all duration-700 ease-out hover:shadow-[0_0_20px_-8px_hsl(var(--brand)/0.35)] hover:ring-accent hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  borderRadius: "5px",
                  transitionDelay: gridVisible ? `${idx * 120}ms` : "0ms",
                }}
              >
                {/* Fixed-aspect media so all 4 cards share identical proportions */}
                <div className="relative aspect-[5/6] xl:aspect-[3/4] overflow-hidden" style={{ borderRadius: "5px" }}>
                  <img
                    src={service.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  {/* Premium dark gradient overlay — stronger at the bottom for
                      readability, lighter on hover for image emphasis. */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15 transition-opacity duration-500 group-hover:opacity-80"
                  />
                  {/* Subtle accent edge that brightens on hover */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  {/* Bottom-aligned content area — same on every card */}
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col gap-3">
                    <h3 className="font-display font-black text-white text-xl md:text-2xl leading-tight">
                      {title}
                    </h3>
                    <p className="text-sm text-white/75 leading-relaxed normal-case line-clamp-3">
                      {desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white mt-1 transition-all duration-500 opacity-90 group-hover:opacity-100 translate-y-0 group-hover:gap-2.5">
                      <span className="relative">
                        {t("services.readMore").replace(/\s*→\s*$/, "")}
                        <span
                          aria-hidden="true"
                          className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full"
                        />
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-white transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;