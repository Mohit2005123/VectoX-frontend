import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { FileUp, Check, X } from 'lucide-react';

const FileUploadModal = ({ isOpen, onClose }) => {
  const [isUploaded, setIsUploaded] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    handleFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/svg+xml': ['.svg'] },
    multiple: false,
  });

  const handleFile = (file) => {
    if (file && file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = function (event) {
        const svgContent = event.target.result;
        console.log('SVG Code:', svgContent);
        convertSvgToJson(svgContent);
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a valid SVG file.');
    }
  };

  const convertSvgToJson = (svgContent) => {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
    const svgElement = svgDoc.documentElement;
    const data = {
      viewBox: svgElement.getAttribute("viewBox") || "0 0 24 24",
      path: Array.from(svgElement.getElementsByTagName("path")).map(path => path.getAttribute("d")),
      circles: Array.from(svgElement.getElementsByTagName("circle")).map(circle => ({
        cx: circle.getAttribute("cx"),
        cy: circle.getAttribute("cy"),
        r: circle.getAttribute("r"),
      })),
    };
    setIsUploaded(true);
    setTimeout(() => {
      navigate('/uploadiconedit', { state: { formattedData: data } });
    }, 1500); // Short delay to show success state before navigation
  };

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOverlayClick);
    } else {
      document.removeEventListener('mousedown', handleOverlayClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOverlayClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 backdrop-blur-sm"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 15 }}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-1 rounded-2xl shadow-2xl max-w-md w-full"
          >
            <div className="bg-gray-800 rounded-xl p-8 min-h-[550px] flex flex-col relative">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors"
              >
                <X size={24} />
              </motion.button>

              <div className="mb-6">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Upload SVG File</h2>
              </div>
              
              <AnimatePresence mode="wait">
                {!isUploaded ? (
                  <motion.div
                    key="dropzone"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    {...getRootProps()}
                    className={`border-3 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 flex-grow flex flex-col justify-center ${
                      isDragActive
                        ? 'border-purple-500 bg-gray-700'
                        : 'border-gray-600 hover:border-purple-400 bg-gray-750'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <FileUp size={80} className="mx-auto mb-6 text-blue-400" />
                    </motion.div>
                    <p className="text-gray-300 text-lg">
                      {isDragActive
                        ? "Drop the SVG file here"
                        : "Drag 'n' drop an SVG file here, or click to select one"}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="uploaded"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-750 rounded-xl p-8 text-center flex-grow flex flex-col justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      <Check size={80} className="mx-auto mb-6 text-green-400" />
                    </motion.div>
                    <p className="text-gray-200 font-semibold mb-2 text-xl">File uploaded successfully!</p>
                    <p className="text-gray-400">Redirecting to editor...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FileUploadModal;