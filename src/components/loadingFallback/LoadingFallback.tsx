import './LoadingFallback.css';

export function LoadingFallback() {
  return (
    <div>
      <p className="status-text">Loading products...</p>
      <div className="product-grid" aria-busy="true" aria-label="Loading products">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="product-card skeleton-card">
            <div className="product-details">
              <div className="skeleton-line skeleton-badge" />
              <div className="skeleton-line skeleton-title" />
              <div className="skeleton-line skeleton-price" />
              <div className="skeleton-line skeleton-desc" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
