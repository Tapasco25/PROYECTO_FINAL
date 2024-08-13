import React, { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import styles from "./CartIcon.module.css";
import Cart from "../Cart/Cart";

const CartIcon = () => {
  const { cart } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  // Contar la cantidad total de productos en el carrito
  const totalItems = cart?.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className={styles.cartIcon}>
      <i
        className={`${styles.cartIconIcon} bi bi-cart4`}
        onClick={() => setShowCart(!showCart)}
      ></i>

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
