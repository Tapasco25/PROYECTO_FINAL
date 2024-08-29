import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import styles from "./Cart.module.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  console.log(cart);

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.title}>LIST PRODUCTS</h2>
      {cart?.length === 0 ? (
        <p className={styles.emptyMessage}>PRODUCT BASKET</p>
      ) : (
        <div>
          {cart.map((product) => (
            <div key={product.id} className={styles.productTarget}>
              <h3>{product.name}</h3>
              <h3>{product.title}</h3>
              <img src={product.image} alt={product.name} />
              <p>{product.price}</p>
              <p>Quantity: {product.cantidad}</p>
              <button
                onClick={() => removeFromCart(product)}
                className={styles.removeButton}
              >
                Delete from cart
              </button>
            </div>
          ))}
          <button onClick={() => clearCart()} className={styles.clearButton}>
            Clear cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
