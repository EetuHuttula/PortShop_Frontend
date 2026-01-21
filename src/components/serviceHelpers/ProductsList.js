import React, { useState } from 'react';
import './button.css';

const ProductList = ({ products, onDeleteProduct, onUpdateProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);

  const uniqueCategories = [...new Set(products.map(product => product.category?.name))];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleShowEditModal = (product) => {
    setSelectedProduct(product);
    setUpdatedData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category?.name,
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedProduct(null);
    setUpdatedData({});
  };

  const handleSave = () => {
    onUpdateProduct(selectedProduct.id, updatedData);
    handleCloseEditModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category?.name === selectedCategory)
    : products;

  return (
    <div>
      <div className="products-filters">
        <h3>Filter by Category:</h3>
        <div className="category-buttons">
          <button 
            className={`category-btn ${selectedCategory === '' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('')}
          >
            Show All
          </button>
          {uniqueCategories.map(category => (
            <button 
              key={category} 
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="product-summary">
        <div className="summary-info">
          <h3>Products Showing: <span className="count">{filteredProducts.length}</span></h3>
        </div>
      </div>

      <div className="product-list">
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <div>
                <strong>Name:</strong> {product.name}
              </div>
              <div>
                <strong>Description:</strong> {product.description}
              </div>
              <div>
                <strong>Price:</strong> ${product.price}
              </div>
              <div>
                <strong>Category:</strong> {product.category?.name}
              </div>
              <button className="btn btn-danger edit-button" onClick={() => onDeleteProduct(product.id)}>Delete</button>
              <button className="btn btn-warning edit-button" onClick={() => handleShowEditModal(product)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>

      <div className={`modal ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title mr-2">Edit Product</h5>
              <button type="button" className="close ml-4 text-dark" onClick={handleCloseEditModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={updatedData.name || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={updatedData.description || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Price:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={updatedData.price || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Category:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    value={updatedData.category || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary ml-2" onClick={handleCloseEditModal}>Close</button>
              <button type="button" className="btn btn-primary m-2" onClick={handleSave}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
