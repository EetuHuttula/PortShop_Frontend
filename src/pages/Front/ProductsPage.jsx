import React from 'react';
import './ProductList.css'
import Herobanner from '../../components/Hero/Herobanner'

const ProductList = ({ products, categories }) => {
  // Group products by category
  const groupedProducts = {};
  products.forEach(product => {
    if (!groupedProducts[product.category.name]) {
      groupedProducts[product.category.name] = [];
    }
    groupedProducts[product.category.name].push(product);
  });

  return (
    <>
    <Herobanner />
    <div className="container mt-5">
      <h2 className="text-center mb-4">Products</h2>
      {Object.keys(groupedProducts).map((categoryName, index) => (
        <div key={index}>
          <h3 className="mb-3">{categoryName}</h3>
          <div className="row">
            {groupedProducts[categoryName].map(product => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card">
                  <img
                      src={`http://localhost:3001/${product.image}`}
                      className="card-img-top"
                      alt={product.name} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                  </div>
                  <div className="card-footer">
                    <strong>Price:</strong> ${product.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default ProductList;

/**   
                    />*/
