import React from 'react';
import { FloatingDockLinks } from './FloatingDockDemo';
const AboutTheDev = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-gradient-to-br from-black to-gray-900 text-white p-10" id="about">
      <div className="relative group w-full max-w-4xl p-8 bg-gradient-to-br from-black via-gray-800 to-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 opacity-60 group-hover:opacity-90 transition duration-1000 group-hover:duration-500 bg-gradient-to-r from-gray-700 via-black to-gray-800 blur-xl"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/3">
            {/* Developer Avatar */}
            <img 
              src='/images/myImage.jpeg'
              alt="Developer Avatar" 
              className="w-full rounded-full shadow-lg border-4 border-gray-700 transition transform group-hover:scale-105 duration-500"
            />
          </div>

          <div className="w-full md:w-2/3 text-center md:text-left">
            {/* Introduction */}
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-300">
              Hello, I'm Mohit Mongia
            </h1>
            
            {/* Brief Info */}
            <p className="mt-4 text-lg text-gray-400">
              A dedicated developer with a passion for creating premium user interfaces, engaging web experiences, and optimized code. My expertise lies in React, Tailwind CSS, and modern web development, delivering high-quality products.
            </p>

            {/* Animated Line Under Title */}
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-500 to-yellow-300 mt-4 mb-6 group-hover:w-64 transition-all duration-500"></div>

            {/* Skills */}
            <ul className="flex justify-center md:justify-start gap-4 mt-4 text-sm font-medium text-gray-400">
              <li className="hover:text-yellow-400 transition duration-300">React</li>
              <li className="hover:text-yellow-400 transition duration-300">Next.js</li>
              <li className="hover:text-yellow-400 transition duration-300">Tailwind CSS</li>
              <li className="hover:text-yellow-400 transition duration-300">Node.js</li>
            </ul>
          </div>
        </div>
        
      </div>
      <FloatingDockLinks></FloatingDockLinks>
    </section>
  );
};

export default AboutTheDev;
