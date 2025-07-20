import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import VideoModal from './VideoModal';

const HeroSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex flex-col overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
        {/* Cosmic animation background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-cosmic-pulse"></div>
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-nova-silver rounded-full animate-cosmic-pulse delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white rounded-full animate-cosmic-pulse delay-2000"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-cosmic-pulse delay-500"></div>
          <div className="absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-nova-silver rounded-full animate-cosmic-pulse delay-1500"></div>
        </div>
      </div>

      {/* Top Navbar */}
      <motion.nav 
        className="relative z-10 flex justify-between items-center px-6 lg:px-12 py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Brand Name - Left */}
        <div className="font-serif text-2xl lg:text-3xl font-bold text-white tracking-wide">
          NoirNova
        </div>
        
        {/* Navigation - Center */}
        <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
          <a href="#featured-collection" className="font-sans text-white/90 hover:text-white transition-colors text-sm lg:text-base tracking-wide">
            Collection
          </a>
          <a href="#materials" className="font-sans text-white/90 hover:text-white transition-colors text-sm lg:text-base tracking-wide">
            Craftsmanship
          </a>
          <a href="#philosophy" className="font-sans text-white/90 hover:text-white transition-colors text-sm lg:text-base tracking-wide">
            About
          </a>
          <a href="#contact" className="font-sans text-white/90 hover:text-white transition-colors text-sm lg:text-base tracking-wide">
            Contact
          </a>
        </div>
        
        {/* Buy Now Button - Right */}
        <button
          onClick={() => scrollToSection('featured-collection')}
          className="px-4 py-2 lg:px-6 lg:py-3 bg-transparent border border-white/80 text-white font-sans text-sm lg:text-base tracking-wide hover:bg-white hover:text-black transition-all duration-300 rounded-sm"
        >
          Buy Now
        </button>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Main Headlines */}
            <div className="space-y-6 lg:space-y-8">
              <motion.h1 
                className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-wide"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Experience The Cosmos<br />
                Like Never Before
              </motion.h1>
              
              <motion.p 
                className="font-sans text-lg lg:text-xl xl:text-2xl text-white/90 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                Feel every texture. See every detail. Rediscover your space with NoirNova.
              </motion.p>

              <motion.p 
                className="font-sans text-sm lg:text-base text-white/80 leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                Each piece is a portal. Handcrafted. Celestial. Limitless.
              </motion.p>
            </div>

            {/* Right Column - Description */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <p className="font-sans text-base lg:text-lg text-white/90 leading-relaxed">
                Discover what it means to truly live — with furniture so rich, so detailed, it feels like you're inside the cosmos itself. NoirNova transforms everyday moments into immersive journeys, whether you're in the living room, at the office, or lost in thought.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => scrollToSection('featured-collection')}
                  className="px-8 py-3 bg-white text-black font-sans font-medium text-sm lg:text-base tracking-wide hover:bg-white/90 transition-all duration-300"
                >
                  Explore Collection
                </button>
                
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-3 bg-transparent border border-white/60 text-white font-sans font-medium text-sm lg:text-base tracking-wide hover:border-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2 justify-center"
                >
                  <Play size={16} />
                  Watch Our Story
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default HeroSection;
