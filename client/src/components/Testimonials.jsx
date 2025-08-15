import React from "react";

const testimonials = [
  {
    name: "Alice Johnson",
    role: "Entrepreneur",
    photo: "https://i.pravatar.cc/150?img=32",
    testimonial:
      "FreshCart made shopping so effortless. The delivery is fast and reliable. Highly recommended!",
  },
  {
    name: "Mark Thompson",
    role: "Software Engineer",
    photo: "https://i.pravatar.cc/150?img=12",
    testimonial:
      "I love the user-friendly interface and amazing customer service. FreshCart is my go-to for groceries!",
  },
  {
    name: "Sophia Lee",
    role: "Designer",
    photo: "https://i.pravatar.cc/150?img=45",
    testimonial:
      "High-quality products and quick delivery. I can't imagine shopping anywhere else!",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center transform transition hover:-translate-y-2 hover:shadow-xl"
            >
              <img
                src={item.photo}
                alt={item.name}
                className="w-20 h-20 rounded-full object-cover mb-4"
              />
              <p className="text-gray-600 mb-4">"{item.testimonial}"</p>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <span className="text-sm text-gray-500">{item.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
