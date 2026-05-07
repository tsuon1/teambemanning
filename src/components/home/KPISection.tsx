import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

const KPICard = ({
  kpi,
}: {
  kpi: { value: string; title: string; desc: string; pct: number };
}) => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`kpi-card bg-background border border-border rounded-2xl p-8 text-center ${
        inView ? "is-visible" : ""
      }`}
    >
      <div className="text-foreground font-black text-[clamp(3.2rem,4vw+1rem,4.2rem)] leading-none mb-3">
        {kpi.value}
      </div>
      <h3 className="text-sm font-bold text-foreground tracking-wide mb-1.5 normal-case">
        {kpi.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-6 normal-case">{kpi.desc}</p>
      <div className="h-1.5 bg-border overflow-hidden">
        <div
          className="kpi-bar h-full bg-brand"
          style={{ ["--target" as string]: `${kpi.pct * 100}%` } as React.CSSProperties}
        />
      </div>
    </article>
  );
};

const KPISection = () => {
  const { t } = useTranslation();
  const kpis = [
    { value: t("kpi.k1.value"), title: t("kpi.k1.title"), desc: t("kpi.k1.desc"), pct: 0.78 },
    { value: t("kpi.k2.value"), title: t("kpi.k2.title"), desc: t("kpi.k2.desc"), pct: 0.26 },
    { value: t("kpi.k3.value"), title: t("kpi.k3.title"), desc: t("kpi.k3.desc"), pct: 0.20 },
  ];

  return (
    <section className="bg-secondary" style={{ paddingBlock: "clamp(72px, 7vw, 140px)" }}>
      <div className="container-wide">
        <div className="text-center" style={{ marginBottom: "clamp(26px, 3vw, 40px)" }}>
          <p
            className="font-black text-muted-foreground mb-3 uppercase"
            style={{ fontSize: "var(--h5-size)", letterSpacing: "var(--h5-track)" }}
          >
            {t("kpi.kicker")}
          </p>
          <h2
            className="font-black text-foreground uppercase"
            style={{ fontSize: "var(--h2-size)", lineHeight: "1.1" }}
          >
            {t("kpi.title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
          {kpis.map((kpi) => (
            <KPICard key={kpi.title} kpi={kpi} />
          ))}
        </div>
      </div>

      <style>{`
        .kpi-card { opacity: 1; transform: none; }
        .kpi-card.js-ready:not(.is-visible) {
          opacity: 0;
          transform: translateY(20px);
        }
        .kpi-card.is-visible {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        /* Progress bar: visible at full width by default (SSR-safe) */
        .kpi-bar { width: var(--target, 0%); }
        .kpi-card.js-ready:not(.is-visible) .kpi-bar { width: 0%; }
        .kpi-card.is-visible .kpi-bar {
          width: var(--target, 0%);
          transition: width 0.9s cubic-bezier(0.2, 0.9, 0.2, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          .kpi-card { opacity: 1 !important; transform: none !important; transition: none !important; }
          .kpi-bar { width: var(--target, 0%) !important; transition: none !important; }
        }
      `}</style>

      <script
        dangerouslySetInnerHTML={{
          __html: `document.querySelectorAll('.kpi-card').forEach(function(el){el.classList.add('js-ready');});`,
        }}
      />
    </section>
  );
};

export default KPISection;
