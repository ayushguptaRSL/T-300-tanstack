import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchProducts } from '../../api/products';
import { ProductCard } from './ProductCard';
import { LoadingFallback } from '../loadingFallback/LoadingFallback';
import './ProductCard.css';
import './ProductList.css';

export function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [simulateFailure, setSimulateFailure] = useState(false);

  const {
    data,
    isPending,
    isFetching,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['products', { search: searchTerm, simulateFailure }],
    queryFn: ({ signal }) => fetchProducts(searchTerm, signal, simulateFailure),
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    networkMode: 'always',
  });

  return (
    <section className="product-list-section">
      <title>Mini E-Commerce Store – Products</title>
      <meta
        name="description"
        content="Browse our catalog of products with prices, categories, and descriptions."
      />

      {isFetching && (
        <div className="background-fetching-banner" role="status" aria-live="polite">
          <span className="spinner-dots" aria-hidden="true" />
          <span>Updating products in the background...</span>
        </div>
      )}

      <div className="toolbar-container">
        <div className="search-bar-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search products by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search products"
          />
        </div>

        <button
          type="button"
          className="btn-primary btn-refresh"
          onClick={() => void refetch()}
          disabled={isFetching}
          aria-label="Refresh Products"
        >
          {isFetching ? 'Refreshing Products...' : 'Refresh Products'}
        </button>

        <label className="failure-toggle" title="Check this to simulate API failure">
          <input
            type="checkbox"
            checked={simulateFailure}
            onChange={(e) => setSimulateFailure(e.target.checked)}
          />
          Simulate Failure
        </label>
      </div>

      {isPending && <LoadingFallback />}

      {isError && (
        <div className="error-box" role="alert">
          <h2>Failed to Load Products</h2>
          <p className="error-message">
            {error instanceof Error ? error.message : 'An unexpected error occurred while fetching product data.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSimulateFailure(false);
              void refetch();
            }}
            className="btn-retry"
          >
            Try Again
          </button>
        </div>
      )}

      {isSuccess && (
        <>
          <div className="search-meta">
            <span className="status-text">
              Showing {data.products.length} product{data.products.length !== 1 ? 's' : ''}
              {searchTerm.trim() ? ` for "${searchTerm.trim()}"` : ''}
            </span>
          </div>

          {data.products.length === 0 ? (
            <div className="no-products-message">
              <p>No products found matching &quot;{searchTerm}&quot;.</p>
            </div>
          ) : (
            <div className="product-grid">
              {data.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
