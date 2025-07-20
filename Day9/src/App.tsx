import React from 'react';
import HeroSection from './components/HeroSection';
import AdditionalSections from './components/AdditionalSections';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Container with padding for hero section */}
      <div className="p-4 md:p-8">
        <HeroSection />
      </div>
      
      {/* Additional page content */}
      <AdditionalSections />
    </div>
  );
}

export default App;
