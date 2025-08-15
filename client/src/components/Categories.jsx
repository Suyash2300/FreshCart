import React from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Categories = () => {
  const { navigate } = useAppContext();
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium mb-6">Categories</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group cursor-pointer flex flex-col items-center justify-between text-center
                     rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg
                     p-6 h-44"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="group-hover:scale-105 transition-transform duration-300 w-20 h-20 object-contain"
            />
            <p className="text-base font-medium line-clamp-2 mt-3">
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
