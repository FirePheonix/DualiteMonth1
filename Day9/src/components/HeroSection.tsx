import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-black rounded-3xl border border-black/20 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="flex justify-between items-start p-6 md:p-8"
        >
          {/* Brand Name - Top Left */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <h1 className="text-white font-elegant text-lg md:text-xl font-medium tracking-luxury">
              ÉLANÉA BEAUTY
            </h1>
          </motion.div>
          
          {/* Navigation - Top Right */}
          <motion.nav 
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="flex items-center space-x-6 md:space-x-8"
          >
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-white font-elegant text-xs tracking-widest hover:text-white/80 transition-colors">
                HOME
              </a>
              <a href="#" className="text-white font-elegant text-xs tracking-widest hover:text-white/80 transition-colors">
                PORTFOLIO
              </a>
              <a href="#" className="text-white font-elegant text-xs tracking-widest hover:text-white/80 transition-colors">
                SERVICES
              </a>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black hover:bg-gray-900 text-white px-5 py-2 rounded-full font-elegant text-xs tracking-widest transition-colors border border-white/20"
            >
              GET A QUOTE
            </motion.button>
          </motion.nav>
        </motion.header>
        
        {/* Hero Content - Center */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-12">
          <div className="text-center max-w-4xl">
            <motion.h2 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
              className="text-white font-elegant text-3xl md:text-5xl lg:text-6xl font-medium leading-tight mb-4"
            >
              Reveal the Art Within
            </motion.h2>
            <motion.h3 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
              className="text-white font-elegant text-2xl md:text-3xl lg:text-4xl font-light leading-tight mb-6"
            >
              Where Every Shade Tells a Story
            </motion.h3>
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.0 }}
              className="text-white/90 font-elegant text-lg md:text-xl italic font-light tracking-luxury"
            >
              Luxury Makeup. Cinematic Expression. Timeless Beauty.
            </motion.p>
          </div>
        </div>
        
        {/* Bottom Left Paragraph */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
          className="p-6 md:p-8"
        >
          <div className="max-w-sm">
            <p className="text-white/90 font-elegant text-sm leading-relaxed italic">
              "Step into a world of elevated beauty — where pigment meets precision, and every brushstroke evokes emotion. Discover hyperreal makeup visuals that redefine allure."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
