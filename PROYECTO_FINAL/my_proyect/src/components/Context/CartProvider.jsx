import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../fireBase/Credenciales";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [productosCarrito, setProductosCarrito] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUsuario(currentUser);
      console.log(currentUser ? "Usuario encontrado" : "Usuario no encontrado");
    });

    return () => unsubscribe(); // Limpia el efecto para evitar fugas de memoria
  }, []);

  useEffect(() => {
    if (usuario) {
      GetCarrito();
    }
  }, [usuario]);

  const GetCarrito = () => {
    if (usuario) {
      fetch(`http://localhost:3000/carrito/id_usuario/${usuario.uid}`)
        .then((res) => res.json())
        .then((data) => {
          setCart(data);
          setProductosCarrito(data.id_producto); // Actualiza los productos en el carrito
        })
        .catch((error) => console.error("Error al obtener el carrito:", error));
    }
  };

  const addToCart = (product, cantidad = 1) => {
    if (!usuario) {
      console.error("Usuario no autenticado. No se puede agregar al carrito.");
      return;
    }

    const updatedProducts = [
      { cantidad, id_producto: product.id },
      ...productosCarrito,
    ];

    fetch(`http://localhost:3000/carrito/id_carrito/${cart.id_carrito}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_producto: updatedProducts }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProductosCarrito(updatedProducts); // Actualiza los productos del carrito localmente
        console.log("Producto añadido al carrito:", data);
      })
      .catch((error) => console.error("Error al agregar al carrito:", error));
  };

  return (
    <CartContext.Provider value={{ cart: productosCarrito, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
