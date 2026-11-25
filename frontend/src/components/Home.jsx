//Home.jsx

import React from "react";
import Navbar from "./Navbar";
import ShowProduct from "./ShowProduct";
import PaginateProduct from "./PaginateProduct";
import Footer from "./Footer";
import Banner from "./Banner";

function Home() {
  return (
    <>
      <Banner/>
      <ShowProduct />
      <PaginateProduct />
      <Footer />
    </>
  );
}

export default Home;
