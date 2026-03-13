// Navbar.jsx

import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";

function Navbar() {
  const { cart, getCart } = useCartContext();
  const { user, logoutUser } = useAuthContext();
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "buyer" && user) {
      getCart();
    }
  }, [user?.role, user]);

  function handleLogout() {
    logoutUser();
  }

  function handleSearch() {
    navigate(`/searchproduct?search=${search}`);
  }

  return (
    <>
      <div className="flex items-center justify-between w-full px-4 py-4 bg-white shadow-md">
        <div className="w-[20%] flex justify-start">
          <img src="logo.png" alt="logo" className="w-[140px]" />
        </div>

        {/* Search + User + Cart */}
        <div className="flex items-center w-[80%] justify-end gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="hidden md:block px-4 py-2 border-2 border-gray-600 w-[180px] outline-none rounded"
          />

          <button onClick={handleSearch} className="hidden md:block">
            <FaSearch className="text-4xl" />
          </button>

          {!user?.role ? (
            <Link to="/login">
              <h2 className="font-bold text-xl md:text-2xl">Login</h2>
            </Link>
          ) : (
            <>
              <Link to="/userprofile">
                <img
                  className="hidden md:block w-[50px] h-[45px] rounded-full "
                  src={user?.picture || "dp.jpeg"}
                  alt="profile image"
                />
              </Link>

              <button onClick={handleLogout}>
                <h2 className="font-bold text-xl md:text-2xl ml-2">Logout</h2>
              </button>
            </>
          )}

          {user?.role === "buyer" && (
            <Link to="/addCart">
              <div className="hidden md:flex items-center gap-1">
                <IoCart className="text-4xl" />
                <div className="w-[23px] h-[23px] bg-black text-white flex items-center justify-center rounded-full text-base">
                  {cart.length || 0}
                </div>
              </div>
            </Link>
          )}

          {user?.role === "seller" && (
            <Link to="/addProduct">
              <h2 className="hidden md:block font-bold text-2xl">
                Add-Product
              </h2>
            </Link>
          )}
        </div>
      </div>
      <div className="relative w-full">
        <img
          src="banner.jpg"
          alt="banner"
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 flex justify-center md:justify-end items-center px-4 md:px-10">
          <div className="w-full md:w-1/2 text-center md:text-right">
            <span className="bg-orange-600 px-3 py-1 text-sm sm:text-base md:text-2xl font-semibold mb-2 inline-block">
              Best Prices
            </span>
            <h1 className="font-extrabold text-3xl sm:text-4xl md:text-6xl leading-snug">
              Incredible Prices on All Your Favorite Items
            </h1>
            <p className="text-sm sm:text-lg md:text-3xl font-bold text-gray-400 mt-2">
              Get more for less on selected brands
            </p>
            <button className="mt-4 md:mt-6 bg-orange-600 px-4 py-2 sm:px-6 sm:py-3 md:px-4 md:py-2 font-bold text-lg sm:text-xl md:text-2xl rounded-2xl">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
