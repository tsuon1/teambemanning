import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRef, useEffect, useState } from "react";
import illustBehovsanalys from "@/assets/illust-behovsanalys.png";
import illustMatchning from "@/assets/illust-matchning.svg";
import illustIntroduktion from "@/assets/illust-introduktion.svg";
import illustUppfoljning from "@/assets/illust-uppfoljning.svg";

const images = [illustBehovsanalys, illustMatchning, illustIntroduktion, illustUppfoljning];
const directions = ["right", "left", "right", "left"] as const;

// Subtle, premium typewriter — ~20ms/char with a fast cap so long copy
// finishes inside the slide-in window and stays in sync across steps.
const TYPE_SPEED_MS = 20;
const TYPE_MAX_MS = 900;

const Typewriter = ({
  text,
  start,
  baseDelayMs = 0,
  className,
  style,
  as: Tag = "span",
}: {
  text: string;
  start: boolean;
  baseDelayMs?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) {
      setCount(0);
      return;
    }
    if (typeof window !== "undefined") {
      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        setCount(text.length);
        return;
      }
    }
    let raf = 0;
    let startTs = 0;
    const total = text.length;
    if (total === 0) return;
    // Clamp per-char speed so very long strings still finish quickly.
    const speed = Math.min(TYPE_SPEED_MS, TYPE_MAX_MS / Math.max(total, 1));

    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const elapsed = ts - startTs - baseDelayMs;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const next = Math.min(total, Math.floor(elapsed / speed));
      setCount(next);
      if (next < total) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, text, baseDelayMs]);

  // Render full text invisibly to reserve layout space, overlay the
  // typed slice on top — prevents jumpy reflow while typing.
  return (
    <Tag className={className} style={style}>
      <span style={{ position: "relative", display: "inline-block" }}>
        <span aria-hidden="true" style={{ visibility: "hidden" }}>
          {text}
        </span>
        <span style={{ position: "absolute", inset: 0 }}>{text.slice(0, count)}</span>
      </span>
    </Tag>
  );
};

const StepRow = ({
  row,
  index,
}: {
  row: { kicker: string; title: string; desc: string; direction: string; image: string };
  index: number;
}) => {
  const { t } = useTranslation();
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
      // Trigger as the section is approaching the viewport so the
      // animation lands right when the user sees it.
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Image and text both slide in from opposite edges of the viewport.
  // Generous distance so the motion is clearly visible, but eased so it
  // lands smoothly without overshoot.
  const imgFrom = row.direction === "right" ? "-50vw" : "50vw";
  const textFrom = row.direction === "right" ? "50vw" : "-50vw";

  // Typewriter starts shortly after the text slide-in begins so motion
  // and characters arrive together without lag.
  const typeStartDelayMs = 250;

  return (
    <section
      ref={ref}
      className={`how-step grid lg:grid-cols-2 items-center ${
        row.direction === "left" ? "lg:[direction:rtl]" : ""
      } ${inView ? "is-visible" : ""}`}
      style={
        {
          gap: "clamp(24px, 4vw, 96px)",
          ["--img-from" as string]: imgFrom,
          ["--text-from" as string]: textFrom,
        } as React.CSSProperties
      }
    >
      {/* Image */}
      <div
        className={`how-img flex justify-start order-first lg:order-none ${
          row.direction === "left" ? "lg:[direction:ltr] lg:justify-center" : "lg:justify-center"
        }`}
      >
        <img
          src={row.image}
          alt={row.title}
          className={`w-full max-w-[520px] lg:max-w-none aspect-square object-contain ${
            index === 0 ? "scale-[0.75]" : ""
          }`}
          loading="lazy"
        />
      </div>

      {/* Text */}
      <div className={`${row.direction === "left" ? "lg:[direction:ltr]" : ""} order-last lg:order-none`}>
        <p
          className="how-text how-text-1 font-bold text-muted-foreground mb-2 uppercase"
          style={{ fontSize: "0.85rem", letterSpacing: "0.35em" }}
        >
          {row.kicker}
        </p>

        <Typewriter
          as="h3"
          text={row.title}
          start={inView}
          baseDelayMs={typeStartDelayMs}
          className="how-text how-text-2 font-black leading-[1.15] text-foreground mb-3"
          style={{ fontSize: "var(--h3-size)" }}
        />

        <Typewriter
          as="p"
          text={row.desc}
          start={inView}
          baseDelayMs={typeStartDelayMs + 350}
          className="how-text how-text-3 text-muted-foreground mb-8 normal-case"
          style={{ fontSize: "var(--p-size)", lineHeight: "var(--p-line)" }}
        />

        <div className="how-text how-text-4">
          <Link
            to="/hur-det-gar-till"
            className="inline-block text-foreground text-base font-medium hover:text-muted-foreground underline-offset-4 hover:underline transition-colors normal-case"
            style={{ paddingBottom: "32px" }}
          >
            {t("howItWorks.readMore")}
          </Link>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const { t } = useTranslation();
  const steps = [1, 2, 3, 4].map((n, i) => ({
    kicker: t(`howItWorks.step${n}.kicker`),
    title: t(`howItWorks.step${n}.title`),
    desc: t(`howItWorks.step${n}.desc`),
    direction: directions[i],
    image: images[i],
  }));

  return (
    <section
      className="relative bg-background text-foreground"
      style={{ overflowX: "clip" }}
    >
      {/* Dome top — sits inside this section, arches downward into the dark area */}
      <div aria-hidden style={{ lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="block w-full h-[clamp(80px,18vw,320px)]"
        >
          <path d="M0,320 Q720,-90 1440,320 Z" fill="hsl(var(--secondary))" />
        </svg>
      </div>

      <div
        className="bg-secondary"
        style={{
          paddingTop: "clamp(8px, 2vw, 32px)",
          paddingBottom: "clamp(36px, 4vw, 72px)",
        }}
      >
        <div className="container-wide">
          <div className="text-center" style={{ marginBottom: "clamp(28px, 3vw, 48px)" }}>
            <h2 className="font-black text-foreground" style={{ fontSize: "var(--h2-size)" }}>
              {t("howItWorks.title")}
            </h2>
          </div>

          <div className="grid justify-items-center" style={{ marginBottom: "clamp(20px, 2.5vw, 36px)" }}>
            <div className="overflow-hidden bg-black/20 rounded-md" style={{ width: "min(760px, 100%)", aspectRatio: "16 / 9" }}>
              <iframe
                src="https://player.vimeo.com/video/76979871?title=0&byline=0&portrait=0"
                title="Hur det går till"
                className="w-full h-full block border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="text-center mx-auto" style={{ maxWidth: "770px", marginBottom: "clamp(32px, 4vw, 56px)" }}>
            <p className="text-muted-foreground" style={{ fontSize: "var(--p-size)", lineHeight: "var(--p-line)" }}>
              Vi hjälper dig att hitta rätt kompetens snabbt — från första behovsanalys till uppföljning. En transparent process där varje steg är utformat för att leverera kvalitet och trygghet.
            </p>
          </div>

          <div className="grid" style={{ gap: "clamp(32px, 5vw, 84px)", paddingBlock: "clamp(24px, 3vw, 48px)" }}>
            {steps.map((row, i) => (
              <StepRow key={row.kicker} row={row} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* Defaults: content fully visible (SSR-safe) */
        .how-img,
        .how-text {
          opacity: 1;
          transform: none;
        }

        /* Only apply hidden initial state once JS has mounted and marked the
           step as not-yet-in-view. SSR HTML stays visible. */
        .how-step.js-ready:not(.is-visible) .how-img {
          opacity: 0;
          transform: translateX(var(--img-from));
        }
        .how-step.js-ready:not(.is-visible) .how-text {
          opacity: 0;
          transform: translateX(var(--text-from));
        }

        .how-step.is-visible .how-img {
          opacity: 1;
          transform: translateX(0);
          transition: opacity 0.9s cubic-bezier(0.22, 0.61, 0.36, 1),
                      transform 1.1s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .how-step.is-visible .how-text {
          opacity: 1;
          transform: translateX(0);
          transition: opacity 0.9s cubic-bezier(0.22, 0.61, 0.36, 1),
                      transform 1.1s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .how-step.is-visible .how-text-1 { transition-delay: 0.05s; }
        .how-step.is-visible .how-text-2 { transition-delay: 0.15s; }
        .how-step.is-visible .how-text-3 { transition-delay: 0.25s; }
        .how-step.is-visible .how-text-4 { transition-delay: 0.40s; }

        @media (prefers-reduced-motion: reduce) {
          .how-step .how-img,
          .how-step .how-text {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* Mark steps as JS-ready after mount so the hidden initial state only
          applies in the hydrated client, never in SSR HTML. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.querySelectorAll('.how-step').forEach(function(el){el.classList.add('js-ready');});`,
        }}
      />
    </section>
  );
};

export default HowItWorks;
