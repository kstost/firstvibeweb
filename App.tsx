import React from 'react';
import HeroSection from './components/landing/HeroSection';
import HowItWorksSection from './components/landing/HowItWorksSection';
import FeaturesSection from './components/landing/FeaturesSection';
import TargetAudienceSection from './components/landing/TargetAudienceSection';
import FinalCtaSection from './components/landing/FinalCtaSection';
import Footer from './components/landing/Footer';

function App(): React.ReactNode {
  return (
    <div className="bg-gray-900 text-white font-sans antialiased overflow-x-hidden">
      <div className="relative z-20">
        <HeroSection />
        <main className="container mx-auto px-6 py-12 md:py-20">
          <HowItWorksSection />
          <FeaturesSection />
          <TargetAudienceSection />
          <FinalCtaSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;