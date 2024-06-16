import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct } from '../../services/productApi';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(id);
        setProduct(productData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center mt-5">Product not found</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img 
            src={`http://localhost:3001/${product.image}`} 
            alt={product.name} 
            className="img-fluid rounded mb-4" 
          />
        </div>
        <div className="col-md-6">
          <h1 className="mb-3">{product.name}</h1>
          <p className="lead mb-4">{product.description}</p>
          <h3 className="mb-4">${product.price}</h3>
          <div className="d-grid gap-2">
            <button className="btn btn-primary btn-lg">Add to Cart</button>
            <button className="btn btn-outline-secondary btn-lg"><Link to="/">Back to Products</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
