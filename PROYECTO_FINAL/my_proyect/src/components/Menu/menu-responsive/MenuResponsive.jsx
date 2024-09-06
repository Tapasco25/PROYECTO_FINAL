import React from "react";
import { Link } from "react-scroll";
import styles from "./menuResponsive.module.css";
import CartIcon from "../../CartIcon/CartIcon";

const Menu = ({ cerrarLogin, currentUser }) => {
  const initial = currentUser ? (currentUser.displayName || currentUser.email || currentUser.uid).charAt(0).toUpperCase() : '';

  console.log("MenuResponsive renderizado");
  return (
    <>
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
      <div className={styles.options}>
        <div className={styles.buttonContainer}>
          <CartIcon />
          {currentUser && (
            <div className={styles.profileCircle}>
              {initial}
            </div>
          )}
          <button onClick={cerrarLogin} className={styles.homepageCloseButton}>
            LOG OUT
          </button>
        </div>
      </div>
    </>
  );
};

export default Menu;
