import React, { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import styles from "./CartIcon.module.css";
import Cart from "../Cart/Cart";
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
  const { cart } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  // Contar la cantidad total de productos en el carrito
  const totalItems =
    cart?.reduce((total, item) => total + (item.cantidad || 0), 0) || 0;
  const navigate = useNavigate();
  const pagCart = () => {
    navigate("Cart");
  };

  return (
    <div className={styles.cartIcon}>
      <span onClick={pagCart}>
        <i
          className={`${styles.cartIconIcon} bi bi-cart4`}
          onClick={() => setShowCart(!showCart)}
        ></i>
      </span>

      {totalItems > 0 && (
        <span className={styles.cartIconBadge}>{totalItems}</span>
      )}
      {showCart && (
        <div className={styles.cartIconModal}>
          <Cart />
        </div>
      )}
    </div>
  );
};

export default CartIcon;
