import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const TestimonialsSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const testimonials = [
    {
      id: 1,
      quote: "NoirNova transformed my living space into a cosmic sanctuary. Every piece feels like it was crafted by the stars themselves.",
      author: "Elena Rodriguez",
      title: "Art Collector"
    },
    {
      id: 2,
      quote: "The attention to detail is otherworldly. My Nebula Throne is not just furniture — it's a work of art that commands respect.",
      author: "Marcus Chen",
      title: "CEO"
    },
    {
      id: 3,
      quote: "I've never experienced furniture that makes me feel so connected to the universe. NoirNova is truly revolutionary.",
      author: "Sofia Andersson",
      title: "Interior Designer"
    }
  ];

  return (
    <section ref={ref} className="py-32 px-4 bg-void-black relative overflow-hidden">
      {/* Cosmic background animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-white rounded-full animate-cosmic-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-nova-silver rounded-full animate-cosmic-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-cosmic-pulse delay-2000"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2 
          className="font-serif text-5xl md:text-6xl text-white text-center mb-20 tracking-wide"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
        >
          Testimonials
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="text-center p-8 border border-nova-silver/20 rounded-lg bg-gradient-to-br from-cosmic-blue/10 to-transparent"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <blockquote className="font-serif text-xl text-white italic mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="border-t border-nova-silver/30 pt-6">
                <p className="font-sans text-nova-silver font-medium">{testimonial.author}</p>
                <p className="font-sans text-gray-400 text-sm">{testimonial.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
