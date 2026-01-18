import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';

const AddToCartButton = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="add-to-cart-wrapper">
      <input
        type="number"
        value={quantity}
        min="1"
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="quantity-input"
      />
      <button onClick={handleAddToCart} className="btn btn-success">Add to Cart</button>
    </div>
  );
};

export default AddToCartButton;
