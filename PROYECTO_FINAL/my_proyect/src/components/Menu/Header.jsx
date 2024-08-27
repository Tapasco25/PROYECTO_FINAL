import styles from "./header.module.css";
import img from "../../assets/logo.png";
import { Link } from "react-scroll";
import CartIcon from "../CartIcon/CartIcon";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../fireBase/Credenciales";
const cerrarLogin = async () => {
  try {
    await signOut(auth);
    console.log("Se cerró la sesión");
  } catch (error) {
    console.log("No se cerró la sesión", error);
  }
};

function Header() {
  return (
    <div className={styles.header}>
      {/* <header> */}
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
        <div className={styles.buttonContainer}>
          <CartIcon />
          <button onClick={cerrarLogin} className={styles.homepageCloseButton}>
            LOG OUT
          </button>
          <button className={styles.classMenuBtn} id="menu-btn">
            &#9776;
          </button>
        </div>
      {/* </header> */}
    </div>
  );
}

export default Header;
