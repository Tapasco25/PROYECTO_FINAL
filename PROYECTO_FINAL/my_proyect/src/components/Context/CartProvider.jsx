import { useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevState) => {
      const existingProdut = prevState.find((item) => item.id === product.id);
      if (existingProdut) {
        return prevState.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevState, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (product) => {
    setCart((prevState) => {
      const updatedCart = prevState
        .map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // Filtra los productos con cantidad 0

      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};