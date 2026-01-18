import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/register', userData);
    console.log('Registration response:', response);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    console.error('Error response:', error.response);
    throw error;
  }
};

export default { register };
