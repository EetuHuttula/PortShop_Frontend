import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = Array.isArray(response.data) ? response.data : response.data.data || [];
    return data;
  } catch (error) {
    return [];
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/api/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  } catch (error) {
    throw error;
  }
};

const userApi = { getUsers, deleteUser };

export default userApi;
