import { Link, useNavigate } from "react-router";
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function BookItem({ book, onDelete }) {
  const { dispatch } = useCart();
  const { currentUser } = useAuth();
  const isOwner = currentUser && book.addedBy === currentUser.uid;

  const handleDelete = () => {
    if (!isOwner) {
      alert('Możesz usuwać tylko swoje książki');
      return;
    }
    if (window.confirm('Czy na pewno chcesz usunąć tę książkę?')) {
      onDelete(book.id);
    }
  };

    const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: book.id,
        title: book.title,
        price: book.price,
        cover: book.cover
      }
    });
  };

  return (
    <div className="book-item">
      <div className="book-cover">
        <img src="/images/example-book-cover.jpg" alt={`Okładka książki: ${book.title}`} />
      </div>
      <div className="book-info">
        <h3>{book.title}</h3>
        <p className="author">{book.author}</p>
        <p className="price">{book.price} zł</p>
        <button className="add-to-cart" onClick={addToCart}>Dodaj do koszyka</button>
        <div className="book-actions">
        {isOwner && (
          <>
            <Link to={`/edit/${book.id}`} className="edit-btn">
              Edytuj
            </Link>
            <button onClick={handleDelete} className="delete-btn">
              Usuń
            </button>
          </>
        )}
        </div>
      </div>
    </div>
  );
}