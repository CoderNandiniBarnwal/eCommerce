import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { IoCart } from "react-icons/io5";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div>
        <div className="flex w-[100%]">
          <div className="w-[20%] mx-[1%]">
            <img src="logo.png" alt="logo" className="w-[140px] p-0" />
          </div>

          <div className="flex justify-end items-center w-[80%] mx-[1%]">
            <FaSearch className="text-4xl ml-4" />

            <Link to="/login">
              <div className="flex ml-6">
                <FaCircleUser className="text-4xl" />
                <h2 className="font-bold text-2xl ml-1">Login</h2>
              </div>
            </Link>

            <div className="flex ml-6">
              <IoCart className="text-4xl" />
              <div className=" w-[23px] h-[23px] mt-2 bg-black text-white flex items-center justify-center rounded-full">
                0
              </div>
            </div>

            <Link to="/addProduct">
              <div className="flex ml-6">
                <h2 className="font-bold text-2xl ml-1">Add-Product</h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <img src="banner.jpg" alt="banner" className="w-[100%] relative" />
        <div className="absolute left-100 right-10 top-40  bottom-10 w-[45%] h-[340px]">
          <div className="flex justify-end">
            <span className="bg-orange-600 px-4 py-1 text-right text-2xl font-semibold">
              Best Prices
            </span>
          </div>
          <h1 className="font-extrabold text-6xl text-right mt-4">
            Incredible Prices on All Your Favorite Items
          </h1>
          <p className="font-bold text-right text-3xl text-gray-400 mt-2">
            Get more for less on selected brands
          </p>
          <div className="text-right mr-3 mt-[30px]">
            <button className="bg-orange-600 px-4 py-2 font-bold text-2xl rounded-2xl mr-[-10px]">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
