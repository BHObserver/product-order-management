/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  TextField, Button, Paper, Typography, Grid,
} from '@mui/material';
import { addOrder } from '../slices/ordersSlice';

function InformationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedVariants = location.state?.selectedVariants || [];
  const selectedProducts = location.state?.selectedProducts || [];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [totalQuantity] = useState(
    selectedVariants.reduce((acc, variant) => acc + (variant.quantity || 0), 0),
  );
  const [details] = useState(
    selectedVariants.map((variant) => ({
      variant_id: variant.id,
      quantity: variant.quantity || 0,
    })),
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate details
    const isValid = details.every((detail) => detail.variant_id && detail.quantity);
    if (!isValid) {
      alert('Please ensure all variant IDs and quantities are filled out.');
      return;
    }

    const order = {
      name,
      email,
      address,
      total_quantity: totalQuantity,
      details,
    };

    try {
      await dispatch(addOrder(order));
      navigate('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        Order Create
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        3 - Information
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
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography style={{ textAlign: 'right' }}>
              Sum of selected variants quantity
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" style={{ marginRight: 8 }}>
              Submit
            </Button>
            <Button onClick={() => navigate('/orders/create/variants', { state: { selectedProducts } })} variant="outlined">
              Back
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default InformationPage;
