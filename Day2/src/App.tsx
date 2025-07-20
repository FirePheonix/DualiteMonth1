import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

function App() {
  return (
    <div className="relative">
      <Navbar />
      <div id="hero-section">
        <HeroSection />
      </div>
    </div>
  );
}

export default App;
