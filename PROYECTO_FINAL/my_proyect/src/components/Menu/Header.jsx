import './header.css';
import img from '../../assets/logo.png';
import { Link } from 'react-scroll';

function Header() {
    return (
        <div className="contenido">
            <header className="header">
                <img className="logo" src={img} alt="Logo" />
                <div className="container">
                    <nav className='nav'>
                        <Link to='electronics' smooth={true} duration={500}>Electronics</Link>
                        <Link to='jewelery' smooth={true} duration={500}>Jewelwry</Link>
                        <Link to='mensclothing' smooth={true} duration={500}>Mensclothing</Link>
                        <Link to='womensclothing' smooth={true} duration={500}>Womensclothing</Link>
                    </nav>
                </div>
                <button className="class-menu-btn" id="menu-btn">&#9776;</button>
            </header>
        </div>
    );
}

export default Header;
