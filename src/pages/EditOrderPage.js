/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField, Button, Paper, Typography, Grid,
} from '@mui/material';
import { fetchOrder, modifyOrder } from '../slices/ordersSlice';

function EditOrderPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order, loading, error } = useSelector((state) => state.orders);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    dispatch(fetchOrder(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (order) {
      setName(order.name);
      setEmail(order.email);
      setAddress(order.address);
      setTotalQuantity(order.total_quantity);
      setDetails(order.details);
    }
  }, [order]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedOrder = {
      name,
      email,
      address,
      total_quantity: totalQuantity,
      details,
    };
    try {
      await dispatch(modifyOrder({ id, order: updatedOrder }));
      navigate('/orders');
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order. Please try again.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!order) return <p>No order found.</p>;

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        Edit Order
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Total Quantity"
              fullWidth
              value={totalQuantity}
              onChange={(e) => setTotalQuantity(parseInt(e.target.value, 10))}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" style={{ marginRight: 8 }}>
              Submit
            </Button>
            <Button onClick={() => navigate('/orders')} variant="outlined">
              Back
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default EditOrderPage;
