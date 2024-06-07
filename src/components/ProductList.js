import React from 'react';
import PropTypes from 'prop-types';

const ProductList = ({ products, onEdit, onDelete }) => (
  <div>
    {products.map((product) => (
      <div key={`product-${product.id}`}>
        <h3>{product.name}</h3>
        <p>
          Brand:
          {product.brand}
        </p>
        <p>
          Type:
          {product.type}
        </p>
        <p>
          Origin:
          {product.origin}
        </p>
        <ul>
          {product.variants.map((variant) => (
            <li key={`variant-${variant.id}`}>
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
        <button type="button" onClick={() => onEdit(product)}>Edit</button>
        <button type="button" onClick={() => onDelete(product.id)}>Delete</button>
      </div>
    ))}
  </div>
);

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    variants: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      specification: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductList;
