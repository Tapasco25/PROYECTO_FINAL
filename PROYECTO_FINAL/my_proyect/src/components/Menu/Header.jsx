import styles from "./header.module.css";
import img from "../../assets/logo.png";
import { Link } from "react-scroll";
import CartIcon from "../CartIcon/CartIcon";
import Login from "../Login/Login";
import React, { useState } from 'react';

function Header({ mostrarRegister }) {
  const [showLogin, setShowLogin] = useState(false);

  const mostrarLogin = () => {
    setShowLogin(true);
  };

  const cerrarLogin = () => {
    setShowLogin(false);
  };

  return (
    <header className={styles.header}>
      <img className={styles.logo} src={img} alt="Logo" />
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link to="electronics" smooth={true} duration={500}>
            ELECTRONICS
          </Link>
          <Link to="jewelery" smooth={true} duration={500}>
           JEWELERY
          </Link>
          <Link to="mensclothing" smooth={true} duration={500}>
          MENSCLOTHING
          </Link>
          <Link to="womensclothing" smooth={true} duration={500}>
           WOMENSCLOTHING
          </Link>
        </nav>
      </div>
      <div>
        <button onClick={mostrarRegister} className={styles.btnRegister}>
          SIGN UP
        </button>
        <button onClick={mostrarLogin} className={styles.btnLogin}>
          SIGN IN
        </button>
      </div>

      <div className="text-4xl p-4 my-2 mx-20">
        <CartIcon />
      </div>

      <button className={styles.classMenuBtn} id="menu-btn">
        &#9776;
      </button>
      <div>
        {showLogin && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <button onClick={cerrarLogin} className={styles.closeButton}>
                &times;
              </button>
              <Login />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
