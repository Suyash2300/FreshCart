import React from "react";

const About = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
        <img
          src="/images/about-team1.png" // Replace with generated team image
          alt="FreshCart Team"
          className="rounded-lg shadow-lg w-full object-cover"
        />
        <div>
          <h2 className="text-3xl font-bold text-green-700">About FreshCart</h2>
          <p className="mt-4 leading-relaxed">
            FreshCart delivers fresh groceries straight to your doorstep —
            combining quality, speed, and convenience. From farm-fresh produce
            to your daily essentials, we make grocery shopping easier and faster
            than ever.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold text-green-700">Our Mission</h2>
          <p className="mt-4 leading-relaxed">
            At FreshCart, we believe every household deserves fresh, healthy,
            and high-quality groceries without the hassle of going to the store.
            We partner with trusted suppliers and farmers to ensure you get only
            the best — delivered within hours. Our mission goes beyond just
            delivery; we aim to bring convenience, sustainability, and joy to
            every shopping experience. From sourcing seasonal fruits and
            vegetables to providing pantry essentials, we strive to make every
            meal wholesome and every customer satisfied. FreshCart is committed
            to reducing food waste, supporting local farmers, and creating a
            seamless online grocery experience that makes life easier for
            families everywhere.
          </p>
        </div>
        <img
          src="/images/about-delivery.png" // Replace with generated delivery image
          alt="Delivery"
          className="rounded-lg shadow-lg w-64 md:w-80 lg:w-96 mx-auto object-cover"
        />
      </section>

      {/* Values Section */}
      <section className="bg-green-50 py-12">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <img
              src="/images/freshness.png" // Replace with icon
              alt="Freshness"
              className="h-12 mx-auto"
            />
            <h3 className="mt-4 font-semibold text-green-700">Freshness</h3>
            <p className="mt-2 text-gray-600">
              Sourced daily from trusted farms.
            </p>
          </div>
          <div>
            <img
              src="/images/delivery.png" // Replace with icon
              alt="Fast Delivery"
              className="h-12 mx-auto"
            />
            <h3 className="mt-4 font-semibold text-green-700">Fast Delivery</h3>
            <p className="mt-2 text-gray-600">
              Grocery delivered to your door.
            </p>
          </div>
          <div>
            <img
              src="/images/secure.png" // Replace with icon
              alt="Reliability"
              className="h-12 mx-auto"
            />
            <h3 className="mt-4 font-semibold text-green-700">Reliability</h3>
            <p className="mt-2 text-gray-600">
              Trusted by thousands of happy customers.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-green-700">
          Meet The Team
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <img
              src="/images/founder.png" // Replace with generated team member image
              alt="Jane Doe"
              className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg"
            />
            <h4 className="mt-4 font-medium">Jane Doe</h4>
            <p className="text-gray-600 text-sm">Co-Founder</p>
          </div>
          <div>
            <img
              src="/images/founder.png"
              alt="John Smith"
              className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg"
            />
            <h4 className="mt-4 font-medium">John Smith</h4>
            <p className="text-gray-600 text-sm">Co-Founder</p>
          </div>
          <div>
            <img
              src="/images/founder.png"
              alt="Sarah Lee"
              className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg"
            />
            <h4 className="mt-4 font-medium">Sarah Lee</h4>
            <p className="text-gray-600 text-sm">Operations Manager</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
