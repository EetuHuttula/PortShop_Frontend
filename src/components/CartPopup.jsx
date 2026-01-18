import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import './CartPopup.css';

const CartPopup = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useContext(CartContext);

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-popup-overlay" onClick={onClose}></div>
      <div className="cart-popup-modal">
        <div className="cart-popup-header">
          <h3>Shopping Cart</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty-message">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-items-container">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-details">
                    <h5>{item.name}</h5>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-item-quantity">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                      className="qty-input"
                    />
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-popup-summary">
              <div className="summary-total">
                <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
              </div>
              <Link to="/checkout" className="btn btn-success btn-sm" onClick={onClose}>
                Proceed to Checkout
              </Link>
              <Link to="/cart" className="btn btn-outline-primary btn-sm" onClick={onClose}>
                View Full Cart
              </Link>
              <button
                onClick={() => {
                  clearCart();
                  onClose();
                }}
                className="btn btn-outline-danger btn-sm"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPopup;
