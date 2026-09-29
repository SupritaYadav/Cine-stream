import { useCallback, useEffect, useRef, useState } from 'react';
import MovieCard from '../components/MovieCard';
import LoadingGrid from '../components/LoadingGrid';
import useDebounce from '../hooks/useDebounce';
import { getPopularMovies, searchMovies } from '../services/tmdb';
import { getMoodMovie } from '../services/mood';

export default function Home({ search, favorites, toggleFavorite, moodRequest, clearMood }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState('');
  const [moodLoading, setMoodLoading] = useState(false);
  const [moodError, setMoodError] = useState('');
  const debouncedSearch = useDebounce(search.trim(), 500);
  const sentinelRef = useRef(null);
  const requestId = useRef(0);

  const loadPage = useCallback(async (nextPage, mode, query = '') => {
    const id = ++requestId.current;
    setLoading(true);
    setError('');
    try {
      const data = mode === 'search'
        ? await searchMovies(query, nextPage)
        : await getPopularMovies(nextPage);
      if (id !== requestId.current) return;
      setTotalPages(data.total_pages || 1);
      setPage(nextPage);
      setMovies((current) => nextPage === 1 ? data.results : [...current, ...data.results]);
    } catch (err) {
      if (id === requestId.current) setError(err.message || 'Something went wrong while loading movies.');
    } finally {
      if (id === requestId.current) {
        setLoading(false);
        setInitialLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    setMovies([]);
    setPage(0);
    setTotalPages(1);
    setInitialLoading(true);
    if (debouncedSearch) loadPage(1, 'search', debouncedSearch);
    else loadPage(1, 'popular');
  }, [debouncedSearch, loadPage]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.some((entry) => entry.isIntersecting);
      if (visible && !loading && page > 0 && page < totalPages) {
        loadPage(page + 1, debouncedSearch ? 'search' : 'popular', debouncedSearch);
      }
    }, { rootMargin: '350px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, [page, totalPages, loading, debouncedSearch, loadPage]);

  useEffect(() => {
  if (!moodRequest) return;

  let cancelled = false;

  const runMoodMatch = async () => {
    setMoodLoading(true);
    setMoodError('');

    try {
      const title = await getMoodMovie(moodRequest);

      if (cancelled) return;

      window.location.hash = `mood:${encodeURIComponent(title)}`;

      setMovies([]);
      setPage(0);
      setTotalPages(1);
      setInitialLoading(true);

      await loadPage(1, 'search', title);

      if (!cancelled) {
        clearMood();
      }
    } catch (err) {
      if (!cancelled) {
        setMoodError(err.message || 'Mood matcher failed.');
      }
    } finally {
      if (!cancelled) {
        setMoodLoading(false);
      }
    }
  };

  runMoodMatch();

  return () => {
    cancelled = true;
  };
}, [moodRequest, loadPage]);

  const isFavorite = (id) => favorites.some((movie) => movie.id === id);

  return (
    <section>
      <div className="hero-row">
        <div>
          <p className="eyebrow">MOVIE DISCOVERY</p>
          <h1>{debouncedSearch ? `Results for “${debouncedSearch}”` : 'Popular right now'}</h1>
          <p className="subtext">Browse, search, and keep the movies you want to watch later.</p>
        </div>
        <div className="status-note">{loading && movies.length > 0 ? 'Loading more…' : `${movies.length} loaded`}</div>
      </div>

      {moodLoading && <div className="notice">Finding a movie for your mood…</div>}
      {moodError && <div className="notice error">{moodError}</div>}
      {error && <div className="error-box"><strong>Couldn’t load movies.</strong><span>{error}</span><button onClick={() => loadPage(1, debouncedSearch ? 'search' : 'popular', debouncedSearch)}>Try again</button></div>}

      {initialLoading && !error ? <LoadingGrid /> : movies.length > 0 ? (
        <div className="movie-grid">
          {movies.map((movie) => <MovieCard key={`${movie.id}-${movie.release_date || ''}`} movie={movie} favorite={isFavorite(movie.id)} onToggle={toggleFavorite} />)}
        </div>
      ) : !error ? <div className="empty-state"><div className="empty-icon">⌕</div><h2>No movies found</h2><p>Try a different title or clear the search.</p></div> : null}

      <div ref={sentinelRef} className="scroll-sentinel" aria-hidden="true" />
      {loading && movies.length > 0 && <div className="load-more">Loading more movies…</div>}
      {!loading && page >= totalPages && movies.length > 0 && <div className="end-note">You’ve reached the end.</div>}
    </section>
  );
}
