import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './contexts/CartContext';
import AdminPage from './pages/AdminTools/AdminDashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Navbar from './components/Navbar';
import TopBanner from './components/TopBanner';
import { getCategories } from './services/categoryApi';
import { getProducts, getProduct } from './services/productApi'; // Import getProduct
import ProductsPage from './pages/Front/ProductsPage';
import ProductPage from './pages/productPage/ProductPage';
import Cart from './pages/cart/Cart';
import Checkout from './pages/cart/Checkout';
import Profile from './pages/profile/Profile';
import OrderHistory from './pages/orders/OrderHistory';

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
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
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      const now = new Date().getTime();

      // Check if session is still valid
      if (parsedUser.expiryTime > now) {
        setUser(parsedUser);
      } else {
        // Session expired, clear storage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    } else if (storedUser || storedToken) {
      // Only one exists, clear both for consistency
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, []);

  const handleSubmit = (user) => {
    const userWithExpiry = {
      ...user,
      expiryTime: new Date().getTime() + 3600 * 1000 // 1 hour from now
    };
    setUser(userWithExpiry);
    localStorage.setItem('user', JSON.stringify(userWithExpiry));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <CartProvider>
      <div className="App">
        <ToastContainer 
          position="top-right" 
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <BrowserRouter>
          <TopBanner />
          <Navbar categories={categories} products={products} user={user} handleLogout={handleLogout} />
          <Routes>
            <Route path="/admin" element={user && user.isAdmin ? <AdminPage /> : <Navigate to="/" />} />
            <Route path="/login" element={!user ? <Login handleSubmit={handleSubmit} setUser={setUser} /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
            <Route path="/profile" element={user ? <Profile user={user} handleLogout={handleLogout} /> : <Navigate to="/login" />} />
            <Route path="/orders" element={user ? <OrderHistory user={user} /> : <Navigate to="/login" />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/" element={<ProductsPage products={products} categories={categories} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </CartProvider>
  );
}

export default App;
