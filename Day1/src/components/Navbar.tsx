import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white font-space">
              NFT<span className="text-neon-purple">Crafter</span>
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a 
                href="#" 
                className="text-white hover:text-neon-purple transition-colors duration-300 px-3 py-2 text-sm font-medium"
              >
                How it Works
              </a>
              <a 
                href="#" 
                className="text-white hover:text-neon-purple transition-colors duration-300 px-3 py-2 text-sm font-medium"
              >
                Gallery
              </a>
              <a 
                href="#" 
                className="text-white hover:text-neon-purple transition-colors duration-300 px-3 py-2 text-sm font-medium"
              >
                FAQ
              </a>
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex items-center">
            <button 
              onClick={() => {
                // Scroll to generator or trigger show
                const event = new CustomEvent('showGenerator');
                window.dispatchEvent(event);
              }}
              className="bg-gradient-to-r from-neon-purple to-neon-pink text-white px-6 py-2 rounded-full font-semibold text-sm transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-neon-purple/50 animate-pulse-glow"
            >
              Generate Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
