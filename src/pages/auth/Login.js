import React, { useState } from 'react';
import loginApi from '../../services/loginApi';
import { Navigate } from 'react-router-dom';

const Login = ({ handleSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginApi.login({ email, password });

      const expiryTime = new Date().getTime() + 3600 * 1000; // 1 hour from now
      localStorage.setItem('user', JSON.stringify({ ...user, expiryTime }));
     
      setMessage('Login successful!');
      handleSubmit(user);
      setTimeout(() => {
        localStorage.removeItem('user');
        setMessage('Session expired. Please login again.');
      }, 3600 * 1000);
      return <Navigate to="/" />;
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
    }
  };


  return (
<div className="container">
  <h2>Login</h2>
  <form onSubmit={handleLogin} className="form">
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email:</label>
      <input
        type="email"
        className="form-control"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password:</label>
      <input
        type="password"
        className="form-control"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <button type="submit" className="btn btn-primary">Login</button>
  </form>
  {message && <p>{message}</p>}
</div>

  );
};

export default Login;
