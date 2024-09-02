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
      console.log(usuario);
      fetch(`http://localhost:3000/carrito/id_usuario/${usuario.uid}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Datos recibidos:", data);
          setCart(data || {});
          setProductosCarrito(data.id_producto || []); // Actualiza los productos en el carrito
        })
        .catch((error) => console.error("Error al obtener el carrito:", error));
    }
  };
  console.log(cart);

  const addToCart = (product, cantidad = 1) => {
    if (!usuario) {
      console.error("Usuario no autenticado. No se puede agregar al carrito.");
      return;
    }

    if (!cart.id_carrito) {
      console.error(
        "id_carrito no encontrado en el carrito. No se puede agregar al carrito."
      );
      return;
    }

    const updatedProducts = productosCarrito.map((item)=> 
      item.id_producto === product.id
  ? {...item, cantidad: item.cantidad + cantidad}
: item);

const productoExiste = updatedProducts.find(
(item) => item.id_producto === product.id
);
if (!productoExiste) {
  updatedProducts.push ({cantidad, id_producto : product.id})
};

    fetch(`http://localhost:3000/carrito/id_carrito/${cart.id_carrito}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_producto: updatedProducts,
        id_usuario: usuario.uid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProductosCarrito(updatedProducts); // Actualiza los productos del carrito localmente
        console.log("Producto añadido al carrito:", data);
      })
      .catch((error) => console.error("Error al agregar al carrito:", error));
  };

  const removeFromCart = (productId) => {
    if (!usuario) {
      console.error(
        "Usuario no autenticado. No se puede eliminar del carrito."
      );
      return;
    }

    const updatedProducts = productosCarrito.filter(
      (producto) => producto.id_producto !== productId
    );

    fetch(`http://localhost:3000/carrito/id_carrito/${cart.id_carrito}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_producto: updatedProducts }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProductosCarrito(updatedProducts); // Actualiza los productos del carrito localmente
        console.log("Producto eliminado del carrito:", data);
      })
      .catch((error) => console.error("Error al eliminar del carrito:", error));
  };

  const clearCart = () => {
    if (!usuario) {
      console.error("Usuario no autenticado. No se puede vaciar el carrito.");
      return;
    }

    fetch(`http://localhost:3000/carrito/id_carrito/${cart.id_carrito}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_producto: [] }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProductosCarrito([]); // Vacía el carrito localmente
        console.log("Carrito vaciado:", data);
      })
      .catch((error) => console.error("Error al vaciar el carrito:", error));
  };

  const buy = () => {
    if (!usuario) {
      console.error(
        "Usuario no autenticado. No se puede proceder con la compra."
      );
      return;
    }

    if (productosCarrito.length === 0) {
      console.error(
        "No hay productos en el carrito. No se puede proceder con la compra."
      );
      return;
    }

    // Aquí podrías hacer una solicitud a tu servidor para crear una orden o procesar el pago
    fetch(`http://localhost:3000/ordenes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_usuario: usuario.uid,
        productos: productosCarrito,
        total: calcularTotal(productosCarrito), // Asegúrate de tener una función para calcular el total
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Compra realizada con éxito:", data);
        clearCart(); // Limpia el carrito después de la compra
      })
      .catch((error) => console.error("Error al realizar la compra:", error));
  };

  // Función para calcular el total del carrito
  const calcularTotal = (productos) => {
    return productos.reduce(
      (acc, producto) => acc + producto.precio * producto.cantidad,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart: productosCarrito,
        addToCart,
        removeFromCart,
        clearCart,
        buy,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
