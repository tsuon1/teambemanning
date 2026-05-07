interface PageHeroProps {
  kicker?: string;
  title: React.ReactNode;
  description?: string;
  image?: string;
  imagePosition?: string;
  children?: React.ReactNode;
}

const PageHero = ({ kicker, title, description, image, imagePosition, children }: PageHeroProps) => {
  return (
    <section className={`relative overflow-hidden ${image ? "min-h-[60vh]" : "pt-32 pb-16 lg:pt-40 lg:pb-20"}`}>
      {image && (
        <>
          <img
            src={image}
            alt=""
            fetchPriority="high"
            decoding="sync"
            className="absolute inset-0 w-full h-full object-cover"
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
          />
          <div className="absolute inset-0 bg-black/50" />
        </>
      )}
      {!image && <div className="absolute inset-0 bg-background" />}
      <div className={`relative z-10 container-wide ${image ? "min-h-[60vh] flex items-center py-32 lg:py-40" : ""}`}>
        <div className="page-hero-in max-w-2xl">
          {kicker && (() => {
            const words = kicker.split(" ");
            const first = words[0];
            const rest = words.slice(1).join(" ");
            return (
              <span
                className={`inline-block font-black uppercase mb-4 ${image ? "text-white" : "text-brand"}`}
                style={{ fontSize: 'var(--h5-size)', letterSpacing: 'var(--h5-track)' }}
              >
                {image ? <><span className="text-brand">{first}</span>{rest ? ` ${rest}` : ""}</> : kicker}
              </span>
            );
          })()}
          <h1
            className={`font-display font-black leading-[1.05] mb-6 [overflow-wrap:anywhere] whitespace-pre-line ${image ? "text-white" : "text-foreground"}`}
            style={{ fontSize: 'var(--h1-size)', lineHeight: 'var(--h1-line)' }}
          >
            {title}
          </h1>
          {description && (
            <p
              className={`max-w-2xl [overflow-wrap:anywhere] ${image ? "text-white/80" : "text-muted-foreground"}`}
              style={{ fontSize: 'var(--p-size)', lineHeight: 'var(--p-line)' }}
            >
              {description}
            </p>
          )}
          {children}
        </div>
      </div>

      <style>{`
        @keyframes pageHeroIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .page-hero-in {
          opacity: 1;
          animation: pageHeroIn 0.6s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .page-hero-in { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default PageHero;
