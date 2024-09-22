import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  return (
    <section className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative">
        <motion.h2 
          className="text-6xl font-bold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <FeatureCard
            title="Easy SVG Editing"
            description="Modify SVGs with intuitive tools and easy controls."
            icon="✏️"
          />
          <FeatureCard
            title="Real-time Export"
            description="Download your custom icons instantly after editing."
            icon="⚡"
          />
          <FeatureCard
            title="Responsive Design"
            description="Fully responsive and user-friendly across all devices."
            icon="📱"
          />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
      </div>
    </section>
  );
};

const FeatureCard = ({ title, description, icon }) => (
  <motion.div 
    className="relative bg-gray-800 p-8 rounded-2xl text-center transition-all duration-300 hover:shadow-2xl shadow-lg overflow-hidden group"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    whileHover={{ scale: 1.05 }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
    <div className="relative z-10">
      <div className="text-5xl mb-6">{icon}</div>
      <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-gray-300 mb-6">{description}</p>
      {/* <motion.button 
        className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:from-green-500 hover:to-blue-600"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Learn More
      </motion.button> */}
    </div>
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"></div>
  </motion.div>
);

export default Features;