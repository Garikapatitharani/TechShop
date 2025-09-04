import React, { useState, useContext, useRef } from "react";
import { IoCart } from "react-icons/io5";
import { CiUser, CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProductsContext } from "../contextAPI/ProductsContext.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import { IoIosClose } from "react-icons/io";

export default function Header() {
  const { products } = useContext(ProductsContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const closeTimerRef = useRef(null);

  // Search input handler
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 1) {
      const filtered = products.filter((product) =>
        (product.name || product.title)
          .toLowerCase()
          .includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  // Dropdown hover handlers
  const handleMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setUserDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setUserDropdownOpen(false);
    }, 500); 
  };

  return (
    <>
      <div className="fixed top-0 w-full z-50 text-white bg-black flex justify-between items-center h-16 text-xl px-6">
        <Link to="/">
          <h1 className="font-bold text-white">Tech-Shop</h1>
        </Link>

        {/* Search Bar */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-full mt-5 flex-1 flex justify-center">
          {showSearch && (
            <form onSubmit={handleFormSubmit} className="relative w-1/2">
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search for products..."
                className="bg-black border border-white text-white px-3 py-2 w-full rounded-lg focus:outline-none"
              />
              <button
                type="button"
                className="absolute top-2 right-2"
                onClick={() => {
                  setShowSearch(false);
                  setSearchResults([]);
                  setSearchQuery("");
                }}
              >
                <IoIosClose size={30} />
              </button>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <ul className="absolute w-full bg-black border border-gray-700 rounded-lg mt-1 max-h-64 overflow-y-auto">
                  {searchResults.map((product) => (
                    <li key={product.id}>
                      <Link
                        to={`/product/${product.id}`}
                        onClick={() => {
                          setShowSearch(false);
                          setSearchResults([]);
                          setSearchQuery("");
                        }}
                        className="block w-full p-2 text-white cursor-pointer rounded-md hover:bg-gray-800"
                      >
                        {product.title || product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </form>
          )}
        </div>

        <ul className="flex gap-6 mt-2 items-center">
          {/* Search Icon */}
          <li>
            <button onClick={() => setShowSearch(!showSearch)}>
              <CiSearch size={28} className="mt-2" title="search" />
            </button>
          </li>

          {/* Cart */}
          <li className="relative">
            <Link
              to="/cart"
              className="relative flex items-center justify-center cursor-pointer"
            >
              <IoCart size={28} className="text-white mt-1" title="cart" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>

          {/* User */}
          <li
            className="relative list-none"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button type="button" className="flex items-center">
              <CiUser size={28} className="text-white cursor-pointer" />
            </button>

            {/* Dropdown */}
            <div
              className={`absolute right-0 top-full mt-2 w-65 bg-white text-black text-sm rounded-lg shadow-lg transition-all duration-200 z-50
                ${
                  userDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible translate-y-2"
                }`}
            >
              <div className="px-2 w-full h-50 bg-black border text-white">
                <p className="mb-1 mt-2">Hello!</p>
                <p className="text-gray-400">Access account and manage orders</p>
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setUserDropdownOpen(false);
                  }}
                  className="text-white p-2 border mb-1 "
                >
                  Login / Signup
                </button>
                <hr/>
                <p className="text-gray-400">Please Login</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-black rounded-lg p-6 w-full max-w-md shadow-lg">
            <button
              className="absolute top-3 right-3 text-white hover:text-red-500"
              onClick={() => setShowLogin(false)}
            >
              <IoIosClose size={30}  />
            </button>
            <Login setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowSignup(false)}
        >
          <div
            className="relative bg-black rounded-lg p-6 w-full max-w-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-white hover:text-red-500"
              onClick={() => setShowSignup(false)}
            >
              <IoIosClose size={30} />
            </button>
            <Signup setShowSignup={setShowSignup} setShowLogin={setShowLogin} />
          </div>
        </div>
      )}
    </>
  );
}
