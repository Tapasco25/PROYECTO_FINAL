import React, { useState } from "react";
import "../App.css";
import Product from "../components/Product";
import { useFetch } from "../hook/useGetProducts";
import Header from "../components/Menu/Header";
import RegisterForm from "../components/Register";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../fireBase/Credenciales";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "../components/Silder/Slider";
import ropa1 from "../assets/slider/ropa1.jpg";
import ropa2 from "../assets/slider/ropa2.jpg";
import ropa3 from "../assets/slider/ropa3.jpg";

export default function App() {
  const images = [ropa1, ropa2, ropa3];
  const [currentUser, setcurrentUser] = useState(null);
  const { data: electronics } = useFetch(
    "https://fakestoreapi.com/products/category/electronics"
  );

  const { data: jewelery } = useFetch(
    "https://fakestoreapi.com/products/category/jewelery"
  );

  const { data: mensclothing } = useFetch(
    "https://fakestoreapi.com/products/category/men's%20clothing"
  );

  const { data: womensclothing } = useFetch(
    "https://fakestoreapi.com/products/category/women's%20clothing"
  );
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setcurrentUser(currentUser);
      console.log(currentUser ? "Usuario encontrado" : "Usuario no encontrado");
    });

    return () => unsubscribe(); // Limpia el efecto para evitar fugas de memoria
  }, []);
  const navigate = useNavigate();
  return (
    <main>
      {currentUser ? (
        <>
          <Header />
          <main className="main">
            {/* <h1 className="title">STYLES AND FASHION NICOL</h1> */}
            <Slider images={images} />

            <div className="category" name="electronics">
              <h1 className="subtitle">Electronics</h1>
              <div className="product-container">
                {electronics &&
                  electronics.map((product, index) => (
                    <Product key={index} {...product} />
                  ))}
              </div>
            </div>

            <div className="category" name="jewelery">
              <h1 className="subtitle">Jewelery</h1>
              <div className="product-container">
                {jewelery &&
                  jewelery.map((product, index) => (
                    <Product key={index} {...product} />
                  ))}
              </div>
            </div>

            <div className="category" name="mensclothing">
              <h1 className="subtitle">Men's Clothing</h1>
              <div className="product-container">
                {mensclothing &&
                  mensclothing.map((product, index) => (
                    <Product key={index} {...product} />
                  ))}
              </div>
            </div>

            <div className="category" name="womensclothing">
              <h1 className="subtitle">Women's Clothing</h1>
              <div className="product-container">
                {womensclothing &&
                  womensclothing.map((product, index) => (
                    <Product key={index} {...product} />
                  ))}
              </div>
            </div>
          </main>
        </>
      ) : (
        navigate("/")
      )}
    </main>
  );
}
