import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets"; // adjust if needed

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Slogan */}
        <div>
          <img
            src={assets.logo} // your logo path
            alt="Logo"
            className="h-12 mb-3"
          />
          <p className="text-sm text-gray-600">
            Freshness Delivered to Your Doorstep
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-primary">
                Products
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm text-gray-600">
            We deliver products according to your order request to your
            doorstep.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} FreshCart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
