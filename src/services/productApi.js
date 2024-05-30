import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const getProduct = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

export const createProduct = async (category) => {
  const response = await axios.post(`${API_URL}/products`, category);
  return response.data;
};

export const updateProduct = async (id, category) => {
  const response = await axios.put(`${API_URL}/products/${id}`, category);
  return response.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/categories/${id}`);
};
