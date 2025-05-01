import { Link, useNavigate } from "react-router";

export default function BookFilters({ filters, setFilters }) {
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFilters({ ...filters, [name]: value });
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
            <label for="type">Rodzaj:</label>
            <select id="genre">
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
  
          <div class="filter-group">
                    <label for="page-count">Liczba stron (minimum):</label>
                    <input type="number" id="page-count" min="1" placeholder="np. 300"/>
          </div>

          <div class="filter-group">
              <label for="sort">Sortuj według:</label>
              <select id="sort">
                  <option value="title-asc">Tytuł (A-Z)</option>
                  <option value="title-desc">Tytuł (Z-A)</option>
                  <option value="price-asc">Cena (rosnąco)</option>
                  <option value="price-desc">Cena (malejąco)</option>
                  <option value="newest">Najnowsze</option>
              </select>
          </div>
          
          <button className="filter-btn">Zastosuj filtry</button>
        </div>
      </section>
    );
  }