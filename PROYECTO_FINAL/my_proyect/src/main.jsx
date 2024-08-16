import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Rutas/App.jsx";
import "./index.css";
import "./App.css";
import { CartProvider } from "./components/Context/CartProvider.jsx";
import Routers from "./Rutas/Routers.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <CartProvider> */}
    <Routers />
    {/* </CartProvider> */}
  </React.StrictMode>
);
