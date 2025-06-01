import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useBooks } from "../contexts/BookContext";
import BookFilters from "../components/BookFilters";
import BookItem from "../components/BookItem";
import { useAuth } from "../contexts/AuthContext";


export default function Home() {
  const { books, deleteBook } = useBooks();
  const { currentUser } = useAuth();
  const [filters, setFilters] = useState({
    genre: "",
    type: "",
    title: "",
    author: "",
    minPages: "",
    minPrice: "",
    maxPrice: "",
    sort: "title-asc",
    onlyMine: false
  });

  const filteredBooks = books.filter(book => {
    // Podstawowe filtry
    const basicFilters = (
      (filters.genre === "" || book.genre === filters.genre) &&
      (filters.type === "" || book.type === filters.type) &&
      (filters.title === "" || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === "" || book.author.toLowerCase().includes(filters.author.toLowerCase())) &&
      (filters.minPrice === "" || book.price >= filters.minPrice) &&
      (filters.maxPrice === "" || book.price <= filters.maxPrice) &&
      (filters.minPages === "" || book.pages >= filters.minPages)
    );

    if (filters.onlyMine && currentUser) {
      return basicFilters && book.addedBy === currentUser.uid;
    }

    return basicFilters;
  }).sort((a, b) => {
    switch(filters.sort) {
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return new Date(b.addedDate) - new Date(a.addedDate);
      default:
        return 0;
    }
  });

  const toggleOnlyMine = () => {
    setFilters({
      ...filters,
      onlyMine: !filters.onlyMine
    });
  };

  return (
    <>
      <BookFilters filters={filters} setFilters={setFilters} onToggleOnlyMine={toggleOnlyMine}/>
      
      <section className="books">
        <div className="books-header">
          <h2>Nasze książki</h2>
          {currentUser && (
            <Link to="/new" className="add-book-btn">Dodaj nową pozycję</Link>
          )}
        </div>

        <div className="book-grid">
          {filteredBooks.map(book => (
            <BookItem key={book.id} book={book} onDelete={deleteBook} />
          ))}
        </div>
      </section>
    </>
  );

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
}