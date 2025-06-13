import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const { cart, dispatch } = useCart();
  
  // Upewnij się, że cena jest liczbą przed użyciem toFixed()
  const total = cart.items.reduce((sum, item) => {
    const price = typeof item.price === 'number' ? item.price : Number(item.price);
    return sum + (price * item.quantity);
  }, 0);

  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <div className="checkout-page">
      <h2>Podsumowanie zamówienia</h2>
      
      {cart.items.length === 0 ? (
        <div className="empty-cart">
          <p>Twój koszyk jest pusty</p>
          <Link to="/" className="back-btn">Powrót do sklepu</Link>
        </div>
      ) : (
        <>
          <ul className="checkout-items">
            {cart.items.map(item => {
              // Konwertuj cenę na liczbę jeśli nie jest
              const price = typeof item.price === 'number' ? item.price : Number(item.price);
              return (
                <li key={item.id} className="checkout-item">
                  <div className="item-info">
                    <h3>{item.title}</h3>
                    <p>{item.quantity} × {price.toFixed(2)} zł</p>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="remove-btn"
                  >
                    Usuń
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="checkout-summary">
            <h3>Razem: {total.toFixed(2)} zł</h3>
            <button 
              onClick={clearCart}
              className="clear-btn"
            >
              Wyczyść koszyk
            </button>
            <button className="order-btn">
              Złóż zamówienie
            </button>
          </div>
        </>
      )}
    </div>
  );
}