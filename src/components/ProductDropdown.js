/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Select, MenuItem, FormControl, InputLabel,
} from '@mui/material';
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
    <FormControl fullWidth>
      <InputLabel>Select a product</InputLabel>
      <Select value={selectedProduct} onChange={handleSelectChange}>
        <MenuItem value="" disabled>Select a product</MenuItem>
        {products.map((product) => (
          <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

ProductDropdown.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default ProductDropdown;
