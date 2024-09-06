import styles from "./header.module.css";
import img from "../../assets/logo.png";
import { Link } from "react-scroll";
import CartIcon from "../CartIcon/CartIcon";
import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../fireBase/Credenciales";
import Menu from "./menu-normal/Menu";
import MenuResponsive from "./menu-responsive/MenuResponsive";

const cerrarLogin = async () => {
  try {
    await signOut(auth);
    console.log("Se cerró la sesión");
  } catch (error) {
    console.log("No se cerró la sesión", error);
  }
};

function Header({currentUser}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
    console.log(isMenuOpen);
  };

  const initial = currentUser ? (currentUser.displayName || currentUser.email || currentUser.uid).charAt(0).toUpperCase() : '';

  return (
    <header className={styles.header}>
      <img className={styles.logo} src={img} alt="Logo" />
      <div className={styles.container}>
       
      {currentUser && (
          <div className={styles.profileCircle}>
            {initial}
          </div>
        )}

        <button
          onClick={toggleMenu}
          className={styles.classMenuBtn}
          id="menu-btn"
        >
          &#9776;
        </button>
        {isMenuOpen ? <MenuResponsive cerrarLogin={cerrarLogin} /> : <Menu cerrarLogin={cerrarLogin} />}
      </div>
    </header>
  );
}

export default Header;
