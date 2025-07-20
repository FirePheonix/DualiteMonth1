import React from 'react';
import { motion } from 'framer-motion';
import ConversionForm from './ConversionForm';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/bg.mp4" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content Container - Fixed positioning to prevent displacement */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-hero font-serif font-semibold text-hero-text leading-tight tracking-wide text-center lg:text-left"
            >
              Convert Sound,
              <br />
              Keep the Soul.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-hero-sub font-sans text-hero-sub leading-relaxed max-w-2xl tracking-wide text-center lg:text-left mx-auto lg:mx-0"
            >
              The cleanest way to turn YouTube videos into beautiful, high-quality MP3s.
            </motion.p>
          </div>

          {/* Right Column - Conversion Form */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="w-full max-w-2xl mx-auto lg:mx-0"
            >
              <ConversionForm />
            </motion.div>
          </div>
        </div>

        {/* Bottom Right Caption - Desktop Only */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="hidden lg:block absolute bottom-12 right-8 max-w-xs"
        >
          <p className="text-hero-caption font-sans text-hero-caption leading-relaxed tracking-wide">
            Fast. Free. No ads.
            <br />
            Whether it's a podcast, a music video, or a lecture — extract pristine audio effortlessly.
          </p>
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-hero-caption"
      >
        <div className="animate-float">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
