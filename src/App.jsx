import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturesTab from "./components/FeaturesTab";
import StatsAndCTA from "./components/StatsAndCTA";
import WhoWeAre from "./components/Whoweare";
import Services from "./components/Services";
import GWEDCPage from "./components/GWEDCPage";
import Contactpage from "./components/Contactpage";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import StartupRegistration from "./pages/StartupRegistration";
import MentorRegistration from "./pages/MentorRegistration";
import InvestorRegistration from "./pages/InvestorRegistration";
import PartnerRegistration from "./pages/PartnerRegistration";
import Privacy from "./components/Privacy";
import TermsAndConditions from "./components/TermsConditions";
function Home() {
  return (
    <>
      <Hero />
      <FeaturesTab />
      <StatsAndCTA />
    </>
  );
}

function App() {
  return (
    
    <div className="flex flex-col min-h-screen bg-sastik-dark text-sastik-textMain font-sans selection:bg-sastik-accent selection:text-white overflow-x-hidden">
      <Navbar />

      <ScrollToTop />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/GWEDC" element={<GWEDCPage />} />
          <Route path="/contact-us" element={<Contactpage />} />
          <Route path="/startup-registration" element={<StartupRegistration />} />
        <Route path="/mentor-registration" element={<MentorRegistration />} />
        <Route path="/investor-registration" element={<InvestorRegistration />} />
        <Route path="/partner-registration" element={<PartnerRegistration />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms-conditions" element={<TermsAndConditions />} />
        </Routes>
      </main>

      {/* Footer yahan har page ke end mein render hoga */}
      <Footer />
    </div>
  );
}

export default App;