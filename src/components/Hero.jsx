import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
  return (
    <motion.div
      className="bg-gradient-to-r from-black via-gray-900 to-black text-white min-h-screen flex flex-col justify-center items-center relative overflow-hidden"
      id="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Updated Background Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-800 via-purple-800 to-blue-800 opacity-20"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      ></motion.div>
      
      {/* Floating SVG Icons */}
      {[...Array(10)].map((_, i) => (
        <motion.svg
          key={i}
          className="absolute w-16 h-16 text-gray-500 opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: ["0%", "-20%", "0%"],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </motion.svg>
      ))}

      {/* Main Heading with Typewriter Effect */}
      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-6 text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typewriter
          words={["Edit & Export Your"]}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
        {/* Dynamic Gradient on SVG Icons */}
        <motion.span
          className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {" "}
          SVG Icons
        </motion.span>{" "}
        with Ease
      </motion.h1>

      {/* Subtext with Text Animation */}
      <motion.p
        className="text-xl md:text-2xl text-gray-400 mb-8 text-center max-w-2xl relative z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Create, modify, and export high-quality SVG icons for your next big
        project. Everything you need in one place.
      </motion.p>

      {/* Simplified Call to Action Button */}
      <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full text-xl font-semibold transition-all duration-300 hover:from-blue-600 hover:to-purple-600 hover:shadow-lg">
        Get Started
      </button>
    </motion.div>
  );
};

export default Hero;