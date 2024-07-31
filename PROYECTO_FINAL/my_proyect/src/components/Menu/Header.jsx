import './header.css';
import img from '../../assets/logo.png';
import { Link } from 'react-scroll';
import Cart from '../Cart/Cart';


function Header({ productsInCart, mostrarRegister }) {
    return (
        <div className="contenido">
            <header className="header">
                <img className="logo" src={img} alt="Logo" />
                <div className="container">
                    <nav className='nav'>
                        <Link to='electronics' smooth={true} duration={500}>Electronics</Link>
                        <Link to='jewelery' smooth={true} duration={500}>Jewelery</Link>
                        <Link to='mensclothing' smooth={true} duration={500}>Mensclothing</Link>
                        <Link to='womensclothing' smooth={true} duration={500}>Womensclothing</Link>

                    </nav>
                </div>
                <div>
                    <button
                        onClick={mostrarRegister}
                        className='btn-register'
                    >
                        SIGN IN
                    </button>
                </div>
                <button className="class-menu-btn" id="menu-btn">&#9776;</button>
                <Cart productsInCart={productsInCart} />
            </header>
        </div>
    );
}

export default Header;
