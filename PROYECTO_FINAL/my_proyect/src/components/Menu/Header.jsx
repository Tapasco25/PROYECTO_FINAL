import styles from "./header.module.css";
import img from "../../assets/logo.png";
import { Link } from "react-scroll";
import CartIcon from "../CartIcon/CartIcon";
import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../fireBase/Credenciales";
import Menu from "./menu-normal/Menu";
import MenuResponsive from "./menu-responsive/MenuResponsive";

// Función para cerrar la sesión del usuario
const cerrarLogin = async () => {
  try {
    await signOut(auth); // Intenta cerrar la sesión usando Firebase
    console.log("Se cerró la sesión");
  } catch (error) {
    console.log("No se cerró la sesión", error);
  }
};

// Componente Header que recibe la información del usuario actual
function Header({ currentUser }) {
  // Estado para manejar la apertura y cierre del menú
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para alternar la visibilidad del menú
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
    console.log(isMenuOpen);
  };

  // Obtiene la inicial del nombre del usuario, o la primera letra del email o UID si no hay nombre
  const initial = currentUser
    ? (currentUser.displayName || currentUser.email || currentUser.uid)
        .charAt(0)
        .toUpperCase()
    : "";

  return (
    <header className={styles.header}>
      <img className={styles.logo} src={img} alt="Logo" />
      <div className={styles.container}>
        <button
          onClick={toggleMenu}
          className={styles.classMenuBtn}
          id="menu-btn"
        >
          &#9776;
        </button>
        {/* Muestra el menú responsivo si el estado del menú está abierto, de lo contrario, muestra el menú normal */}
        {isMenuOpen ? (
          <MenuResponsive cerrarLogin={cerrarLogin} />
        ) : (
          <Menu cerrarLogin={cerrarLogin} />
        )}
      </div>
      {/* Muestra el círculo con la inicial del usuario si el usuario está logueado */}
      {currentUser && (
        <div className={styles.profileContainer}>
          <div className={styles.profileCircle}>
            {initial} {/* Muestra la inicial del usuario */}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
