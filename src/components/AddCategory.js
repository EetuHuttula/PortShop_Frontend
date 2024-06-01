import React, { useState } from 'react';
import { createCategory } from '../services/categoryApi.js'; // Import createCategory function

const AddCategory = ({ onAddCategory }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCategory = { name, description };  
    console.log('Submitting category:', newCategory);
    onAddCategory(newCategory);
    setName('');
    setDescription('');
    } 

  return (
    <div className="d-flex flex-row p-1">
      <form onSubmit={handleSubmit}>
        <h1>Add New Category</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            className="admin-input"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            className="admin-input"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn category-btn btn-primary">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
