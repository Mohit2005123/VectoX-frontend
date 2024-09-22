import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How do I use the SVG editor?",
    answer: "Simply upload your SVG file and start editing using the toolbar options. Our intuitive interface allows you to manipulate shapes, colors, and paths with ease.",
  },
  {
    question: "Can I export my edited SVG?",
    answer: "Yes, you can export your SVG in various formats directly from the editor. We support SVG, PNG, and JPEG formats to suit your needs.",
  },
  {
    question: "Is there a limit to the file size I can upload?",
    answer: "We accept SVG files up to 10MB in size. This limit ensures optimal performance while still accommodating most design needs.",
  },
  {
    question: "Can I collaborate with others on my SVG projects?",
    answer: "Currently, we don't offer real-time collaboration. However, you can easily share your exported SVGs with team members for feedback and iterations.",
  },
];

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        className="w-full text-left p-6 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-blue-400">{faq.question}</h3>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-purple-400"
          >
            ▼
          </motion.span>
        </div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="px-6 pb-6"
          >
            <p className="text-gray-300">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-black text-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;