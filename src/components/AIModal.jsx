import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send } from 'lucide-react';

const predefinedTexts = [
    "Generate a minimalist SVG icon",
    "Create an SVG for a futuristic tech company logo",
    "Design a playful SVG mascot",
    "Craft an elegant SVG floral design",
    "Make a retro-style SVG gaming controller icon"
];

const AIModal = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const params = { explanation: inputValue };
      const response = await axios.post('https://vectorx-backend.onrender.com/generateIcon', params);
      const formattedData = response.data.svgData;
      navigate('/uploadiconedit', { state: { formattedData } });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePredefinedText = (text) => {
    setInputValue(text);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 backdrop-blur-sm p-4"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8 rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col relative overflow-hidden"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-300"
            >
              <X size={24} />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Generate Icon</h2>
              <p className="text-gray-600 mb-6">Describe your icon idea and let AI bring it to life!</p>
            </motion.div>
            
            <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-between space-y-6">
              <div className="space-y-6 flex-grow">
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ease-in-out min-h-[150px] resize-none bg-white bg-opacity-50 backdrop-blur-sm"
                    placeholder="Describe your icon idea..."
                    required
                  />
                  <motion.span
                    initial={{ width: '0%' }}
                    animate={{ width: inputValue ? '100%' : '0%' }}
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-indigo-500" />
                    Quick Suggestions:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {predefinedTexts.map((text, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePredefinedText(text)}
                        className="bg-white bg-opacity-50 backdrop-blur-sm border border-indigo-200 rounded-full px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-100 hover:border-indigo-300 transition-all duration-300 shadow-sm"
                      >
                        {text}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  type="submit"
                  className={`w-full text-white px-6 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 ease-in-out text-lg flex items-center justify-center ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl'}`}
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
                      <span>Generating...</span>
                    </div>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Generate Icon
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIModal;