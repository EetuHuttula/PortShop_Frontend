import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import orderApi from '../../services/orderApi';
import './Profile.css';

const Profile = ({ user, handleLogout }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      const loadOrders = async () => {
        try {
          const ordersData = await orderApi.getUserOrders();
          setOrders(ordersData);
        } catch (error) {
          console.error('Error loading orders:', error);
          // Fallback to empty array if API fails
          setOrders([]);
        }
      };

      loadOrders();
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Reset form data if cancelling edit
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  };

  const handleSaveChanges = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Here you would typically make an API call to update user profile
    toast.success('Profile updated successfully!');
    setIsEditing(false);
    // You would need to update the user object in App.js or localStorage
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
    toast.info('You have been logged out');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return '#28a745';
      case 'Processing':
        return '#ffc107';
      case 'Cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p className="profile-badge">
            {user.isAdmin ? '👨‍💼 Admin User' : '👤 Regular User'}
          </p>
        </div>

        <div className="profile-content">
          {!isEditing ? (
            <div className="profile-info">
              <div className="info-group">
                <label className="info-label">Name</label>
                <p className="info-value">{user.name}</p>
              </div>
              <div className="info-group">
                <label className="info-label">Email</label>
                <p className="info-value">{user.email}</p>
              </div>
              {user.isAdmin && (
                <div className="info-group">
                  <label className="info-label">Role</label>
                  <p className="info-value">Administrator</p>
                </div>
              )}
              <div className="info-group">
                <label className="info-label">Account Status</label>
                <p className="info-value status-active">Active</p>
              </div>
            </div>
          ) : (
            <form className="profile-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
            </form>
          )}
        </div>

        <div className="profile-actions">
          {!isEditing ? (
            <button 
              className="btn btn-primary"
              onClick={handleEditToggle}
            >
              ✏️ Edit Profile
            </button>
          ) : (
            <>
              <button 
                className="btn btn-success"
                onClick={handleSaveChanges}
              >
                💾 Save Changes
              </button>
              <button 
                className="btn btn-secondary"
                onClick={handleEditToggle}
              >
                ❌ Cancel
              </button>
            </>
          )}
          <button 
            className="btn btn-danger"
            onClick={handleLogoutClick}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      <div className="profile-orders-section">
        <h2>📦 Order History</h2>
        {orders.length === 0 ? (
          <div className="no-orders-message">
            <p>No orders yet. Start shopping!</p>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order.id} className="order-item">
                <div className="order-item-header">
                  <div>
                    <h4 className="order-id">{order.id}</h4>
                    <p className="order-date">{order.date}</p>
                  </div>
                  <span 
                    className="order-status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="order-item-body">
                  <p className="order-items-label">Items: {order.items.length}</p>
                  <ul className="order-items-list">
                    {order.items.slice(0, 2).map((item, idx) => (
                      <li key={idx}>{item.name} (x{item.quantity})</li>
                    ))}
                    {order.items.length > 2 && <li>+{order.items.length - 2} more</li>}
                  </ul>
                </div>
                <div className="order-item-footer">
                  <span className="order-total">${order.total.toFixed(2)}</span>
                  <button className="btn-view-order">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
