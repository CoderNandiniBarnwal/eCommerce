import React from "react";
import Navbar from "./Navbar";
import ShowProduct from "./ShowProduct";
import PaginateProduct from "./PaginateProduct";

function Home() {
  return (
    <>
      <Navbar />
      <ShowProduct />
      <PaginateProduct/>
    </>
  );
}

export default Home;
