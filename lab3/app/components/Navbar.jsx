import { Link, useNavigate } from "react-router";
import LoginButton from './LoginButton';
import CartDropdown from './CartDropdown';

export default function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <div className="bookstore-name">
          <h1><Link to="/">Księgarnia Yggdrasil</Link></h1>
        </div>
        <div className="nav-btns">
          <CartDropdown />
          <LoginButton />
        </div>
      </nav>
    </header>
  );
}