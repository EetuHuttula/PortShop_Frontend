import React, { useState, useEffect } from 'react';
import AddCategory from '../../components/AddCategory';
import AddProduct from '../../components/AddProduct';
import CategoryList from '../../components/CategoryList'
import ProductsList from '../../components/ProductsList';  // Make sure the import path is correct
import { getProducts, createProduct, deleteProduct, updateProduct } from '../../services/productApi';
import { getCategories, deleteCategory, createCategory, updateCategory } from '../../services/categoryApi';
import './AdminDashboard.css'

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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



  return (
    <div className="admin-dashboard">
    <h1 className="admin-dashboard-title">Admin Dashboard</h1>
    <div className="admin-dashboard-content">
      <div className="admin-dashboard-section">
        <h2>Add Category</h2>
        <AddCategory categories={categories} onAddCategory={handleAddCategory} />
      </div>
      <div className="admin-dashboard-section">
        <h2>Categories</h2>
        <CategoryList categories={categories} onDeleteCategory={handleDeleteCategory}  onUpdateCategory={handleUpdateCategory}/>
      </div>
      <div className="admin-dashboard-section">
        <h2>Add Product</h2>
        <AddProduct categories={categories} onAddProduct={handleAddProduct} />
      </div>
      <div className="admin-dashboard-section">
        <h2>Products</h2>
        <ProductsList products={products} onDeleteProduct={handleDeleteProduct}  onUpdateProduct={handleUpdateProduct}/>
      </div>
    </div>
  </div>
  );
}
