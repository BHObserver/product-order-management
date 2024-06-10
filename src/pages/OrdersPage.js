/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button, Table, TableBody, TableCell, TableHead,
  TableRow, Typography, Container, IconButton,
  Tooltip, Box, CircularProgress, Paper, TableContainer,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/system';
import { fetchOrders, removeOrder } from '../slices/ordersSlice';

const HeaderContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  marginTop: '25px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginBottom: '20px',
  minWidth: 650,
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
    overflowX: 'auto',
  },
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
    '& th, & td': {
      padding: '8px',
    },
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid #e0e0e0',
  padding: '10px',
  [theme.breakpoints.down('sm')]: {
    padding: '8px',
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f0f4f8',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#ffffff',
  },
}));

const StyledTableHeadCell = styled(StyledTableCell)(() => ({
  backgroundColor: '#4f5b62',
  color: 'white',
  fontWeight: 'bold',
}));

const ProductListHeading = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: '#37474f',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

const IconStyle = styled(ShoppingCartIcon)(({ theme }) => ({
  marginRight: '10px',
  fontSize: '32px',
  color: '#37474f',
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
  },
}));

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
        <ProductListHeading variant="h5" gutterBottom>
          <IconStyle />
          ORDER LIST
        </ProductListHeading>
        <Button
          variant="contained"
          style={{ backgroundColor: '#4f5b62', color: 'white' }}
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
              <StyledTableHeadCell>ID</StyledTableHeadCell>
              <StyledTableHeadCell>Name</StyledTableHeadCell>
              <StyledTableHeadCell>Email</StyledTableHeadCell>
              <StyledTableHeadCell>Address</StyledTableHeadCell>
              <StyledTableHeadCell>Total Quantity</StyledTableHeadCell>
              <StyledTableHeadCell>Created At</StyledTableHeadCell>
              <StyledTableHeadCell>Actions</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <StyledTableRow key={order.id}>
                <StyledTableCell>{order.id}</StyledTableCell>
                <StyledTableCell>{order.name}</StyledTableCell>
                <StyledTableCell>{order.email}</StyledTableCell>
                <StyledTableCell>{order.address}</StyledTableCell>
                <StyledTableCell>{order.total_quantity}</StyledTableCell>
                <StyledTableCell>{`${(new Date(order.created_at)).toLocaleDateString()}`}</StyledTableCell>
                <StyledTableCell>
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
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </Container>
  );
}

export default OrdersPage;
