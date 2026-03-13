import React from "react";
import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <div>
      <div className="h-screen w-full bg-black dark:bg-gray-100">
        <div className="h-full lg:w-[60%] sm:w-[80%] xs:w-[90%] mx-auto flex gap-8 items-center">
          <div className="flex flex-col gap-4 text-white dark:text-black p-4 rounded-lg border border-green-300 shadow-xl shadow-green-400/30">
            <h5 className="text-sm text-green-500 font-semibold">
              eCommerce Team
            </h5>
            <div className="w-full flex gap-2 items-center justify-around">
              <div className="text-5xl font-semibold uppercase font-serif">
                Thank You
              </div>
              <hr className="w-[50%] h-1 rounded-full border-t-green-500 bg-green-500" />
            </div>
            <p className="text-sm">
              Thank you for shopping with us! We truly appreciate your trust in
              our store. Your order has been placed successfully and will be
              processed soon. We hope you enjoy your purchase and have a great
              experience with us. We look forward to serving you again in the
              future!
            </p>
            <Link to="/">
              <div className="flex gap-4 justify-center">
                <button className="w-full px-4 py-1 border-2 border-green-500 rounded-sm">
                  Home Page
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
