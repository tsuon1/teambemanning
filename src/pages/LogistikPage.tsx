import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/hero-logistik.jpg";
import SEO from "@/components/SEO";

const LogistikPage = () => (
  <>
    <SEO pageKey="logistics" />
    <ServicePageLayout heroImage={heroImg} pageKey="logistikPage" />
  </>
);

export default LogistikPage;
