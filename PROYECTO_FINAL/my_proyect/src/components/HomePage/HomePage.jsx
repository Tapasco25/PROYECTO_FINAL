import React, { useEffect, useState } from "react";
import "../../../src/App.css";
import img from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import useAuth from "../Context/auth-context/AuthContext";

// Definimos el componente funcional HomePage, que es la página principal de la aplicación.
export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false); // Estado local 'showLogin' que controlará la visibilidad del modal de inicio de sesión.
  const { usuario } = useAuth();
  const mostrarLogin = () => {
    setShowLogin(true); // Función que cambia el estado a true para mostrar el modal de inicio de sesión.
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (usuario) navigate("/");
    console.log("usuario del context", usuario);
  }, [usuario]);

  return (
    <div className="homepage">
      <header className="homepageHeader">
        <img src={img} alt="Logo" className="homepageLogo" />
        <h1 className="homepageTitle">STYLES AND FASHION NICOL</h1>
        <div className="homepageButtons">
          {/* <Link to="/register">
            <button className="homepageBtnRegister">
              SIGN UP
            </button>
          </Link> */}
          <button onClick={mostrarLogin} className="homepageBtnLogin">
            SIGN IN
          </button>
        </div>
      </header>
      {/* Renderizado condicional: Si 'showLogin' es true, muestra el modal. */}
      {showLogin && (
        <div className="homepageModal">
          <div className="homepageModalContent">
            <Login />
            {/* Contenido del modal: Aquí se renderiza el componente de Login. */}
          </div>
        </div>
      )}
    </div>
  );
}
