import axios from 'axios';

const token = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const client = axios.create({
  baseURL: BASE_URL,
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

export async function getPopularMovies(page = 1) {
  if (!token) throw new Error('TMDB token is missing. Add VITE_TMDB_KEY to .env.');
  const { data } = await client.get('/movie/popular', {
    params: { language: 'en-US', page },
  });
  return data;
}

export async function searchMovies(query, page = 1) {
  if (!token) throw new Error('TMDB token is missing. Add VITE_TMDB_KEY to .env.');
  const { data } = await client.get('/search/movie', {
    params: { language: 'en-US', query, page, include_adult: false },
  });
  return data;
}

export function posterUrl(path, size = 'w500') {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : '';
}
