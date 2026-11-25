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

        <Link to="/">
          <div>
            <h1 className="hidden md:block font-semibold text-xl">Home</h1>
          </div></Link>

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

    </>
  );
}

export default Navbar;
