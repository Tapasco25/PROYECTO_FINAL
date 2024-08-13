import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Rutas/App.jsx";
import "./index.css";
import "./App.css";
import { CartProvider } from "./components/Context/CartProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
