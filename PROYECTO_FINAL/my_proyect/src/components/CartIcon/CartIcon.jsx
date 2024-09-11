import React, { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import styles from "./CartIcon.module.css";
import Cart from "../Cart/Cart";
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
  const { cart } = useContext(CartContext); // Utilizamos useContext para acceder al carrito desde el CartContext.
  const [showCart, setShowCart] = useState(false); // Definimos un estado local showCart para controlar la visibilidad del carrito en forma de modal.

  // Contar la cantidad total de productos en el carrito
  const totalItems =
    cart?.reduce((total, item) => total + (item.cantidad || 0), 0) || 0;
  const navigate = useNavigate(); // Inicializamos useNavigate para la navegación programática.
  // Función para redirigir a la página del carrito cuando se hace clic en el icono del carrito.
  const pagCart = () => {
    navigate("Cart");
  };

  return (
    <div className={styles.cartIcon}>
      {/* Icono del carrito. Al hacer clic, navega a la página del carrito y alterna la visibilidad del modal. */}
      <span onClick={pagCart}>
        <i
          className={`${styles.cartIconIcon} bi bi-cart4`}
          onClick={() => setShowCart(!showCart)} // Cambia el estado de showCart al hacer clic, mostrando u ocultando el carrito modal.
        ></i>
      </span>
      {/* Si hay artículos en el carrito, muestra una insignia con el número total de artículos. */}
      {totalItems > 0 && (
        <span className={styles.cartIconBadge}>{totalItems}</span>
      )}
      {/* Si el estado showCart es verdadero, muestra el componente Cart como un modal. */}
      {showCart && (
        <div className={styles.cartIconModal}>
          <Cart /> {/* Renderiza el contenido del carrito en forma de modal. */}
        </div>
      )}
    </div>
  );
};

export default CartIcon;
