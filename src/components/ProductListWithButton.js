/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';

const ProductListWithButton = ({
  products, loading, error, onDelete,
}) => {
  const navigate = useNavigate();

  const handleCreateProduct = () => {
    navigate('/products/new');
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button variant="contained" color="primary" onClick={handleCreateProduct}>
        Create Product
      </Button>
      <Paper style={{ marginTop: '20px' }}>
        <ProductList products={products} onDelete={onDelete} />
      </Paper>
    </div>
  );
};

ProductListWithButton.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

ProductListWithButton.defaultProps = {
  error: null,
};

export default ProductListWithButton;
