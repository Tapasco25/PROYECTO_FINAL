import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./Rutas/App.jsx";
import "./index.css";
import "./App.css";
import { CartProvider } from "./components/Context/cart-context/CartProvider.jsx";
import Routers from "./Rutas/Routers.jsx";
import { AuthProvider } from "./components/Context/auth-context/AuthContext.jsx";

// Crea un punto de entrada o "raíz" en el elemento con id "root" y renderiza el contenido de la aplicación React en él.
ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode> {/* React.StrictMode es una herramienta para detectar problemas potenciales en la aplicación y asegurarse de seguir las mejores prácticas */}
    <AuthProvider>{/* AuthProvider envuelve la aplicación y provee contexto de autenticación para gestionar el estado de usuarios */}
      <CartProvider>{/* CartProvider envuelve el componente de rutas, permitiendo que el estado del carrito esté disponible en toda la aplicación */}
        <Routers />{" "} {/* Routers es el componente que define las rutas de navegación dentro de la aplicación */}
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
