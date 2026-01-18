import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { getProduct } from '../../services/productApi';
import { handleImageError } from '../../utils/imageUtils';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(id);
        setProduct(productData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

  if (!product) {
    return <div className="not-found-container">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="product-page">
      <div className="product-hero">
        <div className="product-container">
          <Link to="/" className="breadcrumb">← Back to Products</Link>
        </div>
      </div>

      <div className="product-container">
        <div className="product-main">
          <div className="product-gallery">
            <img 
              src={`http://localhost:3001/${product.image}`} 
              alt={product.name} 
              className="product-image"
              onError={handleImageError}
            />
            <div className="product-badges">
              <span className="badge">New</span>
              <span className="badge discount">-15%</span>
            </div>
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-rating">
              <div className="stars">★★★★★</div>
              <span className="rating-count">(127 reviews)</span>
            </div>

            <div className="product-price-section">
              <div className="price-main">
                <span className="currency">$</span>
                <span className="amount">{product.price}</span>
              </div>
              <span className="price-old">${(product.price * 1.15).toFixed(2)}</span>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-stock">
              <span className="stock-label">Stock Status:</span>
              <span className="stock-status in-stock">✓ In Stock</span>
            </div>

            <div className="quantity-section">
              <label htmlFor="quantity">Quantity:</label>
              <div className="quantity-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="quantity-input"
                />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className={`btn-add-cart ${addedToCart ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
              <button className="btn-wishlist">♡ Add to Wishlist</button>
            </div>

            <div className="product-features">
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <span className="feature-text">Free Shipping on Orders Over $50</span>
              </div>
              <div className="feature">
                <span className="feature-icon">↩️</span>
                <span className="feature-text">30-Day Return Policy</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span className="feature-text">2-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>

        <div className="product-details-section">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Details
            </button>
            <button 
              className={`tab ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Specifications
            </button>
            <button 
              className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'details' && (
              <div className="details-content">
                <h3>Product Details</h3>
                <p>{product.description}</p>
                <ul className="details-list">
                  <li>✓ Premium Quality Materials</li>
                  <li>✓ Eco-Friendly Manufacturing</li>
                  <li>✓ Rigorous Quality Testing</li>
                  <li>✓ Certified and Compliant</li>
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="specs-content">
                <h3>Specifications</h3>
                <table className="specs-table">
                  <tbody>
                    <tr>
                      <td className="spec-label">Product Code</td>
                      <td className="spec-value">{product.id?.substring(0, 8).toUpperCase()}</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Category</td>
                      <td className="spec-value">Electronics</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Weight</td>
                      <td className="spec-value">500g</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Dimensions</td>
                      <td className="spec-value">25 x 15 x 10 cm</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Color</td>
                      <td className="spec-value">Black</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Warranty</td>
                      <td className="spec-value">2 Years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-content">
                <h3>Customer Reviews</h3>
                <div className="review-summary">
                  <div className="average-rating">
                    <div className="rating-number">4.8</div>
                    <div className="stars">★★★★★</div>
                    <div className="review-count">Based on 127 reviews</div>
                  </div>
                </div>
                <div className="reviews-list">
                  <div className="review-item">
                    <div className="review-header">
                      <strong>John Doe</strong>
                      <span className="review-date">2 weeks ago</span>
                    </div>
                    <div className="review-rating">★★★★★</div>
                    <p className="review-text">Excellent product! Very satisfied with the purchase. Highly recommended!</p>
                  </div>
                  <div className="review-item">
                    <div className="review-header">
                      <strong>Jane Smith</strong>
                      <span className="review-date">1 month ago</span>
                    </div>
                    <div className="review-rating">★★★★☆</div>
                    <p className="review-text">Great quality and fast shipping. Would buy again.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
