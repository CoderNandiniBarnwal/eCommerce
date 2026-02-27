//ShowProduct.jsx

import axios from "axios";
import React, { useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import DeleteProduct from "./seller/DeleteProduct";
import UpdateProduct from "./seller/UpdateProduct";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import Logout from "./Logout";

function ShowProduct() {
  const {
    products,
    setProducts,
    setIsDelOpen,
    setIsEditOpen,
    setProductId,
    setEditName,
    setEditDescription,
    setEditPrice,
    setEditStock,
    setEditPicture,
  } = useProductContext();

  const { setCart } = useCartContext();

  function editProduct(id, name, description, price, stock, picture) {
    setIsEditOpen(true);
    setProductId(id);
    setEditName(name);
    setEditDescription(description);
    setEditPrice(price);
    setEditStock(stock);
    setEditPicture(picture);
  }
  function deleteProduct(id) {
    setIsDelOpen(true);
    setProductId(id);
  }
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/product/getAllProduct",
        );

        console.log(response.data);
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      console.log("CLICKED, ID:", productId);
      console.log(localStorage.getItem("accessToken"));

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
      console.log(response.data);
      setCart(response.data.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-6 p-10 h-[700px]">
      {products.map((item) => (
        <div
          key={item._id}
          className="border rounded-lg shadow-md p-4 hover:shadow-xl transition h-[300px]"
        >
          <img
            src={item.picture}
            alt={item.name}
            className="h-40 w-full object-cover rounded"
          />

          <h2 className="text-lg font-bold mt-3">{item.name}</h2>

          <div className="flex justify-between">
            <span className="font-bold text-green-600">₹ {item.price}</span>
          </div>

          {role === "seller" && (
            <div className="flex justify-between mt-3">
              <button
                className="font-bold text-yellow-600"
                onClick={() =>
                  editProduct(
                    item._id,
                    item.name,
                    item.description,
                    item.price,
                    item.stock,
                    item.picture,
                  )
                }
              >
                Edit
              </button>
              <button
                className="font-bold text-red-600"
                onClick={() => deleteProduct(item._id)}
              >
                Delete
              </button>
            </div>
          )}

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
      ))}
      <DeleteProduct />
      <UpdateProduct />
      <Logout />
    </div>
  );
}

export default ShowProduct;
