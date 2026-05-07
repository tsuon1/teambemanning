interface SectionHeadingProps {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  accentTitle?: boolean;
}

const SectionHeading = ({ kicker, title, description, align = "center", accentTitle }: SectionHeadingProps) => {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl mb-12 lg:mb-16 ${alignment}`}>
      {kicker && (
        <h5
          className="font-black text-brand mb-3 uppercase"
          style={{ fontSize: 'var(--h5-size)', letterSpacing: 'var(--h5-track)' }}
        >
          {kicker}
        </h5>
      )}
      <h2
        className={`font-black leading-tight tracking-tight uppercase ${
          accentTitle ? "text-accent" : "text-foreground"
        }`}
        style={{ fontSize: 'var(--h2-size)' }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="mt-4 text-muted-foreground"
          style={{ fontSize: 'var(--p-size)', lineHeight: 'var(--p-line)' }}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
