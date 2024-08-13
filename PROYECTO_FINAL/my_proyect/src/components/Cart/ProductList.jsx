import React from "react";
import { products } from "../products";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import styles from "./ProductList.module.css";

const ProductList = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className={styles.productListContainer}>
      <h2 className={styles.title}>Product List</h2>
      {products.map((product) => (
        <div className={styles.productContainer} key={product.id}>
          <h2>{product.name}</h2>
          {/* <img src={product.image} alt={product.title} /> */}
          <p>{product.description}</p>
          <p>{product.price}</p>
          <button 
            className={styles.addToCartButton}
            onClick={() => addToCart(product)}
          >
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
