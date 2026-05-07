import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const ServiceCard = ({ title, description, href, icon }: ServiceCardProps) => {
  const { t } = useTranslation();
  return (
    <Link
      to={href}
      className="group bg-background border border-border rounded-2xl p-8 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 block"
    >
      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-foreground mb-5 group-hover:bg-foreground group-hover:text-background transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-foreground mb-3 normal-case">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-5 normal-case">{description}</p>
      <span className="text-sm font-medium text-foreground group-hover:text-brand group-hover:underline underline-offset-4 transition-all normal-case">
        {t("services.readMore")}
      </span>
    </Link>
  );
};

export default ServiceCard;