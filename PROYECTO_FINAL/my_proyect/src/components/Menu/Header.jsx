import './header.css';
import img from '../../assets/logo.png'

function Header() {
    return (
        <div className="contenido">
            <header className="header">
                    <img className="logo" src={img} />
                <div className="container">
                    <nav className='nav'>
                        <a href="#">Electronics</a>
                        <a href="#">Jewelwry</a>
                        <a href="#">Mensclothing</a>
                        <a href="#">Womensclothing</a>
                    </nav>
                </div>  
                <button className="class-menu-btn" id="menu-btn">&#9776;</button>
            </header>
        </div>
    );
}

export default Header; // Aquí se exporta NetflixHeader como default