import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LanguageRoute from "@/components/LanguageRoute";
import { ROUTES, SUPPORTED_LANGS, PageKey, LangCode } from "@/i18n/routes";

import HomePage from "./pages/HomePage";
import TjansterPage from "./pages/TjansterPage";
import TransportPage from "./pages/TransportPage";
import LogistikPage from "./pages/LogistikPage";
import IndustriPage from "./pages/IndustriPage";
import LokalvardPage from "./pages/LokalvardPage";
import SaFungerarDetPage from "./pages/SaFungerarDetPage";
import VarforSercoPage from "./pages/VarforSercoPage";
import JobbaHosOssPage from "./pages/JobbaHosOssPage";
import OmOssPage from "./pages/OmOssPage";
import PartnersPage from "./pages/PartnersPage";
import NyheterPage from "./pages/NyheterPage";
import KontaktPage from "./pages/KontaktPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// One React component per logical page — reused across all 3 languages.
const PAGES: Record<PageKey, JSX.Element> = {
  home:       <HomePage />,
  services:   <TjansterPage />,
  transport:  <TransportPage />,
  logistics:  <LogistikPage />,
  industry:   <IndustriPage />,
  cleaning:   <LokalvardPage />,
  howItWorks: <SaFungerarDetPage />,
  whySerco:   <VarforSercoPage />,
  careers:    <JobbaHosOssPage />,
  about:      <OmOssPage />,
  partners:   <PartnersPage />,
  news:       <NyheterPage />,
  contact:    <KontaktPage />,
};

// Build a flat list of <Route> entries — one per (pageKey × language).
// Every URL is explicit; nothing derived from filenames.
const localizedRoutes = (Object.keys(PAGES) as PageKey[]).flatMap((key) =>
  SUPPORTED_LANGS.map((lang: LangCode) => (
    <Route
      key={`${key}-${lang}`}
      path={ROUTES[key][lang]}
      element={<LanguageRoute lang={lang}>{PAGES[key]}</LanguageRoute>}
    />
  ))
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          {localizedRoutes}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
