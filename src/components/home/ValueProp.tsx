import { useTranslation } from "react-i18next";

const ValueProp = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-background py-20 md:py-[clamp(124px,8vw,172px)]">
      <div className="container-wide">
        <div className="text-center max-w-[760px] mx-auto">
          <h2 className="font-black leading-[1.15] md:leading-[1.2] text-foreground uppercase text-[1.5rem] sm:text-[1.85rem] md:text-[length:var(--h2-size)]">
            {t("valueProp.title")}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default ValueProp;
