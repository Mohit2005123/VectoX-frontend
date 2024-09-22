import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
// import icons from '../data/icons.json';
import icons from '../data/newoutput.json';
const IconModal = ({ isModalOpen, setIsModalOpen, setSelectedIcon }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIcons = Object.keys(icons).filter(iconName =>
    iconName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Disable scrolling when the modal is open
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Clean up the effect when the component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20 pt-40"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-4xl h-screen max-h-screen overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Choose an Icon</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-700"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            </div>

            {/* Icons Grid */}
            <div className="grid grid-cols-5 gap-4 h-[70vh] overflow-y-auto pt-6">
              <AnimatePresence>
                {filteredIcons.length > 0 ? (
                  filteredIcons.map((iconName) => (
                    <motion.button
                      key={iconName}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition transform-gpu hover:shadow-md mx-2"
                      onClick={() => {
                        setSelectedIcon(iconName);
                        setIsModalOpen(false);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox={icons[iconName].viewBox}
                        width="100%"
                        height="100%"
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='0.2'
                      >
                        {icons[iconName].path.map((path, index) => (
                          <path key={index} d={path}/>
                        ))}
                        {Array.isArray(icons[iconName].circles) && icons[iconName].circles.map((circle, index) => (
                          <circle
                            key={`circle-${index}`}
                            cx={circle.cx}
                            cy={circle.cy}
                            r={circle.r}
                          />
                        ))}
                      </svg>
                      <p className="mt-2 text-sm text-center text-gray-700 truncate">{iconName}</p>
                    </motion.button>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-500">
                    No icons found
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IconModal;
