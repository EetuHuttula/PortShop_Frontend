import React, { useState, useEffect } from 'react';
import AddCategory from '../../components/serviceHelpers/AddCategory';
import AddProduct from '../../components/serviceHelpers/AddProduct';
import CategoryList from '../../components/serviceHelpers/CategoryList'
import ProductsList from '../../components/serviceHelpers/ProductsList';
import { getProducts, createProduct, deleteProduct, updateProduct } from '../../services/productApi';
import { getCategories, deleteCategory, createCategory, updateCategory } from '../../services/categoryApi';
import './AdminDashboard.css'

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterSearch, setFilterSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const PRODUCTS_PER_PAGE = 10;

  useEffect(() => {
    const fetchInitialData = async () => {
      const productsData = await getProducts();
      const categoriesData = await getCategories();
      setProducts(productsData);
      setCategories(categoriesData);
    };

    fetchInitialData();
  }, []);

  const handleAddProduct = async (newProduct) => {
    try {
      const createdProduct = await createProduct(newProduct);
      setProducts([...products, createdProduct]);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleAddCategory = async(newCategory) => {
    try {
      const createdCategory = await createCategory(newCategory);
      setCategories([...categories, createdCategory]);
    } catch (err) {
      console.log('Error creating category', err);
    }
  }

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
 
  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);

      const updatedProducts = products.filter(product => product.categoryId !== categoryId);
      setProducts(updatedProducts);

      const updatedCategories = categories.filter(category => category.id !== categoryId);
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleUpdateProduct = async (productId, updatedProductData) => {
    try {
      await updateProduct(productId, updatedProductData);
      const updatedProducts = products.map(product =>
        product.id === productId ? { ...product, ...updatedProductData } : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleUpdateCategory = async (categoryId, updatedCategoryData) => {
    try {
      await updateCategory(categoryId, updatedCategoryData);
      const updatedCategory = categories.map(category =>
        category.id === categoryId ? { ...category, ...updatedCategoryData } : category
      );
      setCategories(updatedCategory);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const getFilteredProducts = () => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
                           product.description.toLowerCase().includes(filterSearch.toLowerCase());
      const matchesCategory = filterCategory === '' || product.categoryId === parseInt(filterCategory);
      return matchesSearch && matchesCategory;
    });
  };

  const filteredProducts = getFilteredProducts();
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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

  return (
    <div className="admin-dashboard-wrapper">
      <div className="admin-header">
        <h1>🛠️ Admin Dashboard</h1>
        <p className="admin-subtitle">Manage products and categories</p>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>📦 Total Products</h3>
          <p className="stat-number">{products.length}</p>
        </div>
        <div className="stat-card">
          <h3>🏷️ Total Categories</h3>
          <p className="stat-number">{categories.length}</p>
        </div>
      </div>

      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          🏷️ Categories
        </button>
        <button 
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          📦 Products
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'overview' && (
          <div className="tab-content">
            <div className="overview-grid">
              <div className="overview-card">
                <h2>Add New Category</h2>
                <AddCategory categories={categories} onAddCategory={handleAddCategory} />
              </div>
              <div className="overview-card">
                <h2>Add New Product</h2>
                <AddProduct categories={categories} onAddProduct={handleAddProduct} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="tab-content">
            <div className="section-card">
              <h2>📋 Categories List</h2>
              <CategoryList 
                categories={categories} 
                onDeleteCategory={handleDeleteCategory}  
                onUpdateCategory={handleUpdateCategory}
              />
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="tab-content">
            <div className="section-card">
              <h2>📦 Products List</h2>
              <div className="filter-section">
                <input 
                  type="text"
                  className="filter-input"
                  placeholder="🔍 Search products by name or description..."
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                />
                <select 
                  className="filter-select"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <ProductsList 
                products={paginatedProducts} 
                onDeleteProduct={handleDeleteProduct}  
                onUpdateProduct={handleUpdateProduct}
              />
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
