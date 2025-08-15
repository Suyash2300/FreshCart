import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const {
    currency,
    addToCart,
    removeFromCart,
    cartItems,
    axios,
    user,
    navigate,
  } = useAppContext(); // ✅ Add navigate

  // Calculate average rating
  const [averageRating, setAverageRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (product.ratings?.length) {
      const avg =
        product.ratings.reduce((acc, r) => acc + r.rating, 0) /
        product.ratings.length;
      setAverageRating(avg);
    }
  }, [product.ratings]);

  const handleRating = async (rate) => {
    if (!user) return alert("Login to rate");
    try {
      await axios.post("/api/product/rate", {
        productId: product._id,
        userId: user._id,
        rating: rate,
      });
      alert("Rating submitted!");
    } catch (error) {
      console.log(error);
      alert("Error submitting rating");
    }
  };

  return (
    <div
      onClick={() =>
        navigate(`/products/${product.category.toLowerCase()}/${product._id}`)
      }
      className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white w-full h-full cursor-pointer"
    >
      {/* Product Image */}
      <div className="group flex items-center justify-center px-2 mb-2">
        <img
          className="group-hover:scale-105 transition w-full max-h-32 object-contain"
          src={product.image[0]}
          alt={product.name}
        />
      </div>

      {/* Product Info */}
      <div className="text-gray-500/60 text-sm space-y-1">
        <p>{product.category}</p>
        <p className="text-gray-700 font-medium text-lg truncate">
          {product.name}
        </p>

        {/* Star Rating */}
        <div
          className="flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          {Array(5)
            .fill("")
            .map((_, i) => {
              const starFilled = i < Math.round(hoverRating || averageRating);
              return (
                <img
                  key={i}
                  src={starFilled ? assets.star_icon : assets.star_dull_icon}
                  className="w-3.5 h-3.5 cursor-pointer"
                  alt=""
                  onMouseEnter={() => setHoverRating(i + 1)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleRating(i + 1)}
                />
              );
            })}
          <p>({product.ratings?.length || 0})</p>
        </div>

        {/* Price & Cart */}
        <div
          className="flex items-end justify-between mt-2"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="md:text-xl text-base font-medium text-primary">
            {currency}
            {product.offerPrice}{" "}
            <span className="text-gray-500/60 md:text-sm text-xs line-through">
              {currency}
              {product.price}
            </span>
          </p>
          {!cartItems[product._id] ? (
            <button
              className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded cursor-pointer"
              onClick={() => addToCart(product._id)}
            >
              Add
            </button>
          ) : (
            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
              <button onClick={() => removeFromCart(product._id)}>-</button>
              <span className="w-5 text-center">{cartItems[product._id]}</span>
              <button onClick={() => addToCart(product._id)}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
