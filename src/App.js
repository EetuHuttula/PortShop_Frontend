import React, { useState, useEffect } from 'react';
import AdminPage from './pages/AdminTools/AdminDashboard';
import Login from './pages/auth/Login';
import Navbar from '././components/Navbar';
import { getCategories} from './services/categoryApi'; 
import { getProducts} from './services/productApi';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ProductsPage from './pages/Front/ProductsPage';

function App() {
const [categories, setCategories] = React.useState([]);
const [products, setProducts] = React.useState([]);
const [user, setUser] = useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        const productsData = await getProducts();
        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const now = new Date().getTime();

      if (parsedUser.expiryTime > now) {
        setUser(parsedUser);
      } else {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleSubmit
   = (user) => {
    setUser(user);
    console.log(user.isAdmin)
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };


  return (
     <div className="App">
    <BrowserRouter>
    <Navbar categories={categories} products={products} user={user} handleLogout={handleLogout} />
   <Routes>
    <Route path="/admin" element={ <AdminPage  />} />
    <Route path="/login"  element={!user ? <Login handleSubmit={handleSubmit} setUser={setUser} /> : <Navigate to="/" />}/>
    <Route path="/" element={<ProductsPage products={products} categories={categories} /> } />
    </Routes>
  </BrowserRouter> 
  </div>
  );
}


export default App;

