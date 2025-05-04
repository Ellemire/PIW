import { useAuth } from "../contexts/AuthContext";
import { useBooks } from "../contexts/BookContext";
import BookItem from "../components/BookItem";

export default function MyBooks() {
  const { currentUser } = useAuth();
  const { books } = useBooks();

  if (!currentUser) {
    return <div className="not-authorized">Musisz być zalogowany aby przeglądać swoje książki</div>;
  }

  const myBooks = books.filter(book => book.addedBy === currentUser.uid);

  return (
    <div className="my-books-page">
      <h2 className="page-title">Moje dodane książki</h2>
      <div className="book-grid">
        {myBooks.length > 0 ? (
          myBooks.map(book => (
            <BookItem key={book.id} book={book} />
          ))
        ) : (
          <p className="no-books">Nie dodałeś jeszcze żadnych książek</p>
        )}
      </div>
    </div>
  );
}