import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="relative">
      {/* Desktop Banner */}
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="w-full hidden md:block"
      />
      {/* Mobile Banner */}
      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="w-full md:hidden"
      />

      {/* Text & Buttons Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center md:items-start md:justify-center pb-8 md:pb-0 px-4 sm:px-6 md:pl-18 lg:pl-24">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-[18rem] sm:max-w-[22rem] md:max-w-[26rem] lg:max-w-[32rem] leading-tight lg:leading-[3.75rem]">
          Freshness You Can Trust, Savings You Will Love!
        </h1>

        <div className="flex flex-col sm:flex-row items-center mt-6 gap-4 font-medium">
          {/* Shop Now button */}
          <Link
            to="/products"
            className="group flex items-center gap-2 px-6 sm:px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer"
          >
            Shop now
            <img
              src={assets.white_arrow_icon}
              alt="arrow"
              className="sm:hidden transition group-hover:translate-x-1"
            />
          </Link>

          {/* Explore Deals button */}
          <Link
            to="/products"
            className="group hidden sm:flex items-center gap-2 px-7 md:px-9 py-3 cursor-pointer"
          >
            Explore deals
            <img
              src={assets.black_arrow_icon}
              alt="arrow"
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
