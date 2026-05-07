import { useTranslation } from "react-i18next";

const ValueProp = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-background border-t border-border" style={{ paddingBlock: 'clamp(124px, 8vw, 172px)' }}>
      <div className="container-wide">
        <div className="text-center max-w-[980px] mx-auto">
          <h2 className="font-black leading-[1.2] text-foreground uppercase" style={{ fontSize: 'var(--h2-size)' }}>
            {t("valueProp.title")}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default ValueProp;