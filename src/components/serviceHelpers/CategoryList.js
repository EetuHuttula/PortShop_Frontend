import React, { useState } from 'react';
import './button.css' 

const CategoriesList = ({ categories, onDeleteCategory, onUpdateCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (category) => {
    setSelectedCategory(category);
    setUpdatedName(category.name);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
    setUpdatedName('');
    setShowModal(false);
  };

  const handleUpdateCategory = () => {
    if (selectedCategory && updatedName.trim() !== '') {
      onUpdateCategory(selectedCategory.id, { name: updatedName });
      handleCloseModal();
    }
  };

  const handleNameChange = (e) => {
    setUpdatedName(e.target.value);
  };

  return (
    <div className="d-flex flex-column">
      <h1>Categories</h1>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            {category.name}
            <button className="btn btn-danger edit-button" onClick={() => onDeleteCategory(category.id)}>Delete</button>
            <button className="btn btn-warning edit-button" onClick={() => handleShowModal(category)}>Update</button>
          </li>
        ))}
      </ul>
      {selectedCategory && (
        <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Category</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  value={updatedName}
                  onChange={handleNameChange}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleUpdateCategory}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
