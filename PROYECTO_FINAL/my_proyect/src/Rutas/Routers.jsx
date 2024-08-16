import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
// import { CartProvider } from "../components/Context/CartProvider";
import Cart from "../components/Cart/Cart";
import { RegistePage } from "../pages/register/RegisterPage";
import { LoginPage } from "../pages/login/LoginPage";

export default function Routers() {
  return (
    // <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/register" element={<RegistePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
    // </CartProvider>
  );
}
