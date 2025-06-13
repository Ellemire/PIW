import { useCart } from '../contexts/CartContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CartDropdown() {
  const { cart, dispatch } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });

  return (
    <div className="cart-dropdown">
      <button className="cart-btn" onClick={toggleCart}>
        🛒 Koszyk ({cart.items.reduce((total, item) => total + item.quantity, 0)})
      </button>

      {isOpen && (
        <div className="cart-content">
          {cart.items.length === 0 ? (
            <p className="empty-cart">Koszyk jest pusty</p>
          ) : (
            <>
              <ul className="cart-items">
                {cart.items.map(item => (
                  <li key={item.id} className="cart-item">
                    <span>{item.title} (x{item.quantity})</span>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="remove-btn"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
              <Link to="/checkout" className="checkout-btn">
                Przejdź do zamówienia
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}