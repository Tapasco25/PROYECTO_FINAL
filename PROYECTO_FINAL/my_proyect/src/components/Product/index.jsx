import React from 'react';
import './Product.css';
import { setCartProducts } from '../../utils/localStorage';

const Product = ({ id, image, title, description, price, rating, onClick }) => {
  return (
    <div className='product-card'>
      <img className='product-image' src={image} alt={title} />
      <div className='product-data'>
        <h3 className='title_products'>{title}</h3>
        <p className='description'>{description}</p>
        <div className='product-numbers'>
          <p className='price'>${price} <span className='price-before'>${(price + price / 2).toFixed(2)}</span></p>
          <p className='rating'>{rating?.rate || ''}</p>
        </div>
      </div>
      <div className='div_btn-comprar'>
        <button onClick={onClick} className='btn-comprar'>Comprar</button>
      </div>
    </div>
  );
};

export default Product;
