/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  TextField, Button, Paper, Typography, Grid,
} from '@mui/material';
import { addOrder, modifyOrder } from '../slices/ordersSlice';

function InformationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedVariants } = location.state || { selectedVariants: [] };
  const selectedProducts = location.state?.selectedProducts || [];
  const isEdit = location.state && location.state.order;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const initialDetails = selectedVariants.map((variant) => ({
      variant_id: variant.id,
      quantity: Number(variant.quantity) || 0,
    }));
    setDetails(initialDetails);

    const initialTotalQuantity = initialDetails.reduce((acc, detail) => acc + detail.quantity, 0);
    setTotalQuantity(initialTotalQuantity);

    if (isEdit) {
      const { order } = location.state;
      setName(order.name);
      setEmail(order.email);
      setAddress(order.address);
    }
  }, [isEdit, location.state, selectedVariants]);

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

    console.log('Submitting order:', order);

    try {
      if (isEdit) {
        const { id } = location.state.order; // Ensure id is fetched correctly
        console.log('Modifying order with ID:', id);
        await dispatch(modifyOrder({ id, order }));
      } else {
        console.log('Adding new order');
        await dispatch(addOrder(order));
      }
      console.log('Order submitted successfully');
      navigate('/orders'); // Navigate after successful submission
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        {isEdit ? 'Order Edit' : 'Order Create'}
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
              {isEdit ? 'Update Order' : 'Submit'}
            </Button>
            <Button onClick={() => navigate(isEdit ? `/orders/edit/${location.state.order.id}/variants` : '/orders/create/variants', { state: { selectedProducts } })} variant="outlined">
              Back
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default InformationPage;
