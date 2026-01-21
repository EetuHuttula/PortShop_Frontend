import React, { useState, useEffect } from 'react';
import AddCategory from '../../components/serviceHelpers/AddCategory';
import AddProduct from '../../components/serviceHelpers/AddProduct';
import CategoryList from '../../components/serviceHelpers/CategoryList'
import ProductsList from '../../components/serviceHelpers/ProductsList';
import UsersList from '../../components/serviceHelpers/UsersList';
import { getProducts, createProduct, deleteProduct, updateProduct } from '../../services/productApi';
import { getCategories, deleteCategory, createCategory, updateCategory } from '../../services/categoryApi';
import { getUsers, deleteUser } from '../../services/userApi';
import './AdminDashboard.css'

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterSearch, setFilterSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchInitialData = async () => {
      const productsData = await getProducts();
      const categoriesData = await getCategories();
      let usersData = [];
      try {
        usersData = await getUsers();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
      setProducts(productsData);
      setCategories(categoriesData);
      setUsers(usersData);
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
  }
 
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

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => (user.id || user._id) !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
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
        <div className="stat-card">
          <h3>👥 Total Users</h3>
          <p className="stat-number">{users.length}</p>
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
        <button 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Users
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
              
              </div>
              <ProductsList 
                products={filteredProducts} 
                onDeleteProduct={handleDeleteProduct}  
                onUpdateProduct={handleUpdateProduct}
              />
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="tab-content">
            <div className="section-card">
              <h2>👥 Users List</h2>
              <UsersList 
                users={users}
                onDeleteUser={handleDeleteUser}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
