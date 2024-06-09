/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  Button, Typography, Box, CircularProgress, Paper, TableContainer,
} from '@mui/material';
import { styled } from '@mui/system';
import { fetchProducts } from '../slices/productsSlice';

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

function SelectProductsPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { items, loading, error } = useSelector((state) => state.products);
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
    const order = location.state ? location.state.order : null;
    navigate(isEdit ? `/orders/edit/${order.id}/variants` : '/orders/create/variants', {
      state: { selectedProducts, order },
    });
  };

  // Convert items object to an array
  const productsArray = Object.values(items);

  return (
    <Container>
      <Heading variant="h4">Select Products</Heading>
      {loading && <Box display="flex" justifyContent="center"><CircularProgress /></Box>}
      {error && <Typography color="error">{error}</Typography>}
      <StyledTableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableHeadCell>ID</StyledTableHeadCell>
              <StyledTableHeadCell>Name</StyledTableHeadCell>
              <StyledTableHeadCell>Brand</StyledTableHeadCell>
              <StyledTableHeadCell>Type</StyledTableHeadCell>
              <StyledTableHeadCell>Select</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsArray.map((product) => (
              <StyledTableRow key={product.id}>
                <StyledTableCell>{product.id}</StyledTableCell>
                <StyledTableCell>{product.name}</StyledTableCell>
                <StyledTableCell>{product.brand}</StyledTableCell>
                <StyledTableCell>{product.type}</StyledTableCell>
                <StyledTableCell>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
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

export default SelectProductsPage;
