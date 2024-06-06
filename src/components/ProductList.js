// src/components/ProductList.js
import React from 'react';

function ProductList({ products, onEdit, onDelete }) {
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}
            {' '}
            -
            {product.brand}
            {' '}
            -
            {product.type}
            <button onClick={() => onEdit(product.id)}>Edit</button>
            <button onClick={() => onDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
