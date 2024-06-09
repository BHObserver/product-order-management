/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button, Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import { fetchOrders, removeOrder } from '../slices/ordersSlice';

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

  const handleAddOrder = () => {
    navigate('/orders/create');
  };

  return (
    <div>
      <h1>Orders</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button onClick={handleAddOrder}>Add Order</Button>
      <Table>
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
                <Button onClick={() => handleEdit(order)}>Edit</Button>
                <Button onClick={() => dispatch(removeOrder(order.id))}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default OrdersPage;
