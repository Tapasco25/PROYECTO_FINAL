import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { CartProvider } from "../components/Context/cart-context/CartProvider";
import Cart from "../components/Cart/Cart";
import { RegistePage } from "../pages/register/RegisterPage";
import { LoginPage } from "../pages/login/LoginPage";
import HomePage from "../components/HomePage/HomePage";

// Componente principal para manejar las rutas de la aplicación
export default function Routers() {
  return (
    // Proporcionamos el contexto del carrito de compras a toda la aplicación
    <CartProvider>
      {/* Configuramos el enrutador para manejar las diferentes páginas */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/App" element={<App />} />
          <Route path="/app/Cart" element={<Cart />} />
          <Route path="/register" element={<RegistePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
