import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { toast } from "react-toastify";

function SearchProduct() {
  const [searchProducts, setSearchProducts] = useState([]);
  const [searchParams] = useSearchParams();

  const { setCart } = useCartContext();

  const page = searchParams.get("page") || 1;
  const searchQuery = searchParams.get("search") || "";
  const role = localStorage.getItem("role");

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/product/paginate",
          {
            params: {
              page,
              limit: 5,
              sort: "high",
              search: searchQuery,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        );

        console.log("Filtered Products:", response.data.data);
        setSearchProducts(response.data.data); // backend already sending array
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchProducts();
  }, [page, searchQuery]);

  // ================= ADD TO CART =================
  const addToCart = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:8001/cart/addCart/${productId}`,
        { quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      toast.success("Product added to cart");
      setCart(response.data.data.items);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-6 p-10 min-h-screen">
      {Array.isArray(searchProducts) && searchProducts.length > 0 ? (
        searchProducts.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg shadow-md p-4 hover:shadow-xl transition h-[300px]"
          >
            {/* IMAGE SAFE RENDER */}
            {item.picture &&
            (item.picture.startsWith("http") ||
              item.picture.startsWith("data:image")) ? (
              <img
                src={item.picture}
                alt={item.name}
                className="h-40 w-full object-cover rounded"
              />
            ) : (
              <div className="h-40 w-full flex items-center justify-center bg-gray-200 rounded">
                No Image
              </div>
            )}

            <h2 className="text-lg font-bold mt-3">{item.name}</h2>

            <div className="flex justify-between">
              <span className="font-bold text-green-600">₹ {item.price}</span>
            </div>

            {role === "buyer" && (
              <Link to="/addcart">
                <button
                  className="block rounded border-2 border-green-400 font-bold text-yellow-600 bg-green-200 px-4 py-1 m-auto mt-2"
                  onClick={() => addToCart(item._id)}
                >
                  Add to cart
                </button>
              </Link>
            )}
          </div>
        ))
      ) : (
        <div className="col-span-4 text-center text-xl font-semibold">
          No Products Found
        </div>
      )}

      {/* <DeleteProduct />
      <UpdateProduct />
      <Logout /> */}
    </div>
  );
}

export default SearchProduct;
