// productApi.js

import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    const productsWithImages = await Promise.all(response.data.map(async product => {
      const imageUrl = product.imageUrl ? `${API_URL}/${product.imageUrl}` : null;
      return { ...product, imageUrl };
    }));
    return productsWithImages;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
export const getProduct = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(`${API_URL}/products`, product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(`${API_URL}/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/products/${id}`);
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/products/category/${category}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err; 
  }
};