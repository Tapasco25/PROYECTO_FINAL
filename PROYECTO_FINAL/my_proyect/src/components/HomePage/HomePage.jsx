import React, { useState } from "react";
import "../../../src/App.css";
import img from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Login from "../Login/Login"; // Asegúrate de que la ruta sea correcta

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false);

  const mostrarLogin = () => {
    setShowLogin(true);
  };

  const cerrarLogin = () => {
    setShowLogin(false);
  };

  return (
    <div className="homepage">
      <header className="homepageHeader">
        <img src={img} alt="Logo" className="homepageLogo" />
        <h1 className="homepageTitle">STYLES AND FASHION NICOL</h1>
        <div className="homepageButtons">
          <Link to="/register">
            <button className="homepageBtnRegister">
              SIGN UP
            </button>
          </Link>
          <button onClick={mostrarLogin} className="homepageBtnLogin">
            SIGN IN
          </button>
        </div>
      </header>

      {showLogin && (
        <div className="homepageModal">
          <div className="homepageModalContent">
            <button onClick={cerrarLogin} className="homepageCloseButton">
              &times;
            </button>
            <Login />
          </div>
        </div>
      )}
    </div>
  );
}
