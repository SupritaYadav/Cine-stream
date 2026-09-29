import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';

export default function Favorites({ favorites, toggleFavorite }) {
  return (
    <section>
      <div className="hero-row">
        <div>
          <p className="eyebrow">MY LIST</p>
          <h1>Favorites</h1>
          <p className="subtext">Saved in your browser, so they stay here after a refresh.</p>
        </div>
        <div className="status-note">{favorites.length} saved</div>
      </div>

      {favorites.length ? (
        <div className="movie-grid">
          {favorites.map((movie) => <MovieCard key={movie.id} movie={movie} favorite onToggle={toggleFavorite} />)}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">♡</div>
          <h2>Your list is empty</h2>
          <p>Tap the heart on a movie to save it here.</p>
          <Link className="primary-btn" to="/">Explore movies</Link>
        </div>
      )}
    </section>
  );
}
