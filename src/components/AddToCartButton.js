import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';

const AddToCartButton = ({ productId }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(productId, quantity);
  };

  return (
    <div>
      <input
        type="number"
        value={quantity}
        min="1"
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button onClick={handleAddToCart} className="btn btn-success">Add to Cart</button>
    </div>
  );
};

export default AddToCartButton;
