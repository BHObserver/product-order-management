/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table, TableHead, TableBody, TableRow,
  TableCell, Button, MenuItem, Select, InputLabel,
  FormControl, Typography, Box, CircularProgress, Paper, TableContainer, TextField,
} from '@mui/material';
import { styled } from '@mui/system';
import { fetchVariants } from '../slices/variantsSlice';

const Container = styled('div')({
  padding: '20px',
});

const StyledTableContainer = styled(TableContainer)({
  marginBottom: '20px',
});

const StyledTable = styled(Table)({
  minWidth: 650,
});

const StyledTableCell = styled(TableCell)({
  border: '1px solid #e0e0e0',
  padding: '16px',
});

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f0f4f8',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#ffffff',
  },
}));

const StyledTableHeadCell = styled(StyledTableCell)({
  backgroundColor: '#4f5b62',
  color: 'white',
  fontWeight: 'bold',
});

const Heading = styled(Typography)({
  color: '#37474f',
  marginBottom: '20px',
});

const StyledButton = styled(Button)({
  marginRight: '10px',
  backgroundColor: '#4f5b62',
  color: 'white',
  '&:hover': {
    backgroundColor: '#3b4a53',
  },
});

const FormControlContainer = styled(FormControl)({
  marginBottom: '20px',
  minWidth: 200,
  padding: '6px',
});

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
    if (quantity < 0) return; // Prevent negative quantities
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
    const order = location.state ? location.state.order : null;
    navigate(isEdit ? `/orders/edit/${order.id}/info` : '/orders/create/info', {
      state: {
        selectedVariants: selectedVariantsWithQuantities,
        selectedProducts,
        order,
      },
    });
  };

  return (
    <Container>
      <Heading variant="h4">Select Variants</Heading>
      {loading && <Box display="flex" justifyContent="center"><CircularProgress /></Box>}
      {error && <Typography color="error">{error}</Typography>}
      <FormControlContainer>
        <InputLabel id="select-product-label"> </InputLabel>
        <Select
          labelId="select-product-label"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          fullWidth
        >
          {selectedProducts.map((productId) => (
            <MenuItem key={productId} value={productId}>
              Product
              {' '}
              {productId}
            </MenuItem>
          ))}
        </Select>
      </FormControlContainer>
      <StyledTableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableHeadCell>ID</StyledTableHeadCell>
              <StyledTableHeadCell>Color</StyledTableHeadCell>
              <StyledTableHeadCell>Specification</StyledTableHeadCell>
              <StyledTableHeadCell>Size</StyledTableHeadCell>
              <StyledTableHeadCell>Quantity</StyledTableHeadCell>
              <StyledTableHeadCell>Select</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {variants.map((variant) => (
              <StyledTableRow key={variant.id}>
                <StyledTableCell>{variant.id}</StyledTableCell>
                <StyledTableCell>{variant.color}</StyledTableCell>
                <StyledTableCell>{variant.specification}</StyledTableCell>
                <StyledTableCell>{variant.size}</StyledTableCell>
                <StyledTableCell>
                  <TextField
                    type="number"
                    value={variantQuantities[variant.id] || ''}
                    onChange={(e) => handleQuantityChange(variant.id, e.target.value)}
                    inputProps={{ min: 0, step: 1 }}
                    fullWidth
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <input
                    type="checkbox"
                    checked={selectedVariants.includes(variant.id)}
                    onChange={() => handleSelectVariant(variant.id)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
      <Box display="flex" justifyContent="flex-end">
        <StyledButton onClick={() => navigate('/orders')}>Back</StyledButton>
        <StyledButton onClick={handleNext}>Next</StyledButton>
      </Box>
    </Container>
  );
}

export default SelectVariantsPage;
