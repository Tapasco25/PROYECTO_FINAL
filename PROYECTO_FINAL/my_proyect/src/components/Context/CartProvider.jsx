import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../fireBase/Credenciales";

// Componente que gestiona el estado del carrito de compras y la autenticación del usuario.
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Estado que almacena el carrito completo
  const [usuario, setUsuario] = useState(null); // Estado que guarda la información del usuario autenticado
  const [productosCarrito, setProductosCarrito] = useState([]); // Estado que contiene los productos agregados al carrito

  // useEffect para detectar el cambio en el estado de autenticación del usuario
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUsuario(currentUser); // Actualiza el estado del usuario cuando hay un cambio
      console.log(currentUser ? "Usuario encontrado" : "Usuario no encontrado");
    });

    return () => unsubscribe(); // Limpia el efecto para evitar fugas de memoria
  }, []);

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
          console.log("Datos recibidos:", data);
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
    // if (!usuario) {
    //   console.error(
    //     "Usuario no autenticado. No se puede eliminar del carrito."
    //   );
    //   return;
    // }
    // if (!cart.id_carrito) {
    //   console.error(
    //     "id_carrito no encontrado en el carrito. No se puede eliminar del carrito."
    //   );
    //   return;
    // }
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
      setCart([])
      
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
  // const calcularTotal = (productos) => {
  //   return productos.reduce(
  //     (acc, producto) => acc + producto.precio * producto.cantidad,
  //     0
  //   );
  // };

  // Provee el contexto del carrito a los componentes hijos
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
