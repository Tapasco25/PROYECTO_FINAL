import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/cart-context/CartContext";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  // Extraemos las funciones y el carrito del contexto global del carrito
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  // useState para almacenar los detalles de los productos del carrito
  const [productsDetails, setProductosDetails] = useState({});

  // Función asincrónica para obtener los detalles de un producto desde la API
  const fetchProductosDetails = async (productId) => {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`
    );
    const data = await response.json();
    return data; // Devuelve los detalles del producto
  };

  // useEffect para cargar los detalles de cada producto en el carrito
  useEffect(() => {
    const fetchDetails = async () => {
      const details = {}; // Objeto para almacenar los detalles de los productos
      for (const product of cart) {
        // Si el producto aún no está en los detalles, lo obtenemos de la API
        if (!details[product.id_producto]) {
          const data = await fetchProductosDetails(product.id_producto);
          details[product.id_producto] = data; // Guardamos los detalles del producto
        }
      }
      setProductosDetails(details); // Actualizamos el estado con los detalles obtenidos
    };
    // Si hay productos en el carrito, cargamos los detalles
    if (cart.length > 0) {
      fetchDetails();
    }
  }, [cart]); // Dependencia: se ejecuta cada vez que cambia el carrito
  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.title}>LIST PRODUCTS</h2>

      {/* Condicional: si el carrito está vacío, muestra un mensaje */}
      {cart?.length === 0 ? (
        <p className={styles.emptyMessage}>PRODUCT BASKET</p>
      ) : (
        <div>
          {/* Mapeamos los productos del carrito */}
          {cart.map((product) => {
            const details = productsDetails[product.id_producto]; // Detalles del producto actual
            return (
              <div key={product.id_producto} className={styles.productTarget}>
                <h3>{details?.title}</h3>
                {/* <p>{details?.description}</p> */}
                <img src={details?.image} alt={details?.title} />
                <p>{details?.price}</p>
                <p>Quantity: {product.cantidad}</p>
                <button
                  onClick={() => {
                    removeFromCart(product.id_producto);
                  }}
                  className={styles.removeButton}
                >
                  Delete from cart
                </button>
              </div>
            );
          })}
          <button
            onClick={() => {
              clearCart();
              navigate("/app");
              // location.reload();
            }}
            className={styles.clearButton}
          >
            Clear cart
          </button>
          
          <button className={styles.buttonAtras}
        type="button"
        onClick={() => {
          navigate("/");
        }}
      >
        Atrás
      </button>
          {/* <button onClick={() => buy()} className={styles.BuyButton}>
            Buy
          </button> */}
        </div>
      )}
    </div>
  );
};

export default Cart;
