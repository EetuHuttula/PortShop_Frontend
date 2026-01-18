import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './ProductList.css';
import Herobanner from '../../components/Hero/Herobanner';
import { handleImageError } from '../../utils/imageUtils';

const ProductList = ({ products, categories }) => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const selectedCategory = searchParams.get('category');
  const searchQuery = searchParams.get('search');
  const PRODUCTS_PER_PAGE = 15;

  let displayProducts = products;
  if (selectedCategory) {
    displayProducts = displayProducts.filter(product => product.category?.name === selectedCategory);
  }
  if (searchQuery) {
    displayProducts = displayProducts.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const groupedProducts = {};
  displayProducts.forEach(product => {
    if (!groupedProducts[product.category.name]) {
      groupedProducts[product.category.name] = [];
    }
    groupedProducts[product.category.name].push(product);
  });

  const flatProducts = displayProducts;
  const totalPages = Math.ceil(flatProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = flatProducts.slice(startIndex, endIndex);

  const paginatedGroupedProducts = {};
  paginatedProducts.forEach(product => {
    if (!paginatedGroupedProducts[product.category.name]) {
      paginatedGroupedProducts[product.category.name] = [];
    }
    paginatedGroupedProducts[product.category.name].push(product);
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);
    
    if (currentPage > 3) {
      pages.push('...');
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      if (!pages.includes(i)) pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  const getFilterTitle = () => {
    if (selectedCategory && searchQuery) {
      return `${selectedCategory} - Search: "${searchQuery}"`;
    } else if (selectedCategory) {
      return `${selectedCategory} Products`;
    } else if (searchQuery) {
      return `Search Results: "${searchQuery}"`;
    }
    return 'Products';
  };

  return (
    <>
      <Herobanner />
      <div className="container mt-5">
        <div className="products-header">
          <h2>{getFilterTitle()}</h2>
          {(selectedCategory || searchQuery) && (
            <Link to="/" className="clear-filter">View All Products</Link>
          )}
        </div>
        
        {displayProducts.length === 0 ? (
          <div className="no-products">
            <p>No products found</p>
            <Link to="/" className="btn btn-primary">Back to All Products</Link>
          </div>
        ) : (
          <>
            {Object.keys(paginatedGroupedProducts).map((categoryName, index) => (
              <div key={index} className="category-section">
                <h3 className="category-title">{categoryName}</h3>
                <div className="products-grid">
                  {paginatedGroupedProducts[categoryName].map(product => (
                    <div key={product.id} className="card">
                      <Link to={`/products/${product.id}`} className="card-img-container">
                        <img
                          src={`http://localhost:3001/${product.image}`}
                          className="card-img-top"
                          alt={product.name}
                          onError={handleImageError}
                        />
                      </Link>
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                        <div className="card-price">${product.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="pagination-btn"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  ← Prev
                </button>
                {getPageNumbers().map((pageNum, idx) => (
                  pageNum === '...' ? (
                    <span key={`dots-${idx}`} className="pagination-dots">...</span>
                  ) : (
                    <button
                      key={pageNum}
                      className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  )
                ))}
                <button 
                  className="pagination-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProductList;
