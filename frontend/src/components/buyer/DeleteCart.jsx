//DeleteCart.jsx
import React from "react";
import { useCartContext } from "../../context/CartContext";
import axios from "axios";
import { toast } from "react-toastify";

function DeleteCart() {
  const { cart, setCart, isCartDelOpen, setIsCartDelOpen, cartId } =
    useCartContext();

  async function deleteItem(id) {
    console.log("Product ID from context:", id);
    try {
      const response = await axios.delete(
        `http://localhost:8001/cart/deleteCart/${id}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      setCart(cart.filter((itemToDlt) => itemToDlt.productId._id !== id));
      toast.success("Product deleted from cart");
      console.log(response);
      setIsCartDelOpen(false);
    } catch (error) {
      console.log(error); 
    }
  }
  return (
    <>
      {isCartDelOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
            <h2 className="text-lg font-semibold mb-2">Are you sure?</h2>

            <p className="text-gray-600 mb-5">
              You want to delete this product?
            </p>

            <div className="flex justify-between px-6">
              <button
                onClick={() => setIsCartDelOpen(false)}
                className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => deleteItem(cartId)}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteCart;
