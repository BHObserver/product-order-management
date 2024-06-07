// ProductDropdown.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getProducts } from '../services/api';

const ProductDropdown = ({ onSelect }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSelectChange = (event) => {
    const productId = event.target.value;
    setSelectedProduct(productId);
    const selectedProduct = products.find((product) => product.id === parseInt(productId, 10));
    onSelect(selectedProduct);
  };

  return (
    <select value={selectedProduct} onChange={handleSelectChange}>
      <option value="" disabled>Select a product</option>
      {products.map((product) => (
        <option key={product.id} value={product.id}>{product.name}</option>
      ))}
    </select>
  );
};

ProductDropdown.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default ProductDropdown;
