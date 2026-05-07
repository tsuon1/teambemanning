import { Link } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import newsTransport from "@/assets/news-transport.jpg";
import newsKvalitet from "@/assets/news-kvalitet.jpg";
import newsUngdom from "@/assets/news-ungdom.jpg";
import newsLogistik from "@/assets/news-logistik.jpg";
import newsMatchning from "@/assets/news-matchning.jpg";

const cardImages = [newsTransport, newsKvalitet, newsUngdom, newsLogistik, newsMatchning];

function useVisibleCount() {
  const [count, setCount] = useState(5);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 600) setCount(1);
      else if (w < 1200) setCount(3);
      else setCount(5);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return count;
}

const INTERVAL = 6000;

const FeaturedResources = () => {
  const { t } = useTranslation();
  const visibleCount = useVisibleCount();
  const [startIndex, setStartIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const cards = [1, 2, 3, 4, 5].map((n, i) => ({
    badge: t(`featured.c${n}.badge`),
    title: t(`featured.c${n}.title`),
    desc: t(`featured.c${n}.desc`),
    href: "/nyheter",
    image: cardImages[i],
  }));

  const maxStart = Math.max(0, cards.length - visibleCount);

  const goNext = useCallback(() => {
    setStartIndex((prev) => (prev >= maxStart ? 0 : prev + 1));
  }, [maxStart]);

  const goPrev = useCallback(() => {
    setStartIndex((prev) => (prev <= 0 ? maxStart : prev - 1));
  }, [maxStart]);

  useEffect(() => {
    if (visibleCount >= cards.length) return;
    const timer = setInterval(goNext, INTERVAL);
    return () => clearInterval(timer);
  }, [goNext, visibleCount, cards.length]);

  useEffect(() => {
    setStartIndex(0);
  }, [visibleCount]);

  const visibleCards = cards.slice(startIndex, startIndex + visibleCount);
  const showNav = visibleCount < cards.length;

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    isDragging.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current !== null && Math.abs(e.clientX - dragStartX.current) > 10) {
      isDragging.current = true;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - e.clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    dragStartX.current = null;
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const gridClass = visibleCount === 1 ? "grid-cols-1" : visibleCount === 3 ? "grid-cols-3" : "grid-cols-5";

  return (
    <section className="bg-secondary section-padding">
      <div className="container-wide">
        <p className="text-center font-black text-muted-foreground mb-10 uppercase" style={{ fontSize: 'var(--h5-size)', letterSpacing: 'var(--h5-track)' }}>
          {t("featured.kicker")}
        </p>

        <div className="relative">
          {showNav && visibleCount >= 5 && (
            <>
              <button onClick={goPrev} className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 p-2 text-foreground hover:text-foreground/60 transition-colors" aria-label="Previous">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={goNext} className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 p-2 text-foreground hover:text-foreground/60 transition-colors" aria-label="Next">
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div
            className={`grid ${gridClass} gap-5 overflow-hidden select-none cursor-grab active:cursor-grabbing`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onClickCapture={handleClick}
          >
            {visibleCards.map((card) => (
              <Link key={card.title} to={card.href} className="group bg-background border border-border rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-200">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-foreground text-background text-xs font-bold px-3 py-1 rounded-full">{card.badge}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-foreground text-sm leading-snug mb-2 normal-case">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3 normal-case">{card.desc}</p>
                  <span className="text-sm text-foreground font-medium group-hover:underline underline-offset-4 normal-case">{t("featured.readMore")}</span>
                </div>
              </Link>
            ))}
          </div>

          {showNav && visibleCount >= 5 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: maxStart + 1 }, (_, i) => (
                <button key={i} onClick={() => setStartIndex(i)} className={`w-2 h-2 rounded-full transition-colors ${i === startIndex ? "bg-foreground" : "bg-foreground/20"}`} aria-label={`Go to ${i + 1}`} />
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-10">
          <Link to="/nyheter" className="inline-flex items-center border border-foreground text-foreground font-medium text-sm px-7 py-2.5 rounded-full hover:bg-foreground hover:text-background transition-colors">
            {t("featured.visitNews")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedResources;