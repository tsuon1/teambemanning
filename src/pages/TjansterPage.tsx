import { useTranslation } from "react-i18next";
import { Truck, Package, Factory, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-tjanster.jpg";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";
import SEO from "@/components/SEO";

const TjansterPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <SEO pageKey="services" />
      <PageHero kicker={t("servicesPage.kicker")} title={t("servicesPage.title")} description={t("servicesPage.desc")} image={heroImg} />
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid sm:grid-cols-2 gap-8">
            <ServiceCard title={t("services.transport.title")} description={t("servicesPage.transportDesc")} href="/tjanster/transport" icon={<Truck className="w-6 h-6" />} />
            <ServiceCard title={t("services.logistics.title")} description={t("servicesPage.logisticsDesc")} href="/tjanster/logistik" icon={<Package className="w-6 h-6" />} />
            <ServiceCard title={t("services.industry.title")} description={t("servicesPage.industryDesc")} href="/tjanster/industri" icon={<Factory className="w-6 h-6" />} />
            <ServiceCard title={t("services.cleaning.title")} description={t("servicesPage.cleaningDesc")} href="/tjanster/lokalvard" icon={<Sparkles className="w-6 h-6" />} />
          </div>
        </div>
      </section>
      <CTABanner />
    </div>
  );
};

export default TjansterPage;
