import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import useAuth from "../auth-context/AuthContext";

// Componente que gestiona el estado del carrito de compras y la autenticación del usuario.
export const CartProvider = ({ children }) => {
  const { usuario } = useAuth();
  const [cart, setCart] = useState([]); // Estado que almacena el carrito completo
  const [productosCarrito, setProductosCarrito] = useState([]); // Estado que contiene los productos agregados al carrito

  // useEffect que se ejecuta cuando el usuario está autenticado para obtener los productos del carrito
  useEffect(() => {
    if (usuario) {
      GetCarrito(); // Llama a la función para obtener el carrito del usuario autenticado
    }
  }, [usuario]);

  // Función que obtiene los productos del carrito del usuario desde la API
  const GetCarrito = async () => {
    if (usuario) {
      console.log(usuario.uid);
      await fetch(`http://localhost:3000/carrito/id_usuario/${usuario.uid}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log("Datos recibidos:", data);
          setCart(data || {}); // Actualiza el carrito con los datos recibidos
          setProductosCarrito(data.id_producto || []); // Actualiza los productos en el carrito
        })
        .catch((error) => console.error("Error al obtener el carrito:", error));
    }
  };
  console.log(cart);

  // Función para agregar un producto al carrito
  const addToCart = (product, cantidad = 1) => {
    if (!usuario) {
      console.error("Usuario no autenticado. No se puede agregar al carrito.");
      return;
    }

    // Verifica si el producto ya está en el carrito y actualiza la cantidad
    const updatedProducts = productosCarrito.map((item) =>
      item.id_producto === product.id
        ? { ...item, cantidad: item.cantidad + cantidad } // Incrementa la cantidad si el producto ya existe
        : item
    );

    const productoExiste = updatedProducts.find(
      (item) => item.id_producto === product.id
    );
    // Si el producto no existe, lo agrega al carrito
    if (!productoExiste) {
      updatedProducts.push({ cantidad, id_producto: product.id });
    }

    // Envía la actualización del carrito al servidor
    fetch(`http://localhost:3000/carrito/id_carrito/${cart.id_carrito}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_producto: updatedProducts, // Enviar productos actualizados
        id_usuario: usuario.uid, // Enviar ID del usuario autenticado
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProductosCarrito(updatedProducts); // Actualiza los productos del carrito localmente
        console.log("Producto añadido al carrito:", data);
      })
      .catch((error) => console.error("Error al agregar al carrito:", error));
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    // Encontrar el producto en el carrito
    const productToChange = productosCarrito.find(
      (producto) => producto.id_producto === productId
    );

    // if (productIndex === -1) {
    //   console.error("Producto no encontrado en el carrito.");
    //   return;
    // }
    let updatedProducts;
    // Si la cantidad es mayor a 1, disminuir la cantidad
    if (productToChange.cantidad > 1) {
      updatedProducts = productosCarrito.map((producto) =>
        producto.id_producto === productId
          ? { ...producto, cantidad: producto.cantidad - 1 }
          : producto
      );
    } else {
      // Si la cantidad es 1, eliminar el producto del carrito
      updatedProducts = productosCarrito.filter(
        (producto) => producto.id_producto !== productId
      );
    }
    console.log(updatedProducts);
    // Envía la actualización al servidor
    fetch(`http://localhost:3000/carrito/id_carrito/${cart.id_carrito}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_producto: updatedProducts }), // Enviar productos actualizados
    })
      .then((res) => res.json())
      .then((data) => {
        setProductosCarrito(updatedProducts); // Actualiza los productos del carrito localmente
        console.log("Producto eliminado del carrito:", data);
      })
      .catch((error) => console.error("Error al eliminar del carrito:", error));
  };
  // Función para vaciar el carrito completamente
  const clearCart = () => {
    if (!usuario) {
      console.error("Usuario no autenticado. No se puede vaciar el carrito.");
      return;
    }

    if (!cart.id_carrito) {
      console.error(
        "id_carrito no encontrado en el carrito. No se puede vaciar el carrito."
      );
      return;
    }
    // Envía la solicitud para vaciar el carrito al servidor
    fetch(`http://localhost:3000/carrito/id_carrito/${cart.id_carrito}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_producto: [] }), // Enviar un carrito vacío
    })
      .then((res) => res.json())
      .then((data) => {
        setProductosCarrito([]); // Vacía el carrito localmente
        console.log("Carrito vaciado:", data);
      })
      .catch((error) => console.error("Error al vaciar el carrito:", error));
    setCart([]);
  };

  // Provee el contexto del carrito a los componentes hijos
  return (
    <CartContext.Provider
      value={{
        cart: productosCarrito,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
