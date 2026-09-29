import { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { getFavorites, saveFavorites } from './utils/storage';

function Header({ search, setSearch, onMood }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mood, setMood] = useState('');

  const submitMood = (event) => {
    event.preventDefault();
    if (!mood.trim()) return;
    onMood(mood.trim());
    setMood('');
  };

  return (
    <header className="topbar">
      <div className="nav-wrap">
        <button className="brand" onClick={() => navigate('/')} aria-label="Go to home">
          <span className="brand-mark">C</span>
          <span>Cine-Stream</span>
        </button>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/">Discover</NavLink>
          <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/favorites">Favorites</NavLink>
        </nav>

        <div className="search-area">
          <label className="search-box" htmlFor="movie-search">
            <span aria-hidden="true">⌕</span>
            <input
              id="movie-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movies..."
              autoComplete="off"
            />
            {search && <button type="button" className="clear-btn" onClick={() => setSearch('')} aria-label="Clear search">×</button>}
          </label>
          <form className="mood-box" onSubmit={submitMood}>
            <input value={mood} onChange={(e) => setMood(e.target.value)} placeholder="Mood match" aria-label="Mood matcher" />
            <button type="submit">Match</button>
          </form>
        </div>
      </div>
      {location.pathname === '/favorites' && <div className="page-strip">Your saved movies</div>}
    </header>
  );
}

export default function App() {
  const [favorites, setFavorites] = useState(getFavorites);
  const [search, setSearch] = useState('');
  const [moodRequest, setMoodRequest] = useState(null);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const toggleFavorite = (movie) => {
    setFavorites((current) => {
      const exists = current.some((item) => item.id === movie.id);
      return exists ? current.filter((item) => item.id !== movie.id) : [...current, movie];
    });
  };

  return (
    <div className="app-shell">
      <Header search={search} setSearch={setSearch} onMood={setMoodRequest} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home search={search} favorites={favorites} toggleFavorite={toggleFavorite} moodRequest={moodRequest} clearMood={() => setMoodRequest(null)} />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />} />
        </Routes>
      </main>
      <footer className="footer">Cine-Stream · Sprint 08 · built with React + TMDB</footer>
    </div>
  );
}
