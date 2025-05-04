import { Link, useNavigate } from "react-router";
import LoginButton from './LoginButton';

export default function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <div className="bookstore-name">
          <h1><Link to="/">Księgarnia Yggdrasil</Link></h1>
        </div>
        <div className="nav-btns">
          <Link to="/cart" className="cart-link">
            <button className="cart-btn">
              Koszyk
            </button>
          </Link>
          <LoginButton />
        </div>
      </nav>
    </header>
  );
}