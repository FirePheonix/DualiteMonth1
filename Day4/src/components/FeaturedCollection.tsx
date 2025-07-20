import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const FeaturedCollection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const products = [
    {
      id: 1,
      name: "Nebula Throne",
      description: "Executive chair inspired by swirling galaxies",
      price: "$4,999",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop&crop=center"
    },
    {
      id: 2,
      name: "Cosmic Dining Table",
      description: "Handcrafted with meteor steel inlays",
      price: "$8,999",
      image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=600&h=600&fit=crop&crop=center"
    },
    {
      id: 3,
      name: "Void Sofa",
      description: "Luxury seating in deep space velvet",
      price: "$12,999",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop&crop=center"
    },
    {
      id: 4,
      name: "Stellar Bookshelf",
      description: "Floating shelves defying gravitational norms",
      price: "$6,999",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=center"
    }
  ];

  return (
    <section id="featured-collection" ref={ref} className="py-32 px-4 bg-void-black">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="font-serif text-5xl md:text-6xl text-white text-center mb-20 tracking-wide"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
        >
          Featured Collection
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="group relative bg-gradient-to-br from-cosmic-blue/20 to-transparent border border-nova-silver/30 rounded-lg overflow-hidden hover:border-white/50 transition-all duration-500 hover:shadow-2xl hover:shadow-white/10"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              <div className="p-6">
                <h3 className="font-serif text-xl text-white mb-2">{product.name}</h3>
                <p className="font-sans text-gray-400 text-sm mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-sans text-lg text-nova-silver font-medium">{product.price}</span>
                  <button className="px-4 py-2 border border-nova-silver text-nova-silver text-sm hover:border-white hover:text-white transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
