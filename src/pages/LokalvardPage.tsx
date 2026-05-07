import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/hero-lokalvard.jpg";
import SEO from "@/components/SEO";

const LokalvardPage = () => (
  <>
    <SEO pageKey="cleaning" />
    <ServicePageLayout heroImage={heroImg} pageKey="lokalvardPage" />
  </>
);

export default LokalvardPage;
