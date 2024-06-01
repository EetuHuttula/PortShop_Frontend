import React, { useState } from 'react';

const ProductList = ({ products, onDeleteProduct, onUpdateProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const uniqueCategories = [...new Set(products.map(product => product.category?.name))];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUpdatedData({});
  };

  const handleSave = () => {
    onUpdateProduct(selectedProduct.id, updatedData);
    handleCloseModal();
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

    {/* Product list */}
    <div className="product-list">
      <h2>Products List</h2>
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
            <button className="btn btn-danger mr-4" onClick={() => onDeleteProduct(product.id)}>Delete</button>
            <button className="btn btn-warning" onClick={() => handleShowModal(product)}>Update</button>
          </li>
        ))}
      </ul>
    </div>

    {/* Modal for updating fields */}
    <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title mr-2">Update Product</h5>
            <button type="button" className="close ml-4 text-dark" onClick={handleCloseModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {selectedProduct && (
              <form>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    defaultValue={selectedProduct.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    defaultValue={selectedProduct.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Price:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    defaultValue={selectedProduct.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Category:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    defaultValue={selectedProduct.category?.name}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary ml-2" onClick={handleCloseModal}>Close</button>
            <button type="button" className="btn btn-primary m-2" onClick={handleSave}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};


export default ProductList;
