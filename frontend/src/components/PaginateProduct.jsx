// PaginateProduct.jsx

import React, { useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import axios from "axios";

function PaginateProduct() {
  const {
    sort,
    setSort,
    search,
    setSearch,
    category,
    setCategory,
    products,
    setProducts,
    currentPage,
    setCurrentPage,
    totalPage,
    setTotalPage,
  } = useProductContext();

  const fetchItem = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8001/product/paginate?page=${page}&limit=8&sort=${sort}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      setProducts(response.data.data);
      //   setCurrentPage(response.data.currentPage);
      setTotalPage(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchItem(currentPage);
  }, [currentPage]);

  return (
    <div className="flex justify-center">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className="bg-red-400 rounded-l-full py-1 px-4 disabled:bg-gray-400"
      >
        Prev
      </button>
      <div className="bg-yellow-400 py-1 px-4 h-10 border-2 border-2 text-center items-center justify-center flex">
        Page {currentPage} of {totalPage}
      </div>

      <button
        disabled={currentPage === totalPage}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="bg-green-400 rounded-r-full py-1 px-4 disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
  );
}

export default PaginateProduct;
