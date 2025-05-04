import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useBooks } from "../contexts/BookContext";
import { useAuth } from "../contexts/AuthContext";

export default function New() {
  const { addBook } = useBooks();
  const { currentUser } = useAuth();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: 'Book',
    author: 'Auth',
    genre: '',
    price: 50,
    description: '',
    cover: null,
    publicationDate: '',
    isbn: 1234567891000,
    publisher: 'Wyd',
    pages: 200,
    quantity: 10
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      alert('Musisz być zalogowany, aby dodać książkę');
      return;
    }

    try {
      await addBook({...formData }, currentUser.uid);
      navigate('/');
    } catch (error) {
      console.error('Błąd podczas dodawania książki:', error);
    }
  };

  return (
    <section className="add-book-section">
      <h2>Dodaj nową pozycję</h2>
      
      <form className="add-book-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Tytuł książki:</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={formData.title}
            onChange={handleChange}
            required 
            autoFocus 
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
            <option value="adventure-fiction">Przygodowe</option>
            <option value="fantasy">Fantasy</option>
            <option value="sci-fi">Science Fiction</option>
            <option value="crime-fiction">Kryminał</option>
            <option value="thriller">Thriller</option>
            <option value="horror">Horror</option>
            <option value="romance">Romans</option>
            <option value="contemporary-fiction">Obyczajowe</option>
            <option value="historical-fiction">Historyczne</option>
            <option value="non-fiction">Literatura faktu</option>
            <option value="literary-fiction">Literatura piękna</option>
            <option value="poetry">Poezja</option>
            <option value="other">Inny</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="type">Rodzaj:</label>
          <select id="type" name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Wybierz rodzaj</option>
            <option value="audiobook">Audiobook</option>
            <option value="ebook">E-book</option>
            <option value="hard-cover">Twarda oprawa</option>
            <option value="soft-cover">Miękka oprawa</option>
            <option value="integrated-cover">Okładka zintegrowana</option>
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
          <label htmlFor="cover">Okładka książki:</label>
          <input 
            type="file" 
            id="cover" 
            name="cover" 
            onChange={handleChange}
            accept="image/*" 
          />
        </div>
        <div className="form-group">
          <label htmlFor="publication-date">Data publikacji:</label>
          <input 
            type="date" 
            id="publication-date" 
            name="publicationDate" 
            value={formData.publicationDate}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="isbn">ISBN:</label>
          <input 
            type="text" 
            id="isbn" 
            name="isbn" 
            value={formData.isbn}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="publisher">Wydawnictwo:</label>
          <input 
            type="text" 
            id="publisher" 
            name="publisher" 
            value={formData.publisher}
            onChange={handleChange}
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
          <label htmlFor="quantity">Ilość w magazynie:</label>
          <input 
            type="number" 
            id="quantity" 
            name="quantity" 
            min="0" 
            value={formData.quantity}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Opis książki:</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description}
            onChange={handleChange}
            rows="5" 
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-btn">Dodaj książkę</button>
          <Link to="/" className="cancel-btn">Anuluj</Link>
        </div>
      </form>
    </section>
  );
}