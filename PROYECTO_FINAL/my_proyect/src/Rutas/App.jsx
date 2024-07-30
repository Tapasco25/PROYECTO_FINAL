import React, { useState } from 'react';
import '../App.css';
import Product from '../components/Product';
import { useFetch } from '../hook/useGetProducts';
import Header from '../components/Menu/Header';
import RegisterForm from '../components/Register';
import { getCartProducts, setCartProducts } from '../utils/localStorage';

export default function App() {
  const [openRegister, setOpenRegister] = useState(false);
  const [productsInCart, setProductsInCart] = useState(getCartProducts())

  const mostrarRegister = () => {
    setOpenRegister(!openRegister);
  }


  const { data: electronics } = useFetch(
    'https://fakestoreapi.com/products/category/electronics'
  );

  const { data: jewelery } = useFetch(
    'https://fakestoreapi.com/products/category/jewelery'
  );

  const { data: mensclothing } = useFetch(
    "https://fakestoreapi.com/products/category/men's%20clothing"
  );

  const { data: womensclothing } = useFetch(
    "https://fakestoreapi.com/products/category/women's%20clothing"
  );

  const addProductCart = (product) => {
    const isAdded = productsInCart.some((pic) => product.id == pic.id)

    const newProducstInCart = isAdded ? productsInCart.map((pic) => ({ ...pic, quantity: pic.id == product.id ? pic.quantity + 1 : pic.quantity })) : [...productsInCart, { ...product, quantity: 1 }]

    setProductsInCart(newProducstInCart)
    setCartProducts(newProducstInCart)
  }

  return (
    <>
      <Header productsInCart={productsInCart} mostrarRegister={mostrarRegister} />
      {openRegister && <RegisterForm />}
      <h1 className='title'>STYLES AND FASHION NICOL</h1>


      <div className='category' name='electronics'>
        <h1>Electronics</h1>
        <div className='product-container'>
          {electronics && electronics.map((product, index) => (
            <Product onClick={() => addProductCart(product)} key={index} {...product} />
          ))}
        </div>
      </div>

      <div className='category' name='jewelery'>
        <h1>Jewelery</h1>
        <div className='product-container'>
          {jewelery && jewelery.map((product, index) => (
            <Product onClick={() => addProductCart(product)} key={index} {...product} />
          ))}
        </div>
      </div>

      <div className='category' name='mensclothing'>
        <h1>Men's Clothing</h1>
        <div className='product-container'>
          {mensclothing && mensclothing.map((product, index) => (
            <Product onClick={() => addProductCart(product)} key={index} {...product} />
          ))}
        </div>
      </div>

      <div className='category' name='womensclothing'>
        <h1>Women's Clothing</h1>
        <div className='product-container'>
          {womensclothing && womensclothing.map((product, index) => (
            <Product onClick={() => addProductCart(product)} key={index} {...product} />
          ))}
        </div>
      </div>

    </>
  );
}
