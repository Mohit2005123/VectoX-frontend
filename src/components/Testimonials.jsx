// src/components/Testimonials.js
import React from "react";

const testimonials = [
  {
    name: "Jane Doe",
    feedback: "This SVG editor is incredible! It has transformed the way I design graphics.",
    image: "https://via.placeholder.com/100",
  },
  {
    name: "John Smith",
    feedback: "Easy to use and very intuitive. Highly recommend for any designer!",
    image: "https://via.placeholder.com/100",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-black text-white py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">What Our Users Say</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <p className="text-lg font-medium mb-2">{testimonial.name}</p>
              <p className="text-gray-400">{testimonial.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
