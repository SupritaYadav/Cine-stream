export default function LoadingGrid({ count = 10 }) {
  return <div className="movie-grid">{Array.from({ length: count }, (_, i) => <div className="skeleton-card" key={i}><div className="skeleton-poster" /><div className="skeleton-line" /><div className="skeleton-line short" /></div>)}</div>;
}
