import React, { useState, useEffect } from "react";
import "./Slider.css";

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para saber qué imagen se está mostrando
 
  // Función para ir a la imagen anterior
  const goToPrevious = () => {
     // Si estamos en la primera imagen, volver a la última, sino, ir a la imagen anterior
    const index = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  };
// Función para ir a la imagen siguiente
  const goToNext = () => {
    // Si estamos en la última imagen, volver a la primera, sino, ir a la imagen siguiente
    const index = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  // Cambiar imagen automáticamente cada 3 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNext();
    }, 3000); // 3000 milisegundos = 3 segundos

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, [currentIndex, images.length]);

  return (
    <div className="slider">
      <button className="slider-button prev" onClick={goToPrevious}>
        &lt;
      </button>
      <div className="slider-content">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
      </div>
      <button className="slider-button next" onClick={goToNext}>
        &gt;
      </button>
    </div>
  );
};

export default Slider;
