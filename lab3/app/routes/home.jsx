import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useBooks } from "../contexts/BookContext";
import BookFilters from "../components/BookFilters";
import BookItem from "../components/BookItem";

export default function Home() {
  const { books, deleteBook } = useBooks();
  const [filters, setFilters] = useState({
    genre: "",
    title: "",
    author: "",
  });

  const filteredBooks = books.filter(book => {
    return (
      (filters.genre === "" || book.genre === filters.genre) &&
      (filters.title === "" || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === "" || book.author.toLowerCase().includes(filters.author.toLowerCase()))
    );
  });

  return (
    <>
      <BookFilters filters={filters} setFilters={setFilters} />
      
      <section className="books">
        <div className="books-header">
          <h2>Nasze książki</h2>
          <Link to="/new" className="add-book-btn">Dodaj nową pozycję</Link>
        </div>

        <div className="book-grid">
          {filteredBooks.map(book => (
            <BookItem key={book.id} book={book} onDelete={deleteBook} />
          ))}
        </div>
      </section>
    </>
  );
}