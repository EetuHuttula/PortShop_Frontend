import React, { useState } from 'react';

const AddProduct = ({ categories, onAddProduct }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('image', image);

    console.log('Submitting product:', formData);
    onAddProduct(formData);
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Add New Product</h2>
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
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          className="admin-input"
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="admin-input"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="admin-input"
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Product</button>
    </form>
  );
};

export default AddProduct;
