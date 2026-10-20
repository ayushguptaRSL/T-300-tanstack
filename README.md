# Product Listing with TanStack Query

Create a React application that displays a list of products fetched from a REST API using TanStack Query.

## Requirements:

1. **Install and configure `@tanstack/react-query`**:
   - Installed `@tanstack/react-query` and `@tanstack/react-query-devtools` in `package.json`.

2. **Create a `QueryClient` and wrap the application with `QueryClientProvider`**:
   - Created a `QueryClient` instance and wrapped `<App />` with `<QueryClientProvider client={queryClient}>` and `<ReactQueryDevtools />` in `src/main.tsx`.

3. **Create a product listing component that uses `useQuery()` to fetch products from an API**:
   - Created `src/components/product/ProductList.tsx` using `useQuery()` and `src/api/products.ts` to fetch products from the DummyJSON API.

4. **Use the following query key structure: `['products']`**:
   - Structured the query key as `['products', { search: searchTerm }]` to support both default product fetching and search filtering.

5. **Implement appropriate UI for**:
   - **Initial loading state using `isPending`**: Rendered `<LoadingFallback />` with 8 skeleton cards when `isPending` is true.
   - **Background fetching using `isFetching`**: Displayed an animated `.background-fetching-banner` while keeping existing cards visible when `isFetching` is true.
   - **Error state using `isError`**: Rendered an `.error-box` showing the error message and a `"Try Again"` button when `isError` is true.
   - **Successful response using `isSuccess`**: Rendered the `.product-grid` displaying `<ProductCard />` components and result counts when `isSuccess` is true.

6. **Configure the query with**:
   - **`staleTime: 30 * 1000`**: Configured cached query data to remain fresh for 30 seconds.
   - **`gcTime: 5 * 60 * 1000`**: Configured unused cached data to be garbage-collected after 5 minutes.

7. **Add a Refresh Products button that manually triggers a refetch**:
   - Added a `"Refresh Products"` button in the toolbar that calls `refetch()` and shows `"Refreshing Products..."` during fetch.

8. **Add a search/filter feature for products (`['products', { search: searchTerm }]`)**:
   - Added a search input tied to DummyJSON's `/search` endpoint that includes `searchTerm` in the query key and uses `placeholderData: keepPreviousData` to prevent layout flicker.

9. **Display the current search results without manually managing the server response using `useEffect` and `useState`**:
   - Rendered results directly from `data.products` without using `useEffect` or server-state `useState`, using `useState` solely for the search input's value.