import React, { useState } from 'react';
import ImageGenerator from './ImageGenerator';

const HeroSection: React.FC = () => {
  const [showGenerator, setShowGenerator] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/bg.mp4" type="video/mp4" />
          {/* Fallback gradient background */}
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900"></div>
        </video>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80 z-10"></div>

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <h1 className="text-hero-sm lg:text-hero font-bold text-white font-space leading-none uppercase tracking-tight">
                  Make NFTs
                  <br />
                  <span className="bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent animate-float">
                    That Make
                  </span>
                  <br />
                  <span className="text-white hover:animate-glitch cursor-default">
                    Noise
                  </span>
                </h1>
                
                <p className="text-lg lg:text-xl text-white/80 font-space max-w-lg">
                  Unleash your creativity. Click once. Boom — it's art.
                </p>

                {/* CTA Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setShowGenerator(!showGenerator)}
                    className="bg-gradient-to-r from-neon-purple to-neon-pink text-white px-8 py-4 rounded-full font-bold text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-neon-purple/50 animate-pulse-glow"
                  >
                    {showGenerator ? 'Hide Generator' : 'Start Creating'}
                  </button>
                  
                  <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transform transition-all duration-300 hover:scale-105 border border-white/20">
                    View Gallery
                  </button>
                </div>
              </div>

              {/* Right Content - Image Generator */}
              <div className="lg:flex lg:justify-end">
                {showGenerator && <ImageGenerator />}
              </div>
            </div>

            {/* Mobile Generator */}
            {showGenerator && (
              <div className="mt-8 lg:hidden">
                <ImageGenerator />
              </div>
            )}
          </div>
        </div>

        {/* Bottom Right Description */}
        <div className="absolute bottom-8 right-8 max-w-sm hidden lg:block">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <p className="text-white/90 text-sm leading-relaxed font-space">
              It's not just an image — it's your digital statement.
              Use our AI-powered generator to craft collectible art
              that's wild, weird, and uniquely yours.
            </p>
          </div>
        </div>
      </div>

      {/* Animated Elements */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-neon-cyan rounded-full animate-ping"></div>
      <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-neon-pink rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-neon-purple rounded-full animate-bounce"></div>
    </div>
  );
};

export default HeroSection;
