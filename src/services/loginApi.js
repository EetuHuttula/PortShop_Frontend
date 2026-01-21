import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

const loginApi = { login };

export default loginApi;
