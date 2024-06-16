import React, { useState } from 'react';
import './button.css';

const ProductList = ({ products, onDeleteProduct, onUpdateProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [showProductListModal, setShowProductListModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const uniqueCategories = [...new Set(products.map(product => product.category?.name))];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleShowProductListModal = () => {
    setShowProductListModal(true);
  };

  const handleCloseProductListModal = () => {
    setShowProductListModal(false);
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
      {/* Category buttons */}
      <div>
        <h3>Categories:</h3>
        <div>
          {uniqueCategories.map(category => (
            <button key={category} onClick={() => handleCategoryClick(category)}>
              {category}
            </button>
          ))}
          <button onClick={() => setSelectedCategory('')}>Show All</button>
        </div>
      </div>

      {/* Product count and show all button */}
      <div className="product-summary">
        <h2>Products List</h2>
        <p>Count: {filteredProducts.length}</p>
        <button className="btn btn-primary" onClick={handleShowProductListModal}>Show All Products</button>
      </div>

      {/* Product list modal */}
      <div className={`modal ${showProductListModal ? 'show' : ''}`} style={{ display: showProductListModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title mr-2">Products List</h5>
              <button type="button" className="close ml-4 text-dark" onClick={handleCloseProductListModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
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
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary ml-2" onClick={handleCloseProductListModal}>Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit product modal */}
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
