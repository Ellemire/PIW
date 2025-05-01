import { Link, useNavigate } from "react-router";

export default function BookItem({ book, onDelete }) {
  return (
    <div className="book-item">
      <div className="book-cover">
        <img src="/images/example-book-cover.jpg" alt={`Okładka książki: ${book.title}`} />
      </div>
      <div className="book-info">
        <h3>{book.title}</h3>
        <p className="author">{book.author}</p>
        <p className="price">{book.price} zł</p>
        <button className="add-to-cart">Dodaj do koszyka</button>
        <div className="book-actions">
          <Link to={`/edit/${book.id}`} className="edit-btn">Edytuj</Link>
          <button onClick={() => onDelete(book.id)} className="delete-btn">Usuń</button>
        </div>
      </div>
    </div>
  );
}