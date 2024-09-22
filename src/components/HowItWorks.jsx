import React from 'react';

const HowItWorks = () => {
  return (
    <section className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-16">
      <div className="container mx-auto px-6 md:px-12 bg-grid">
        <h2 className="text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-600 animate-text-gradient">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <Step
            step="1"
            title="Upload Your SVG"
            description="Easily upload your SVG files to get started."
          />
          <Step
            step="2"
            title="Edit Your SVG"
            description="Use our intuitive tools to modify your SVG as needed."
          />
          <Step
            step="3"
            title="Export Your Design"
            description="Download your edited SVG files instantly."
          />
          <Step
            step="4"
            title="Save Your Work"
            description="Save your design in your account for future use."
          />
          <Step
            step="5"
            title="Share with Others"
            description="Share your designs directly with others or on social media."
          />
          <Step
            step="6"
            title="Explore More Features"
            description="Discover more advanced features to enhance your SVG editing experience."
          />
        </div>
      </div>
    </section>
  );
};

const Step = ({ step, title, description }) => (
  <div className="relative bg-black p-8 rounded-2xl shadow-lg overflow-hidden">
    {/* Content */}
    <div className="relative z-10">
      <h3 className="text-3xl font-semibold mb-4 text-white">
        Step {step}: {title}
      </h3>
      <p className="text-gray-300">{description}</p>
    </div>
  </div>
);

export default HowItWorks;
