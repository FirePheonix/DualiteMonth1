import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

const App: React.FC = () => {
  return (
    <div className="bg-black min-h-screen font-space">
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default App;
