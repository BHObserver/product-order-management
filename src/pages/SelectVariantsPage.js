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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { variants, loading, error } = useSelector((state) => state.variants);

  const { selectedProducts } = location.state;
  const isEdit = location.state && location.state.order;

  const [selectedProduct, setSelectedProduct] = useState(selectedProducts[0] || '');
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [variantQuantities, setVariantQuantities] = useState({});

  useEffect(() => {
    if (selectedProduct) {
      dispatch(fetchVariants(selectedProduct));
    }
  }, [dispatch, selectedProduct]);

  useEffect(() => {
    if (isEdit) {
      const { order } = location.state;
      const initialSelectedVariants = order.details.map((detail) => detail.variant_id);
      const initialVariantQuantities = {};
      order.details.forEach((detail) => {
        initialVariantQuantities[detail.variant_id] = detail.quantity;
      });
      setSelectedVariants(initialSelectedVariants);
      setVariantQuantities(initialVariantQuantities);
    }
  }, [isEdit, location.state]);

  const handleQuantityChange = (variantId, quantity) => {
    setVariantQuantities((prevQuantities) => ({
      ...prevQuantities,
      [variantId]: quantity,
    }));
  };

  const handleSelectVariant = (variantId) => {
    setSelectedVariants((prevSelected) => (
      prevSelected.includes(variantId)
        ? prevSelected.filter((id) => id !== variantId)
        : [...prevSelected, variantId]
    ));
  };

  const handleNext = () => {
    const selectedVariantsWithQuantities = selectedVariants.map((id) => ({
      id,
      quantity: variantQuantities[id] || 0,
    }));
    navigate(isEdit ? `/orders/edit/${location.state.order.id}/info` : '/orders/create/info', {
      state: {
        selectedVariants: selectedVariantsWithQuantities,
        selectedProducts,
        order: location.state.order,
      },
    });
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
                  value={variantQuantities[variant.id] || ''}
                  onChange={(e) => handleQuantityChange(variant.id, e.target.value)}
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
      <Button onClick={() => navigate('/orders')}>Back</Button>
      <Button onClick={handleNext}>Next</Button>
    </div>
  );
}

export default SelectVariantsPage;
