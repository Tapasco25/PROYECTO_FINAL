import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import styles from "./Cart.module.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart, buy } = useContext(CartContext);
  const [productsDetails, setProductosDetails] = useState({});

const fetchProductosDetails = async (productId) => {
  const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
  const data = await response.json();
  return data;
}

useEffect (()=> {
  const fetchDetails = async () => {
    const details = {};
    for (const product of cart) {
      if (!details[product.id_producto]){
        const data = await fetchProductosDetails(product.id_producto);
        details[product.id_producto] = data;
      }
    } 
    setProductosDetails(details);
  };
  if (cart.length > 0){
    fetchDetails();
  }
}, [cart]);
  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.title}>LIST PRODUCTS</h2>
      {cart?.length === 0 ? (
        <p className={styles.emptyMessage}>PRODUCT BASKET</p>
      ) : (
        <div>
          {cart.map((product) => {
            const details = productsDetails[product.id_producto];
            return (
              <div key={product.id_producto} className={styles.productTarget}>
                <h3>{details?.title}</h3>
                {/* <p>{details?.description}</p> */}
                <img src={details?.image} alt={details?.title} />
                <p>{details?.price}</p>
                <p>Quantity: {product.cantidad}</p>
                <button
                  onClick={() => removeFromCart(product.id_producto)}
                  className={styles.removeButton}
                >
                  Delete from cart
                </button>
              </div>
            );
          })}
          <button onClick={() => clearCart()} className={styles.clearButton}>
            Clear cart
          </button>
          <button onClick={() => buy()} className={styles.BuyButton}>
            Buy
          </button>

        </div>
      )}
    </div>
  );
};

export default Cart;
