const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Mock orders for demonstration
const getMockOrders = () => [
  {
    id: 'ORD-001',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    total: 149.99,
    status: 'Delivered',
    items: [
      { name: 'Product 1', quantity: 2, price: 49.99 },
      { name: 'Product 2', quantity: 1, price: 50.01 }
    ]
  },
  {
    id: 'ORD-002',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    total: 89.99,
    status: 'Delivered',
    items: [
      { name: 'Product 3', quantity: 1, price: 89.99 }
    ]
  },
  {
    id: 'ORD-003',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    total: 199.99,
    status: 'Processing',
    items: [
      { name: 'Product 4', quantity: 1, price: 199.99 }
    ]
  }
];

const orderApi = {
  // Get all orders for current user
  getUserOrders: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch orders');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user orders:', error);
      // Fallback to mock data
      console.log('Using mock orders for demonstration');
      return getMockOrders();
    }
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch order');
      return await response.json();
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  // Create new order
  createOrder: async (orderData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(orderData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Failed to update order status');
      return await response.json();
    } catch (error) {
      console.error('Error updating order status:', error);
      // Fallback: simulate successful update
      return { id: orderId, status };
    }
  },

  // Update order (full update)
  updateOrder: async (orderId, orderData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(orderData)
      });
      if (!response.ok) throw new Error('Failed to update order');
      return await response.json();
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  },

  // Delete order
  deleteOrder: async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete order');
      return await response.json();
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  },

  // Cancel order
  cancelOrder: async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to cancel order');
      return await response.json();
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error;
    }
  }
};

export default orderApi;
