import React from 'react'
import './Product.css'

const Product = ({id, image, title, description, price, rating}) => {
    return (
        <div className='product-card'>
            <img src={image} alt="" />
            <div className='product-data'>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className='product-numbers'>
                    <p className='price'>${price} <span className='price-before'>{price + price/2}</span> </p>
                    <p className='rating' >{rating?.rate | ''}</p>
                </div>
            </div>
            <button>Comprar</button>
        </div>
    )
}

export default Product