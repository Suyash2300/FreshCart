import React from "react";
import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <div className="relative mt-24">
      {/* Desktop View (Image + Overlay) */}
      <div className="hidden md:block relative w-full">
        <img
          src={assets.bottom_banner_image}
          alt="banner"
          className="w-full object-cover"
        />
        <div className="absolute inset-0 flex justify-end items-center px-24">
          <div className="bg-white/85 backdrop-blur-md rounded-2xl p-6 shadow-lg max-w-lg">
            <h1 className="text-3xl font-semibold text-primary mb-6">
              Why We Are The Best?
            </h1>
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 mt-4">
                <img src={feature.icon} alt={feature.title} className="w-11" />
                <div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-green-500/70 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View (Stacked) */}
      <div className="md:hidden flex flex-col  items-center px-6">
        <img
          src={assets.bottom_banner_image_sm}
          alt="banner"
          className="w-full object-cover rounded-xl"
        />
        <div className="bg-[#d6f5e1] rounded-2xl p-6 shadow-lg -mt-8 z-10 w-full">
          <h1 className="text-2xl font-semibold text-primary mb-6 text-center">
            Why We Are The Best?
          </h1>
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4 mt-4">
              <img src={feature.icon} alt={feature.title} className="w-9" />
              <div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-green-500/70 text-xs">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
