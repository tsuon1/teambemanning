import { Link } from "react-router-dom";
import { useRef, useState, useEffect, type SVGProps } from "react";

type IconCmp = (props: SVGProps<SVGSVGElement>) => JSX.Element;

// Shared sharp/angular SVG defaults: square caps, miter joins, thin stroke
const baseSvg = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
};

// Angular factory: stepped roofline + chimney
const FactoryAngular: IconCmp = (p) => (
  <svg {...baseSvg} {...p}>
    <path d="M3 21 V11 L9 14 V11 L15 14 V8 L21 8 V21 Z" />
    <path d="M17 4 H20 V8" />
    <path d="M7 17 H9 M12 17 H14 M17 17 H19" />
  </svg>
);

// Angular truck: boxy cab + container
const TruckAngular: IconCmp = (p) => (
  <svg {...baseSvg} {...p}>
    <path d="M2 6 H15 V17 H2 Z" />
    <path d="M15 9 H19 L22 12 V17 H15 Z" />
    <circle cx="6.5" cy="18.5" r="1.5" />
    <circle cx="17.5" cy="18.5" r="1.5" />
  </svg>
);

// Angular hard hat: trapezoid dome + flat brim
const HardHatAngular: IconCmp = (p) => (
  <svg {...baseSvg} {...p}>
    <path d="M6 14 V10 L9 6 H15 L18 10 V14 Z" />
    <path d="M3 14 H21 V17 H3 Z" />
    <path d="M12 6 V14" />
  </svg>
);

// Briefcase – squared
const BriefcaseAngular: IconCmp = (p) => (
  <svg {...baseSvg} {...p}>
    <path d="M3 8 H21 V20 H3 Z" />
    <path d="M9 8 V5 H15 V8" />
    <path d="M3 13 H21" />
  </svg>
);

// Service – chef hat / fork+knife geometric
const ServiceAngular: IconCmp = (p) => (
  <svg {...baseSvg} {...p}>
    <path d="M8 3 V13" />
    <path d="M6 3 V7 H10 V3" />
    <path d="M8 13 L8 21" />
    <path d="M16 3 V13 H18 V21" />
    <path d="M16 13 H18" />
  </svg>
);

// Care – angular cross + heart (diamond)
const CareAngular: IconCmp = (p) => (
  <svg {...baseSvg} {...p}>
    <path d="M12 4 L20 12 L12 20 L4 12 Z" />
    <path d="M12 8 V16" />
    <path d="M8 12 H16" />
  </svg>
);

type Service = {
  key: string;
  title: string;
  desc: string;
  Icon: IconCmp;
  href: string;
};

const ServicesOverview = () => {


  const services: Service[] = [
    {
      key: "industri",
      title: "Industri",
      desc: "Vi hjälper företag med kompetent personal inom industri, produktion, montering, maskinoperatörer, svetsare och andra praktiska yrkesroller.",
      Icon: Factory,
      href: "/kontakt",
    },
    {
      key: "lager",
      title: "Logistik",
      desc: "Bemanning för lager, truck, orderplock, materialhantering, distribution och logistikflöden.",
      Icon: Truck,
      href: "/kontakt",
    },
    {
      key: "bygg",
      title: "Bygg",
      desc: "Vi bemannar med yrkeskunnig personal inom bygg, snickeri, plattsättning och andra hantverksnära uppdrag.",
      Icon: HardHat,
      href: "/kontakt",
    },
    {
      key: "admin",
      title: "Kontor",
      desc: "Stöd inom administrativa roller, kontor, kundservice och enklare tjänstemannauppdrag.",
      Icon: Briefcase,
      href: "/kontakt",
    },
    {
      key: "restaurang",
      title: "Service",
      desc: "Personal till hotell, restaurang, kök, service och andra kundnära uppdrag.",
      Icon: UtensilsCrossed,
      href: "/kontakt",
    },
    {
      key: "vard",
      title: "Vård",
      desc: "Bemanning inom vård och omsorg när verksamheter behöver trygg och pålitlig personal.",
      Icon: HeartPulse,
      href: "/kontakt",
    },
  ];

  const gridRef = useRef<HTMLDivElement | null>(null);
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
            {services.map(({ key, title, Icon, href }, idx) => {
              const isIndustry = key === "industri";
              return (
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
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isIndustry
                      ? "bg-background/10 border border-brand/40 group-hover:bg-brand/20 group-hover:border-brand/70"
                      : "border border-background/20 group-hover:border-brand/40 group-hover:bg-brand/10"
                  }`}>
                    <Icon
                      className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 ${
                        isIndustry
                          ? "text-brand group-hover:text-brand"
                          : "text-background/70 group-hover:text-brand"
                      }`}
                      strokeWidth={1}
                      aria-hidden="true"
                    />
                  </div>
                  <span className={`text-[11px] md:text-xs font-medium leading-tight transition-colors duration-300 ${
                    isIndustry
                      ? "text-background/90 group-hover:text-background"
                      : "text-background/60 group-hover:text-background/90"
                  }`}>
                    {title}
                  </span>
                </Link>
              );
            })}
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
