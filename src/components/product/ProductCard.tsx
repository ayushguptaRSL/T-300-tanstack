import { useState } from 'react';
import type { Product } from '../../types/product';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const FALLBACK_IMAGE =
  'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"%3E%3Crect width="300" height="200" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-family="sans-serif" font-size="14"%3ENo Image Available%3C/text%3E%3C/svg%3E';

export const ProductCard = ({ product }: ProductCardProps) => {
  const initialImage = product.thumbnail || product.images?.[0] || FALLBACK_IMAGE;
  const [imgSrc, setImgSrc] = useState(initialImage);

  return (
    <article className="product-card">
      <div className="product-image-container">
        <img
          src={imgSrc}
          alt={product.title}
          className="product-image"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          loading="lazy"
        />
      </div>

      <div className="product-details">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.title}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-description">{product.description}</p>
      </div>
    </article>
  );
};
