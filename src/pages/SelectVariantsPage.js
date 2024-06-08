/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table, TableHead, TableBody, TableRow,
  TableCell, Button, MenuItem, Select, InputLabel, FormControl,
} from '@mui/material';
import { fetchVariants } from '../slices/variantsSlice';

function SelectVariantsPage() {
  const location = useLocation();
  const { selectedProducts } = location.state;
  const dispatch = useDispatch();
  const { variants, loading, error } = useSelector((state) => state.variants);
  const [selectedProduct, setSelectedProduct] = useState(selectedProducts[0]);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchVariants(selectedProduct));
  }, [dispatch, selectedProduct]);

  const handleSelectVariant = (variantId) => {
    setSelectedVariants((prevSelected) => (prevSelected.includes(variantId)
      ? prevSelected.filter((id) => id !== variantId)
      : [...prevSelected, variantId]));
  };

  const handleNext = () => {
    navigate('/orders/create/info', { state: { selectedVariants } });
  };

  return (
    <div>
      <h1>Select Variants</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <FormControl fullWidth>
        <InputLabel id="select-product-label">Product</InputLabel>
        <Select
          labelId="select-product-label"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          {selectedProducts.map((productId) => (
            <MenuItem key={productId} value={productId}>
              Product
              {' '}
              {productId}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Specification</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Select</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {variants.map((variant) => (
            <TableRow key={variant.id}>
              <TableCell>{variant.id}</TableCell>
              <TableCell>{variant.color}</TableCell>
              <TableCell>{variant.specification}</TableCell>
              <TableCell>{variant.size}</TableCell>
              <TableCell>
                <input
                  type="number"
                  value={variant.quantity}
                  onChange={(e) => handleSelectVariant(variant.id, parseInt(e.target.value, 10))}
                />
              </TableCell>
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedVariants.includes(variant.id)}
                  onChange={() => handleSelectVariant(variant.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={() => navigate('/orders/create')}>Back</Button>
      <Button onClick={handleNext}>Next</Button>
    </div>
  );
}

export default SelectVariantsPage;
