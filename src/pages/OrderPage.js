// OrderPage.js

import React, { useState } from 'react';
import ProductDropdown from '../components/ProductDropdown';

const OrderPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    // Handle order submission logic here
    console.log('Order submitted for product:', selectedProduct);
  };

  return (
    <div>
      <h2>Order a Product</h2>
      <ProductDropdown onSelect={handleProductSelect} />
      {selectedProduct && (
        <div>
          <h3>Selected Product Details</h3>
          <p>
            Name:
            {selectedProduct.name}
          </p>
          <p>
            Brand:
            {selectedProduct.brand}
          </p>
          <p>
            Type:
            {selectedProduct.type}
          </p>
          <p>
            Origin:
            {selectedProduct.origin}
          </p>
          <ul>
            {selectedProduct.variants.map((variant) => (
              <li key={variant.id}>
                Color:
                {' '}
                {variant.color}
                , Specification:
                {' '}
                {variant.specification}
                , Size:
                {' '}
                {variant.size}
              </li>
            ))}
          </ul>
          <button type="button" onClick={handleOrderSubmit}>Submit Order</button>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
