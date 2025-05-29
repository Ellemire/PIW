import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useBooks } from '../contexts/BookContext';
import { useAuth } from '../contexts/AuthContext';

export default function EditBook() {
  const { id } = useParams();
  const { books, updateBook } = useBooks();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    type: '',
    price: '',
    pages: '',
    description: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bookToEdit = books.find(book => book.id === id);
    
    if (!bookToEdit) {
      navigate('/');
      return;
    }

    // Sprawdź czy użytkownik jest właścicielem
    if (bookToEdit.addedBy !== currentUser?.uid) {
      alert('Możesz edytować tylko swoje książki');
      navigate('/');
      return;
    }

    setFormData({
      title: bookToEdit.title,
      author: bookToEdit.author,
      genre: bookToEdit.genre,
      type: bookToEdit.type,
      price: bookToEdit.price,
      pages: bookToEdit.pages,
      description: bookToEdit.description || ''
    });
    setLoading(false);
  }, [id, books, currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await updateBook(id, {
        ...formData,
        price: Number(formData.price),
        pages: Number(formData.pages)
      });
      navigate('/');
    } catch (error) {
      console.error('Błąd podczas aktualizacji książki:', error);
      alert('Wystąpił błąd podczas zapisywania zmian');
    }
  };

  if (loading) {
    return <div className="loading">Ładowanie...</div>;
  }

  return (
    <section className="edit-book-section">
      <h2>Edytuj książkę</h2>
      
      <form className="edit-book-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Tytuł książki:</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="author">Autor:</label>
          <input 
            type="text" 
            id="author" 
            name="author" 
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="genre">Gatunek:</label>
          <select 
            id="genre" 
            name="genre" 
            value={formData.genre}
            onChange={handleChange}
            required
          >
            <option value="">Wybierz gatunek</option>
            <option value="fantasy">Fantasy</option>
            <option value="sci-fi">Science Fiction</option>
            <option value="thriller">Thriller</option>
            {/* Dodaj więcej gatunków */}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="type">Rodzaj:</label>
          <select 
            id="type" 
            name="type" 
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Wybierz rodzaj</option>
            <option value="hardcover">Twarda oprawa</option>
            <option value="paperback">Miękka oprawa</option>
            <option value="ebook">E-book</option>
            <option value="audiobook">Audiobook</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="price">Cena (zł):</label>
          <input 
            type="number" 
            id="price" 
            name="price" 
            min="0" 
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="pages">Liczba stron:</label>
          <input 
            type="number" 
            id="pages" 
            name="pages" 
            min="1"
            value={formData.pages}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Opis:</label>
          <textarea 
            id="description" 
            name="description" 
            rows="5"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="save-btn">Zapisz zmiany</button>
          <Link to="/" className="cancel-btn">Anuluj</Link>
        </div>
      </form>
    </section>
  );
}