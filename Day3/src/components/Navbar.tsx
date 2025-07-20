import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-8 md:py-6">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-sm md:text-base font-light tracking-wider">
          <span className="font-elegant font-medium">ZenSync</span>
        </div>

        {/* Navigation Links - Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-8 text-white/90">
          <a href="#practices" className="hover:text-white transition-colors duration-300 text-xs font-light tracking-wide">
            Practices
          </a>
          <a href="#science" className="hover:text-white transition-colors duration-300 text-xs font-light tracking-wide">
            Science
          </a>
          <a href="#retreats" className="hover:text-white transition-colors duration-300 text-xs font-light tracking-wide">
            Retreats
          </a>
          <a href="#about" className="hover:text-white transition-colors duration-300 text-xs font-light tracking-wide">
            About
          </a>
        </div>

        {/* CTA Button */}
        <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-2 rounded-full text-xs font-light tracking-wide hover:bg-white/20 transition-all duration-300 hover:scale-105">
          Join Now
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
