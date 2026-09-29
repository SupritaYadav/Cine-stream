const KEY = 'cine-stream-favorites';

export function getFavorites() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}
