//Home.jsx

import React from "react";
import Navbar from "./Navbar";
import ShowProduct from "./ShowProduct";
import PaginateProduct from "./PaginateProduct";
import Footer from "./Footer";

function Home() {
  return (
    <>
      <Navbar />
      <ShowProduct />
      <PaginateProduct />
      <Footer />
    </>
  );
}

export default Home;
