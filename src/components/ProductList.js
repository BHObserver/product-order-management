import React from 'react';
import PropTypes from 'prop-types';

function ProductList({ products }) {
  if (!Array.isArray(products)) {
    return <div>No products available</div>;
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;
