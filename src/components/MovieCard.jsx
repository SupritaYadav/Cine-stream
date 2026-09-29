import { posterUrl } from '../services/tmdb';

export default function MovieCard({ movie, favorite, onToggle }) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—';
  const rating = typeof movie.vote_average === 'number' ? movie.vote_average.toFixed(1) : '—';

  return (
    <article className="movie-card">
      <div className="poster-wrap">
        {movie.poster_path ? (
          <img src={posterUrl(movie.poster_path)} alt={`${movie.title} poster`} loading="lazy" />
        ) : (
          <div className="poster-fallback"><span>NO POSTER</span></div>
        )}
        <button
          className={favorite ? 'heart-btn saved' : 'heart-btn'}
          onClick={() => onToggle(movie)}
          aria-label={favorite ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
          title={favorite ? 'Remove favorite' : 'Add favorite'}
        >
          {favorite ? '♥' : '♡'}
        </button>
      </div>
      <div className="movie-info">
        <h3 title={movie.title}>{movie.title}</h3>
        <div className="movie-meta"><span>{year}</span><span>★ {rating}</span></div>
      </div>
    </article>
  );
}
