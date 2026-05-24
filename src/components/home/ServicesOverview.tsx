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


          <div
            ref={gridRef}
            className="grid grid-cols-3 sm:grid-cols-6 gap-x-4 gap-y-8 md:gap-x-6"
          >
            {services.map(({ key, title, Icon, href }, idx) => (
              <Link
                key={key}
                to={href}
                aria-label={title}
                className={`group flex flex-col items-center text-center gap-3 transition-all duration-700 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[2px] ${
                  gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: gridVisible ? `${idx * 60}ms` : "0ms",
                }}
              >
                <Icon
                  className="w-8 h-8 md:w-9 md:h-9 text-background/80 transition-colors duration-300 group-hover:text-brand"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span className="text-xs md:text-sm font-medium text-background/80 leading-tight transition-colors duration-300 group-hover:text-background">
                  {title}
                </span>
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
