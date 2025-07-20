import React, { useState, useRef, useEffect } from 'react';

const HeroSection: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedData = () => {
        setVideoLoaded(true);
      };
      
      video.addEventListener('loadeddata', handleLoadedData);
      return () => video.removeEventListener('loadeddata', handleLoadedData);
    }
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video Container */}
      <div className="absolute inset-0 w-full h-full">
        {/* Fallback gradient background */}
        <div className={`absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}></div>
        
        {/* Background Video */}
        <video
          ref={videoRef}
          className={`w-full h-full object-cover scale-105 animate-slow-zoom transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        
        {/* Dark overlay for contrast with fade-in animation */}
        <div className="absolute inset-0 bg-black/50 animate-fade-in"></div>
      </div>

      {/* Content Container - Positioned at bottom with slide-up animation */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-8 lg:px-12 animate-slide-up">
        
        {/* Decorative Line with width animation */}
        <div className="w-full mb-6 md:mb-8">
          <div className="h-px bg-gradient-to-r from-white/60 via-white/30 to-transparent max-w-screen-xl animate-line-expand"></div>
        </div>

        {/* Bottom Content Area */}
        <div className="pb-6 md:pb-8 lg:pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 max-w-screen-xl">
            
            {/* Left Side - Main Title and Subtitle with staggered animation */}
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-white leading-[0.95] tracking-tight font-elegant animate-slide-up-delayed">
                Experience Inner Peace<br />
                Like Never Before
              </h1>
              
              <div className="space-y-2 max-w-lg animate-fade-in-delayed">
                <p className="text-sm md:text-base text-white/90 leading-relaxed font-light">
                  Breathe deeply. Be fully present. Rediscover tranquility with ZenSync.
                </p>
              </div>
            </div>

            {/* Right Side - Description with delayed animation */}
            <div className="flex items-end lg:justify-end animate-slide-up-more-delayed">
              <div className="max-w-md lg:max-w-sm space-y-2">
                <p className="text-xs md:text-sm text-white/70 leading-relaxed font-light">
                  Explore what it means to truly be — where stillness meets luxury.
                </p>
                <p className="text-xs md:text-sm text-white/70 leading-relaxed font-light">
                  ZenSync is more than meditation. It's a lifestyle of presence, peace, and purpose — whether you're in your sanctuary, on a retreat, or simply taking a mindful pause in your day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
