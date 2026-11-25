//CartContext.jsx

import axios from "axios";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isQuantityBoxOpen, setIsQuantityBoxOpen] = useState(false);
  const [isCartDelOpen, setIsCartDelOpen] = useState(false);
  const [cartId, setCartId] = useState("");

  async function getCart() {
    try {
      const response = await axios.get(
        `http://localhost:8001/cart/getAllCart`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      console.log("GET CART RESPONSE");
      console.log(response.data);
      
    if (response.data?.data?.items) {
      setCart(response.data?.data?.items||[]);
    } else {
      console.log("No cart data found");
      setCart([]);
    }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        isQuantityBoxOpen,
        setIsQuantityBoxOpen,
        isCartDelOpen,
        setIsCartDelOpen,
        cartId,
        setCartId,
        getCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCartContext = () => useContext(CartContext);
