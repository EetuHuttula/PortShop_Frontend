import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import CartPopup from './CartPopup';
import './Navbar.css';

const Navbar = ({ categories, products, user, handleLogout }) => {
  const { getTotalItems } = useContext(CartContext);
  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const getProductsByCategory = (categoryName) => {
    return products.filter(product => product.category?.name === categoryName);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">PortShop</Link>
        <form className="navbar-search" onSubmit={handleSearch}>
          <input 
            type="text" 
            className="search-input"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">🔍</button>
        </form>
        <ul className="navbar-list">
          {categories.map(category => (
            <li 
              key={category.id} 
              className="navbar-item"
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="navbar-link">
                {category.name}
              </div>
              {hoveredCategory === category.name && (
                <div className="dropdown">
                  <Link 
                    to={`/?category=${encodeURIComponent(category.name)}`} 
                    className="dropdown-header"
                    onClick={() => setHoveredCategory(null)}
                  >
                    View All {category.name}
                  </Link>
                  {getProductsByCategory(category.name).length > 0 ? (
                    getProductsByCategory(category.name).slice(0, 5).map((product) => (
                      <Link 
                        key={product.id} 
                        to={`/products/${product.id}`} 
                        className="dropdown-item"
                        onClick={() => setHoveredCategory(null)}
                      >
                        {product.name}
                      </Link>
                    ))
                  ) : (
                    <div className="dropdown-empty">No products</div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="navbar-user">
          <button 
            className="cart-link"
            onClick={() => setIsCartPopupOpen(true)}
          >
            🛒 Cart
            {getTotalItems() > 0 && <span className="cart-badge">{getTotalItems()}</span>}
          </button>
          {user ? (
            <div className="navbar-auth">
              <Link to="/profile" className="profile-link">👤 Profile</Link>
              {user.isAdmin && <Link to="/admin" className="admin-link">Admin</Link>}
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="login-link">Login</Link>
          )}
        </div>
      </div>

      <CartPopup isOpen={isCartPopupOpen} onClose={() => setIsCartPopupOpen(false)} />
    </nav>
  );
};

export default Navbar;
