import { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const BookContext = createContext();

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
}

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pobierz książki z Firestore
  const fetchBooks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'books'));
      const booksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBooks(booksData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Dodaj nową książkę
  const addBook = async (newBook) => {
    try {
      const docRef = await addDoc(collection(db, 'books'), {
        ...newBook,
        addedDate: new Date().toISOString()
      });
      setBooks([...books, { id: docRef.id, ...newBook }]);
    } catch (error) {
      console.error("Error adding book: ", error);
    }
  };

  // Aktualizuj książkę
  const updateBook = async (id, updatedBook) => {
    try {
      await updateDoc(doc(db, 'books', id), updatedBook);
      setBooks(books.map(book => 
        book.id === id ? { ...book, ...updatedBook } : book
      ));
    } catch (error) {
      console.error("Error updating book: ", error);
    }
  };

  // Usuń książkę
  const deleteBook = async (id) => {
    try {
      await deleteDoc(doc(db, 'books', id));
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      console.error("Error deleting book: ", error);
    }
  };

  return (
    <BookContext.Provider 
      value={{ 
        books, 
        loading,
        addBook, 
        updateBook, 
        deleteBook,
        fetchBooks
      }}
    >
      {children}
    </BookContext.Provider>
  );
}