import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function BookFilters({ filters, setFilters, onToggleOnlyMine }) {
  const { currentUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFilters({ 
      ...filters, 
      [name]: value === "" ? "" : Number(value) 
    });
  };

  const clearFilters = () => {
    setFilters({
      genre: "",
      type: "",
      title: "",
      author: "",
      minPrice: "",
      maxPrice: "",
      minPages: "",
      sort: "title-asc",
      onlyMine: false
    });
  };

  return (
    <section className="filters">
      <div className="filter-container">
        <h2>Filtry</h2>

        <div className="filter-group">
          <label htmlFor="genre">Gatunek:</label>
          <select id="genre" name="genre" value={filters.genre} onChange={handleChange}>
            <option value="">Wszystkie</option>
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
          </select>
        </div>

        <div class="filter-group">
          <label htmlFor="type">Rodzaj:</label>
          <select id="type" name="type" value={filters.type} onChange={handleChange}>
              <option value="">Wszystkie</option>
              <option value="audiobook">Audiobooki</option>
              <option value="ebook">E-booki</option>
              <option value="hard-cover">Okładka twarda</option>
              <option value="soft-cover">Okładka miękka</option>
              <option value="integrated-cover">Okładka zintegrowana</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="title">Tytuł:</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            placeholder="np. Hobbit" 
            value={filters.title}
            onChange={handleChange}
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="author">Autor:</label>
          <input 
            type="text" 
            id="author" 
            name="author" 
            placeholder="np. Tolkien" 
            value={filters.author}
            onChange={handleChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="minPages">Minimalna liczba stron:</label>
          <input
            type="number"
            id="minPages"
            name="minPages"
            min="1"
            value={filters.minPages}
            onChange={handleNumberChange}
          />
        </div>

        <div className="filter-group">
          <label>Cena (zł):</label>
          <div className="price-range">
            <input
              type="number"
              name="minPrice"
              placeholder="Od"
              min="0"
              value={filters.minPrice}
              onChange={handleNumberChange}
            />
            <span className="range-separator">-</span>
            <input
              type="number"
              name="maxPrice"
              placeholder="Do"
              min="0"
              value={filters.maxPrice}
              onChange={handleNumberChange}
            />
          </div>
        </div>

        <div class="filter-group">
            <label for="sort">Sortuj według:</label>
            <select id="sort" name="sort" value={filters.sort} onChange={handleChange}>
                <option value="title-asc">Tytuł (A-Z)</option>
                <option value="title-desc">Tytuł (Z-A)</option>
                <option value="price-asc">Cena (rosnąco)</option>
                <option value="price-desc">Cena (malejąco)</option>
                <option value="newest">Najnowsze</option>
            </select>
        </div>
        
        <button type="button" className="filter-btn" onClick={() => setFilters({...filters})}>Zastosuj filtry</button>
        <button type="button" className="filter-btn" onClick={clearFilters}>Wyczyść filtry</button>
        {currentUser && (
          <button
            type="button"
            className={`mine-btn ${filters.onlyMine ? 'active' : ''}`}
            onClick={() => {
              setFilters({
                ...filters,
                onlyMine: !filters.onlyMine
              });
            }}
          >
            MOJE
          </button>
        )}
      </div>
    </section>
  );
}