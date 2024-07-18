import React from 'react';
import './App.css';
import Product from './components/Product';
import { useFetch } from './hook/useGetProducts';
import Header from './components/Menu/Header';

export default function App() {
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

  return (
    <>
      <Header />
      <h1 className='title'>STYLES AND FASHION NICOL</h1>
      <div className='titulos'>
        <h1>Electronics</h1>
        <div className='imagenes'>
          {electronics && electronics.map((product, index) => (
            <Product key={index} {...product} />
          ))}
        </div>
      </div>

      <div className='titulos'>
        <h1>Jewelery</h1>
        <div className='imagenes'>
          {jewelery && jewelery.map((product, index) => (
            <Product key={index} {...product} />
          ))}
        </div>
      </div>

      <div className='titulos'>
        <h1>Men's Clothing</h1>
        <div className='imagenes'>
          {mensclothing && mensclothing.map((product, index) => (
            <Product key={index} {...product} />
          ))}
        </div>
      </div>
     
      <div className='titulos'>
        <h1>Women's Clothing</h1>
        <div className='imagenes'>
          {womensclothing && womensclothing.map((product, index) => (
            <Product key={index} {...product} />
          ))}
        </div>
      </div>
    </>
  );
}




