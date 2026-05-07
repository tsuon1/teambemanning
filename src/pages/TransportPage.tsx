import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/hero-transport.jpg";
import SEO from "@/components/SEO";

const TransportPage = () => (
  <>
    <SEO pageKey="transport" />
    <ServicePageLayout heroImage={heroImg} pageKey="transportPage" />
  </>
);

export default TransportPage;
