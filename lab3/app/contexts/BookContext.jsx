import { createContext, useState, useContext } from "react";

const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Władca Pierścieni",
      author: "J.R.R. Tolkien",
      price: 129.99,
      genre: "fantasy",
      type: "hard-cover",
      pages: 923,
      addedDate: new Date('2023-01-01').toISOString()
    },
    {
      id: 2,
      title: "Hobbit, czyli tam i z powrotem",
      author: "J.R.R. Tolkien",
      price: 29.99,
      genre: "fantasy",
      type: "soft-cover",
      pages: 223,
      addedDate: new Date('2020-01-01').toISOString()
    },
    {
      id: 3,
      title: "Silmarillion",
      author: "J.R.R. Tolkien",
      price: 99.99,
      genre: "fantasy",
      type: "hard-cover",
      pages: 823,
      addedDate: new Date('2003-01-01').toISOString()
    },
    {
      id: 4,
      title: "Ziemiomorze",
      author: "Ursula Le Guin",
      price: 69.99,
      genre: "fantasy",
      type: "hard-cover",
      pages: 880,
      addedDate: new Date('2013-01-01').toISOString()
    },
    {
      id: 5,
      title: "Sześć światów Hain",
      author: "Ursula Le Guin",
      price: 69.99,
      genre: "sci-fi",
      type: "hard-cover",
      pages: 795,
      addedDate: new Date('2023-02-01').toISOString()
    },
  ]);

  const addBook = (newBook) => {
    setBooks([...books, { ...newBook, id: books.length + 1 }]);
  };

  const updateBook = (id, updatedBook) => {
    setBooks(books.map(book => book.id === id ? { ...book, ...updatedBook } : book));
  };

  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  return useContext(BookContext);
}