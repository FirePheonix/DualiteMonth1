import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const MaterialsSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="materials" ref={ref} className="py-32 px-4 bg-void-black">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="font-serif text-5xl md:text-6xl text-white text-center mb-20 tracking-wide"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
        >
          Materials & Craftsmanship
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="border-l-2 border-nova-silver pl-6">
              <h3 className="font-serif text-2xl text-white mb-3">Meteor Steel</h3>
              <p className="font-sans text-gray-400 leading-relaxed">
                Forged from the essence of cosmic debris, our signature metal framework combines strength with ethereal beauty.
              </p>
            </div>
            
            <div className="border-l-2 border-nova-silver pl-6">
              <h3 className="font-serif text-2xl text-white mb-3">Void Velvet</h3>
              <p className="font-sans text-gray-400 leading-relaxed">
                Luxurious textiles that capture the infinite depths of space, woven with threads that shimmer like distant stars.
              </p>
            </div>
            
            <div className="border-l-2 border-nova-silver pl-6">
              <h3 className="font-serif text-2xl text-white mb-3">Quantum Glass</h3>
              <p className="font-sans text-gray-400 leading-relaxed">
                Transparent surfaces that seem to bend light itself, creating illusions of depth and dimension.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="aspect-square rounded-lg overflow-hidden border border-nova-silver/30">
              <img 
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=600&fit=crop&crop=center"
                alt="Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-cosmic-blue/20 to-transparent rounded-lg"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MaterialsSection;
