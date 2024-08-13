import styles from "./header.module.css";
import img from "../../assets/logo.png";
import { Link } from "react-scroll";
import CartIcon from "../CartIcon/CartIcon";

function Header({ mostrarRegister }) {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={img} alt="Logo" />
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link to="electronics" smooth={true} duration={500}>
            Electronics
          </Link>
          <Link to="jewelery" smooth={true} duration={500}>
            Jewelery
          </Link>
          <Link to="mensclothing" smooth={true} duration={500}>
            Mensclothing
          </Link>
          <Link to="womensclothing" smooth={true} duration={500}>
            Womensclothing
          </Link>
        </nav>
      </div>
      <div>
        <button onClick={mostrarRegister} className={styles.btnRegister}>
          SIGN IN
        </button>
      </div>

      <div className="text-4xl p-4 my-2 mx-20">
        <CartIcon />
      </div>

      <button className={styles.classMenuBtn} id="menu-btn">
        &#9776;
      </button>
    </header>
  );
}

export default Header;
