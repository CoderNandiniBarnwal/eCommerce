// AddCart.jsx

import React, { useEffect } from "react";
import { useCartContext } from "../../context/CartContext";
import axios from "axios";
import DeleteCart from "./DeleteCart";

function AddCart() {
  const { cart, setCart, setIsCartDelOpen, setCartId, getCart } =
    useCartContext();
  console.log(cart);

  useEffect(() => {
    getCart();
  }, []);

  if (!cart || cart.length === 0) {
    return <p className="text-center mt-10 text-lg">Your cart is empty</p>;
  }
  const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const handleQuantity = async (productId, quantityChange) => {
    try {
      const response = await axios.put(
        `http://localhost:8001/cart/updateCart/${productId}`,
        {
          quantity: quantityChange,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      setCart([...response.data.data.items]);
    } catch (error) {
      console.log(error);
    }
  };

  function deleteCart(id) {
    setIsCartDelOpen(true);
    setCartId(id);
  }
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6 text-center">My Cart</h1>
      <div className="flex flex-wrap gap-8">
        {cart.map((item) => (
          <div
            key={item._id || item.productId}
            className="border p-4 mb-4 rounded gap-4 items-center w-[23%]"
          >
            <img
              src={item.productId.picture}
              alt={item.productId.name}
              className="w-24 h-24 object-cover rounded w-[100%] h-[200px]"
            />

            <div className="flex-1">
              <h2 className="text-lg font-bold">{item.productId.name}</h2>
              <p>{item.productId.description}</p>
              <p>Price: ₹{item.productId.price}</p>
              <p>Stock: {item.productId.stock}</p>
              <div className="flex">
                <p className="mt-1">Quantity: {item.quantity}</p>
                <button
                  className="px-2 py-1 bg-green-400 text-white rounded font-bold ml-[10px]"
                  onClick={() => handleQuantity(item.productId._id, 1)}
                >
                  +
                </button>
                <button
                  className="px-2 py-1 bg-red-400 text-white rounded disabled:opacity-50 font-bold ml-[10px]"
                  onClick={() => handleQuantity(item.productId._id, -1)}
                >
                  -
                </button>
              </div>
              <p className="font-semibold ">
                Total: ₹{item.price * item.quantity}
              </p>

              <div
                className="text-center py-1 bg-yellow-400 text-white rounded font-bold mt-2 w-[130px]"
                onClick={() => deleteCart(item.productId._id)}
              >
                Delete
              </div>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mt-6 ">Grand Total: ₹{total}</h2>
      <DeleteCart />
    </div>
  );
}

export default AddCart;
