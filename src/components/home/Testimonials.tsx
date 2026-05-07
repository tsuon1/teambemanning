import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

const TestimonialCard = ({
  item,
  index,
}: {
  item: { quote: string; name: string; role: string; company: string; stars: number };
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
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
      { rootMargin: "-60px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`testi-card bg-card border border-border rounded-xl p-8 flex flex-col ${
        inView ? "is-visible" : ""
      }`}
      style={{ ["--delay" as string]: `${index * 0.1}s` } as React.CSSProperties}
    >
      <div className="flex gap-1 mb-5">
        {Array.from({ length: 5 }).map((_, j) => (
          <Star
            key={j}
            className={`w-4 h-4 ${j < item.stars ? "fill-brand text-brand" : "text-border fill-none"}`}
          />
        ))}
      </div>
      <p
        className="text-muted-foreground mb-8 flex-1 normal-case"
        style={{ fontSize: "var(--p-size)", lineHeight: "var(--p-line)" }}
      >
        "{item.quote}"
      </p>
      <div className="border-t border-border pt-5">
        <p className="font-display font-semibold text-foreground text-sm">{item.name}</p>
        <p className="text-muted-foreground text-xs mt-0.5">
          {item.role ? `${item.role}, ${item.company}` : item.company}
        </p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { t } = useTranslation();
  const testimonials = [1, 2, 3].map((n) => ({
    quote: t(`testimonials.t${n}.quote`),
    name: t(`testimonials.t${n}.name`),
    role: t(`testimonials.t${n}.role`),
    company: t(`testimonials.t${n}.company`),
    stars: n === 2 ? 4 : 5,
  }));

  return (
    <section className="bg-background text-foreground" style={{ paddingBlock: "var(--section-pad)" }}>
      <div className="container-wide">
        <div className="text-center" style={{ marginBottom: "clamp(32px, 4vw, 64px)" }}>
          <p
            className="font-black text-brand mb-3 uppercase"
            style={{ fontSize: "var(--h5-size)", letterSpacing: "var(--h5-track)" }}
          >
            {t("testimonials.kicker")}
          </p>
          <h2 className="font-black text-foreground" style={{ fontSize: "var(--h2-size)" }}>
            {t("testimonials.title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, i) => (
            <TestimonialCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .testi-card { opacity: 1; transform: none; }
        .testi-card.js-ready:not(.is-visible) {
          opacity: 0;
          transform: translateY(30px);
        }
        .testi-card.is-visible {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.5s ease, transform 0.5s ease;
          transition-delay: var(--delay, 0s);
        }
        @media (prefers-reduced-motion: reduce) {
          .testi-card { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}</style>

      <script
        dangerouslySetInnerHTML={{
          __html: `document.querySelectorAll('.testi-card').forEach(function(el){el.classList.add('js-ready');});`,
        }}
      />
    </section>
  );
};

export default Testimonials;
