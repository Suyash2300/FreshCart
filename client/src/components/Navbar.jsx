import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        setOpen(false);
        setProfileMenuOpen(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  const navLinkClasses =
    "hover:text-primary-dull transition-colors duration-200";
  const buttonClasses =
    "cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition-colors duration-200 text-white rounded-full";

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      {/* Logo */}
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img
          src={assets.logo}
          alt="Website Logo"
          className="h-7 sm:h-9 w-auto object-contain"
        />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/" className={navLinkClasses}>
          Home
        </NavLink>
        <NavLink to="/products" className={navLinkClasses}>
          All Products
        </NavLink>
        <NavLink to="/contact" className={navLinkClasses}>
          Contact
        </NavLink>

        {/* Search bar */}
        <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full max-w-xs hover:border-primary-dull transition-colors duration-200">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
            aria-label="Search products"
          />
          <img src={assets.search_icon} alt="Search" className="w-4 h-4" />
        </div>

        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer hover:opacity-90"
        >
          <img src={assets.cart_icon} alt="Cart" className="w-7 opacity-80" />
          <button
            type="button"
            className="absolute -top-1 -right-1 flex items-center justify-center text-xs text-white bg-primary w-[18px] h-[18px] rounded-full"
          >
            {getCartCount()}
          </button>
        </div>

        {/* Auth Buttons */}
        {user ? (
          <div className="relative">
            {/* Profile image */}
            <button
              onClick={() => setProfileMenuOpen((prev) => !prev)}
              className="flex items-center focus:outline-none"
            >
              <img
                src={assets.profile_icon} // Replace with user.avatar if available
                alt="User"
                className="w-9 h-9 rounded-full border border-gray-300"
              />
            </button>

            {/* Dropdown Menu */}
            {profileMenuOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden z-50">
                <li>
                  <NavLink
                    to="/my-orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    My Orders
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowUserLogin(true)}
            className={buttonClasses}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="sm:hidden"
        type="button"
      >
        <img src={assets.menu_icon} alt="Menu" className="w-6 h-6" />
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-4 px-5 text-sm md:hidden z-50`}
      >
        {/* Mobile Search Bar */}
        <div className="w-full mb-2 border border-gray-300 rounded-full px-4 py-2 flex items-center gap-2 hover:border-primary-dull transition-colors duration-200">
          <input
            type="text"
            placeholder="Search products"
            className="w-full bg-transparent outline-none placeholder-gray-500"
            aria-label="Search products"
          />
          <img src={assets.search_icon} alt="Search" className="w-4 h-4" />
        </div>

        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className={`w-full py-2 ${navLinkClasses}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          onClick={() => setOpen(false)}
          className={`w-full py-2 ${navLinkClasses}`}
        >
          All Products
        </NavLink>
        {user && (
          <NavLink
            to="/my-orders"
            onClick={() => setOpen(false)}
            className={`w-full py-2 ${navLinkClasses}`}
          >
            My Orders
          </NavLink>
        )}
        <NavLink
          to="/contact"
          onClick={() => setOpen(false)}
          className={`w-full py-2 ${navLinkClasses}`}
        >
          Contact
        </NavLink>

        {/* Add to Cart */}
        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer hover:opacity-90"
        >
          <img
            src={assets.cart_icon}
            alt="Cart"
            className="w-9 h-9 opacity-80"
          />
          <span className="absolute -top-1.5 -right-2 flex items-center justify-center text-xs text-white bg-primary w-5 h-5 rounded-full">
            {getCartCount()}
          </span>
        </div>

        {user ? (
          <button
            onClick={handleLogout}
            className={`w-full mt-2 ${buttonClasses} text-sm`}
            type="button"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              setShowUserLogin(true);
              setOpen(false);
            }}
            className={`w-full mt-2 ${buttonClasses} text-sm text-center`}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
