import HeroSection from "@/components/home/HeroSection";
import LogoSlider from "@/components/home/LogoSlider";
import ServicesOverview from "@/components/home/ServicesOverview";
import ValueProp from "@/components/home/ValueProp";
import HowItWorks from "@/components/home/HowItWorks";
import KPISection from "@/components/home/KPISection";
import Testimonials from "@/components/home/Testimonials";
import ReadySection from "@/components/home/ReadySection";
import FeaturedResources from "@/components/home/FeaturedResources";
import SEO from "@/components/SEO";

const HomePage = () => {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SERCO Bemanning",
    url: "https://www.sercobemanning.se",
    logo: "https://www.sercobemanning.se/favicon.ico",
    description:
      "Professionell bemanning inom transport, logistik, industri och lokalvård i Stockholmsregionen.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sjöängsvägen 6",
      postalCode: "192 72",
      addressLocality: "Sollentuna",
      addressRegion: "Stockholm",
      addressCountry: "SE",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+46-8-758-56-07",
        contactType: "customer service",
        email: "info@personaluthyrning.net",
        areaServed: "SE",
        availableLanguage: ["Swedish", "English"],
      },
    ],
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: "SERCO Bemanning",
    image:
      "https://storage.googleapis.com/gpt-engineer-file-uploads/458X0KN74HbbIDrxLC1Z1MnFXUL2/social-images/social-1775755444342-serco_bemmaning-logga.webp",
    url: "https://www.sercobemanning.se",
    telephone: "+46-8-758-56-07",
    email: "info@personaluthyrning.net",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sjöängsvägen 6",
      postalCode: "192 72",
      addressLocality: "Sollentuna",
      addressRegion: "Stockholm",
      addressCountry: "SE",
    },
    areaServed: { "@type": "City", name: "Stockholm" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
  };

  return (
    <div>
      <SEO pageKey="home" jsonLd={[orgJsonLd, localBusinessJsonLd]} />
      <HeroSection />
      <LogoSlider />
      <ServicesOverview />
      <ValueProp />
      <HowItWorks />
      <Testimonials />
      <KPISection />
      <ReadySection />
      <FeaturedResources />
    </div>
  );
};

export default HomePage;
