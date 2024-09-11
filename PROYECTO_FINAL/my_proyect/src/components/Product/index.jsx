import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import styles from "./Product.module.css";

// Componente para mostrar la información de un producto
const Product = ({ id, image, title, description, price, rating }) => {
  const { addToCart } = useContext(CartContext); // Obtener la función para añadir productos al carrito desde el contexto

  // Función que se ejecuta al hacer clic en el botón "Añadir al carrito"
  const handleClick = () => {
    // Crear un objeto con la información del producto
    const product = { image, title, description, price, rating, id };
    // Añadir el producto al carrito
    addToCart(product);
  };

  return (
    <div className={styles.productCard}>
      <img className={styles.productImage} src={image} alt={title} />
      <div className={styles.productData}>
        <h3 className={styles.titleProducts}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.productNumbers}>
          <p className={styles.price}>
            ${price}{" "}
            <span className={styles.priceBefore}>
              ${(price + price / 2).toFixed(2)}
            </span>
          </p>
          <p className={styles.rating}>{rating?.rate || ""}</p>
        </div>
      </div>
      <div className={styles.div_btnComprar}>
        <button onClick={handleClick} className={styles.btnComprar}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
