import React from 'react';
import { motion } from 'framer-motion';

const AdditionalSections: React.FC = () => {
  const fadeInUp = {
    initial: { y: 50, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true, margin: "-100px" }
  };

  const fadeInLeft = {
    initial: { x: -50, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    transition: { duration: 0.8, ease: ["easeOut"] },
    viewport: { once: true, margin: "-100px" }
  };

  const fadeInRight = {
    initial: { x: 50, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    transition: { duration: 0.8, ease: ["easeOut"] },
    viewport: { once: true, margin: "-100px" }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.2
      }
    },
    viewport: { once: true, margin: "-100px" }
  };

  const staggerChild = {
    initial: { y: 50, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="bg-white">
      {/* About Section */}
      <section className="py-16 md:py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInLeft}>
            <motion.h2 
              {...fadeInUp}
              transition={{ duration: 0.8, ease: ["easeOut"], delay: 0.2 }}
              className="font-elegant text-2xl md:text-3xl text-black mb-6 font-medium"
            >
              The Art of Beauty
            </motion.h2>
            <motion.p 
              {...fadeInUp}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="text-black/80 font-elegant text-base leading-relaxed mb-5"
            >
              At ÉLANÉA BEAUTY, we believe that makeup is more than enhancement — it's transformation. Our artistry transcends the ordinary, crafting looks that capture the essence of luxury and sophistication.
            </motion.p>
            <motion.p 
              {...fadeInUp}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              className="text-black/80 font-elegant text-base leading-relaxed"
            >
              Each brushstroke is deliberate, each shade carefully chosen to tell your unique story. We don't just apply makeup; we create masterpieces.
            </motion.p>
          </motion.div>
          <motion.div 
            {...fadeInRight}
            transition={{ duration: 0.8, ease: ["easeOut"], delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-stretch justify-center"
          >
            <div className="bg-gray-100 w-full rounded-2xl flex items-center justify-center overflow-hidden" style={{height: '100%'}}>
              <img src="/1.png" alt="Gallery Main" className="object-cover w-full h-full" style={{height: '100%'}} />
            </div>
          </motion.div>
        </div>
        {/* Thumbnails Row - full width below both columns */}
        <motion.div 
        {...fadeInUp}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0}}
        
        className="flex space-x-4 w-full justify-center mt-8">
          <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-gray-100 h-50 rounded-xl overflow-hidden flex-1 flex items-center justify-center">
            <img src="/2.jpg" alt="Gallery 2" className="object-cover w-full h-full" />
          </motion.div>
          <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-gray-100 h-50 rounded-xl overflow-hidden flex-1 flex items-center justify-center">
            <img src="/3.png" alt="Gallery 3" className="object-cover w-full h-full" />
          </motion.div>
          <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-gray-100 h-50 rounded-xl overflow-hidden flex-1 flex items-center justify-center">
            <img src="/4.jpg" alt="Gallery 4" className="object-cover w-full h-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              {...fadeInUp}
              className="font-elegant text-2xl md:text-3xl text-black mb-4 font-medium"
            >
              Luxury Services
            </motion.h2>
            <motion.p 
              {...fadeInUp}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-black/70 font-elegant text-base max-w-xl mx-auto"
            >
              Discover our curated selection of premium beauty services, each designed to elevate your natural radiance.
            </motion.p>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-10"
          >
            {[
              {
                title: 'Editorial Makeup',
                description: 'High-fashion looks for photoshoots, campaigns, and editorial work that demand perfection.'
              },
              {
                title: 'Bridal Artistry',
                description: 'Timeless elegance for your special day, creating looks that photograph beautifully and last all day.'
              },
              {
                title: 'Special Events',
                description: 'Red carpet worthy makeup for galas, premieres, and occasions that call for sophistication.'
              }
            ].map((service, index) => (
              <motion.div 
                key={index} 
                variants={staggerChild}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white h-48 rounded-2xl mb-5 flex items-center justify-center border border-gray-200 overflow-hidden"
                >
                  {/* Service Images: editorial.jpg, bridal.jpg, events.jpg in public folder */}
                  {index === 0 && (
                    <img src="/editorial.jpg" alt="Editorial Makeup" className="object-cover w-full h-full" />
                  )}
                  {index === 1 && (
                    <img src="/bridal.jpg" alt="Bridal Artistry" className="object-cover w-full h-full" />
                  )}
                  {index === 2 && (
                    <img src="/special.jpg" alt="Special Events" className="object-cover w-full h-full" />
                  )}
                </motion.div>
                <h3 className="font-elegant text-lg text-black mb-3 font-medium">
                  {service.title}
                </h3>
                <p className="text-black/70 font-elegant leading-relaxed text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-20 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <motion.blockquote 
          {...fadeInUp}
          className="font-elegant text-lg md:text-xl text-black/90 italic font-light leading-relaxed mb-6"
        >
          "ÉLANÉA BEAUTY transformed not just my look, but my confidence. The artistry is unmatched, and the attention to detail is extraordinary."
        </motion.blockquote>
        <motion.cite 
          {...fadeInUp}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="font-elegant text-sm text-black/70 tracking-widest"
        >
          — SOPHIA CHEN, MODEL
        </motion.cite>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            {...fadeInUp}
            className="font-elegant text-2xl md:text-3xl text-white mb-6 font-medium"
          >
            Begin Your Transformation
          </motion.h2>
          <motion.p 
            {...fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-white/80 font-elegant text-base mb-8 max-w-xl mx-auto"
          >
            Ready to experience luxury makeup artistry? Let's create something extraordinary together.
          </motion.p>
          <button 
            className="bg-white hover:bg-gray-100 text-black px-8 py-3 rounded-full font-elegant text-sm tracking-widest transition-colors"
          >
            BOOK CONSULTATION
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdditionalSections;
