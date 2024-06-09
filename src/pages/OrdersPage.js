/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button, Table, TableBody, TableCell, TableHead,
  TableRow, Typography, Container, IconButton,
  Tooltip, Box, CircularProgress, Paper, TableContainer,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/system';
import { fetchOrders, removeOrder } from '../slices/ordersSlice';

const HeaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  marginTop: '20px',
});

const StyledTableContainer = styled(TableContainer)({
  marginBottom: '20px',
});

const StyledTable = styled(Table)({
  minWidth: 650,
});

function OrdersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.orders);

  React.useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleEdit = (order) => {
    navigate(`/orders/edit/${order.id}`, { state: { order } });
  };

  const handleViewDetails = (order) => {
    navigate(`/orders/${order.id}`);
  };

  const handleAddOrder = () => {
    navigate('/orders/create');
  };

  return (
    <Container>
      <HeaderContainer>
        <Typography variant="h4">Orders</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddOrder}
        >
          Add Order
        </Button>
      </HeaderContainer>
      {loading && <Box display="flex" justifyContent="center"><CircularProgress /></Box>}
      {error && <Typography color="error">{error}</Typography>}
      <StyledTableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Total Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.total_quantity}</TableCell>
                <TableCell>
                  <Tooltip title="View Details">
                    <IconButton color="primary" onClick={() => handleViewDetails(order)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton color="primary" onClick={() => handleEdit(order)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="secondary" onClick={() => dispatch(removeOrder(order.id))}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </Container>
  );
}

export default OrdersPage;
