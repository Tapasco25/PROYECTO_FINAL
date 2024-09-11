import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./Rutas/App.jsx";
import "./index.css";
import "./App.css";
import { CartProvider } from "./components/Context/CartProvider.jsx";
import Routers from "./Rutas/Routers.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>{/* Activa el modo estricto de React para ayudar a detectar problemas en el desarrollo */}
    <CartProvider>{/* Proporciona el contexto del carrito a toda la aplicación */}
      <Routers /> {/* Renderiza el componente que maneja las rutas y vistas de la aplicación */}
    </CartProvider>
  </React.StrictMode>
);
