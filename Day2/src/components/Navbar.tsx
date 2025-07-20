import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToConverter = () => {
    const heroSection = document.querySelector('#hero-section');
    heroSection?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 p-6 lg:p-8">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl lg:text-3xl font-serif font-semibold text-hero-text tracking-wide"
        >
          MuseRip
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden md:flex items-center space-x-8 text-hero-sub font-sans"
        >
          <a href="#how-it-works" className="hover:text-hero-text transition-colors duration-300 tracking-wide">
            How it Works
          </a>
          <a href="#privacy" className="hover:text-hero-text transition-colors duration-300 tracking-wide">
            Privacy
          </a>
          <a href="#support" className="hover:text-hero-text transition-colors duration-300 tracking-wide">
            Support
          </a>
        </motion.div>

        {/* Desktop CTA Button */}
        <motion.button
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={scrollToConverter}
          className="hidden md:block px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-hero-text font-sans font-medium tracking-wide hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105"
        >
          Start Converting
        </motion.button>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={toggleMenu}
          className="md:hidden text-hero-text p-2"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 p-6"
          >
            <div className="flex flex-col space-y-4">
              <a href="#how-it-works" className="text-hero-sub hover:text-hero-text transition-colors duration-300 py-2">
                How it Works
              </a>
              <a href="#privacy" className="text-hero-sub hover:text-hero-text transition-colors duration-300 py-2">
                Privacy
              </a>
              <a href="#support" className="text-hero-sub hover:text-hero-text transition-colors duration-300 py-2">
                Support
              </a>
              <button 
                onClick={scrollToConverter}
                className="mt-4 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-hero-text font-sans font-medium tracking-wide hover:bg-white/20 transition-all duration-300 text-left"
              >
                Start Converting
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
