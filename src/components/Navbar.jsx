import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ categories, products, user, handleLogout }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleCategoryMouseEnter = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    setIsDropdownVisible(true);
  };

  const handleCategoryMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category?.name === selectedCategory)
    : [];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">PortShop</Link>
        <ul className="navbar-list">
          {categories.map(category => (
            <li key={category.id} className="navbar-item"
              onMouseEnter={() => handleCategoryMouseEnter(category.name)}
              onMouseLeave={handleCategoryMouseLeave}>
              <div className={`navbar-link ${selectedCategory === category.name ? 'active' : ''}`}>
                {category.name}
              </div>
              {selectedCategory === category.name && isDropdownVisible && (
                <ul className="dropdown">
                  {filteredProducts.map((product) => (
                    <li key={product.id} className="dropdown-item">
                      <Link to={`/products/${product.id}`} className="product-link">
                        {product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className="navbar-user">
          {user ? (
            <div>
              <span>Welcome, {user.name}</span>
              {user.isAdmin && <Link to="/admin" className="admin-link">Admin Page</Link>}
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
          ) : (
            <div>
              <Link to="/login" className="login-link">Login</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
