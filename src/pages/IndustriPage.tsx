import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/service-industri.jpg";
import SEO from "@/components/SEO";

const IndustriPage = () => (
  <>
    <SEO pageKey="industry" />
    <ServicePageLayout heroImage={heroImg} pageKey="industriPage" />
  </>
);

export default IndustriPage;
