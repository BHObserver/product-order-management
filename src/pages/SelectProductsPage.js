/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table, TableHead, TableBody, TableRow, TableCell, Button,
} from '@mui/material';
import { fetchProducts } from '../slices/productsSlice';

function SelectProductsPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { products, loading, error } = useSelector((state) => state.products);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();
  const isEdit = location.state && location.state.order;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isEdit) {
      setSelectedProducts(location.state.order.details.map((detail) => detail.product_id));
    }
  }, [isEdit, location.state]);

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prevSelected) => (
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    ));
  };

  const handleNext = () => {
    navigate(isEdit ? `/orders/edit/${location.state.order.id}/variants` : '/orders/create/variants', {
      state: { selectedProducts, order: location.state.order },
    });
  };

  return (
    <div>
      <h1>Select Products</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Select</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => handleSelectProduct(product.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={() => navigate('/orders')}>Back</Button>
      <Button onClick={handleNext}>Next</Button>
    </div>
  );
}

export default SelectProductsPage;
