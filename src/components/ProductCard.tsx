import React from 'react';
import '../css/productcard.css';
import type { Product } from '../model/product';

interface ProductCardProps {
  product: Product;
  onDelete?: (id: number) => void | Promise<void>;
  showDelete?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete, showDelete = false }) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;

    setIsDeleting(true);
    try {
      await onDelete(product.id);
    } catch (error) {
      console.error('Failed to delete product:', error);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
          />
        ) : (
          <div className="product-image-placeholder">
            <span className="placeholder-icon">💎</span>
          </div>
        )}
        {showDelete && onDelete && (
          <button
            className="product-delete-icon"
            onClick={() => setShowConfirm(true)}
            disabled={isDeleting}
          >
            🗑️
          </button>
        )}
      </div>

      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price?.toFixed(2) || '0.00'}</span>
          {product.name && (
            <span className="product-shop">by {product.shopName}</span>
          )}
        </div>
      </div>

      {showConfirm && (
        <div className="delete-confirm-overlay" onClick={() => setShowConfirm(false)}>
          <div className="delete-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon">⚠️</div>
            <h3>Delete Product?</h3>
            <p>Are you sure you want to delete "{product.name}"? This action cannot be undone.</p>
            <div className="confirm-actions">
              <button
                className="confirm-btn cancel"
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                className="confirm-btn delete"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
