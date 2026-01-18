import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import orderApi from '../../services/orderApi';
import './OrderHistory.css';

const OrderHistory = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    const loadOrders = async () => {
      try {
        setLoading(true);
        const ordersData = await orderApi.getUserOrders();
        setOrders(ordersData);
        setError(null);
      } catch (err) {
        console.error('Error loading orders:', err);
        setError('Failed to load orders. Please try again later.');
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div className="order-history-container">
        <div className="loading">⏳ Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-history-container">
        <div className="error-message">
          <p>❌ {error}</p>
        </div>
      </div>
    );
  }

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    try {
      await orderApi.cancelOrder(orderId);
      const updatedOrders = orders.map(order =>
        order.id === orderId ? { ...order, status: 'Cancelled' } : order
      );
      setOrders(updatedOrders);
      toast.success('Order cancelled successfully');
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Failed to cancel order');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return '#28a745';
      case 'Processing':
        return '#ffc107';
      case 'Cancelled':
        return '#dc3545';
      case 'Shipped':
        return '#0066cc';
      case 'Pending':
        return '#6c757d';
      default:
        return '#6c757d';
    }
  };

  return (
    <div className="order-history-container">
      <div className="order-history-header">
        <h1>📦 Order History</h1>
        <p className="subtitle">View and track your orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p className="no-orders-icon">📭</p>
          <p className="no-orders-text">No orders yet</p>
          <p className="no-orders-subtext">Start shopping to see your orders here</p>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3 className="order-id">{order.id}</h3>
                  <p className="order-date">{order.date}</p>
                </div>
                <span 
                  className="order-status"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status}
                </span>
              </div>

              <div className="order-items">
                <h4 className="items-title">Items</h4>
                <ul className="items-list">
                  {order.items.map((item, index) => (
                    <li key={index} className="item">
                      <span className="item-name">{item.name}</span>
                      <span className="item-qty">x{item.quantity}</span>
                      <span className="item-price">${item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <span className="total-label">Total:</span>
                  <span className="total-amount">${order.total.toFixed(2)}</span>
                </div>
                <div className="order-actions">
                  <button className="btn-view-details">View Details</button>
                  {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                    <button 
                      className="btn-cancel-order"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
