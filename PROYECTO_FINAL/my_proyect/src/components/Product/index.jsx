import React from 'react';
import styles from './Product.module.css';


const Product = ({ id, image, title, description, price, rating, onClick }) => {
  return (
    <div className={styles.productCard}>
      <img className={styles.productImage} src={image} alt={title} />
      <div className={styles.productData}>
        <h3 className={styles.titleProducts}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.productNumbers}>
          <p className={styles.price}>${price} <span className={styles.priceBefore}>${(price + price / 2).toFixed(2)}</span></p>
          <p className={styles.rating}>{rating?.rate || ''}</p>
        </div>
      </div>
      <div className={styles.div_btnComprar}>
        <button onClick={onClick} className={styles.btnComprar}>Comprar</button>
      </div>
    </div>
  );
};

export default Product;
