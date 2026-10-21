import { ProductList } from './components/product/ProductList';
import './App.css';

export function App() {
  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>Mini E-Commerce Store – Products</h1>
          <p className="subtitle">Product catalog powered by TanStack Query</p>
        </div>
      </header>

      <ProductList />
    </div>
  );
}

export default App;
