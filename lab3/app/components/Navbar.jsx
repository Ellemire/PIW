import { Link, useNavigate } from "react-router";

export default function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <div className="bookstore-name">
          <h1><Link to="/">Księgarnia Yggdrasil</Link></h1>
        </div>
        <div className="nav-btns">
          <button className="cart-btn">Koszyk</button>
          <button className="login-btn">Zaloguj się</button>
        </div>
      </nav>
    </header>
  );
}