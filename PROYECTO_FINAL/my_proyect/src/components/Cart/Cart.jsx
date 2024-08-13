import React from "react";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import styles from "./Cart.module.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.title}>LIST PRODUCTS</h2>
      {cart.length === 0 ? (
        <p className={styles.emptyMessage}>PRODUCT BASKET</p>
      ) : (
        <div>
          {cart.map((product, idx) => (
            <div
              key={idx}
              className={styles.productContainer}
            >
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <p>Cantidad: {product.quantity}</p>
              <button onClick={() => removeFromCart(product)} className={styles.removeButton}>
                Eliminar del carrito
              </button>
            </div>
          ))}
          <button onClick={() => clearCart()} className={styles.clearButton}>
            Vaciar carrito
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
