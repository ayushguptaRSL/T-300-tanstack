import type { ProductsResponse } from '../types/product';

export async function fetchProducts(
  searchTerm: string = '',
  signal?: AbortSignal,
  simulateError: boolean = false
): Promise<ProductsResponse> {
  if (simulateError) {
    throw new Error('Simulated network error: Unable to fetch products from API.');
  }

  const trimmed = searchTerm.trim();
  const url = trimmed
    ? `https://dummyjson.com/products/search?q=${encodeURIComponent(trimmed)}&select=title,price,category,thumbnail,images,description`
    : 'https://dummyjson.com/products?limit=30&select=title,price,category,thumbnail,images,description';

  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<ProductsResponse>;
}
