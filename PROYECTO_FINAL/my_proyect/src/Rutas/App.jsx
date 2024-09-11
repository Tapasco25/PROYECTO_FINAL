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
import img1 from "../assets/slider/img1.jpg";
import img2 from "../assets/slider/img2.jpg";
import img3 from "../assets/slider/img3.jpg";
import img4 from "../assets/slider/img4.jpg"

export default function App() {
  const images = [img1, img2, img3,img4];
  const [currentUser, setcurrentUser] = useState(null); // Estado para guardar información del usuario
  // Hook personalizado para obtener productos de diferentes categorías
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
  // Efecto para manejar el estado de autenticación del usuario
  useEffect(() => {
      // Verifica si hay un usuario autenticado
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setcurrentUser(currentUser);
      console.log(currentUser ? "Usuario encontrado" : "Usuario no encontrado");
    });

    return () => unsubscribe(); // Limpia el efecto para evitar fugas de memoria
  }, []);
  const navigate = useNavigate();
  return (
    <main>
       {/* Muestra la vista principal si hay un usuario autenticado */}
      {currentUser ? (
        <>
          <Header currentUser={currentUser}/>
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
        navigate("/") // Redirige a la página principal si no hay usuario autenticado
      )}
    </main>
  );
}
