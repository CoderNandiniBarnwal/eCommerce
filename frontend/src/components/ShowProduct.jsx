// ShowProduct.jsx

import axios from "axios";
import React, { useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import DeleteProduct from "./seller/DeleteProduct";
import UpdateProduct from "./seller/UpdateProduct";
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
  const role = localStorage.getItem("role");

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/product/getAllProduct",
        );
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data.message);
      }
    };
    fetchProducts();
  }, []);

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
      console.log(error);
      toast.error(error.response?.data.message);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-10">
      {products.map((item) => (
        <div
          key={item._id}
          className="border rounded-lg shadow-md p-4 hover:shadow-xl transition h-auto flex flex-col"
        >
          <img
            src={item.picture}
            alt={item.name}
            className="h-40 w-full object-cover rounded"
          />

          <h2 className="text-lg font-bold mt-3">{item.name}</h2>

          <div className="flex justify-between mt-2">
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
            <button
              className="mt-auto block rounded border-2 border-green-400 font-bold text-yellow-600 bg-green-200 px-4 py-1 m-auto"
              onClick={() => addToCart(item._id)}
            >
              Add to cart
            </button>
          )}
        </div>
      ))}

      {/* Modals / components */}
      <DeleteProduct />
      <UpdateProduct />
      <Logout />
    </div>
  );
}

export default ShowProduct;
