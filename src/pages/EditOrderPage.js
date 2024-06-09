/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
// EditOrderPage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField, Button, Paper, Typography, Grid, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import { fetchOrder, modifyOrder } from '../slices/ordersSlice';
import { fetchProduct } from '../slices/productsSlice';

function EditOrderPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order, loading: orderLoading, error: orderError } = useSelector((state) => state.orders);
  const {
    items: products,
    loading: productsLoading, error: productsError,
  } = useSelector((state) => state.products);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [details, setDetails] = useState([]);

  useEffect(() => {
    dispatch(fetchOrder(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (order) {
      setName(order.name);
      setEmail(order.email);
      setAddress(order.address);
      setDetails(order.details);

      order.details.forEach((detail) => {
        const productId = detail.variant.product_id;
        dispatch(fetchProduct(productId));
      });
    }
  }, [order, dispatch]);

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...details];
    newDetails[index][field] = value;
    setDetails(newDetails);
  };

  const handleAddProduct = () => {
    setDetails([...details, { variant_id: '', quantity: 0 }]);
  };

  const handleRemoveProduct = (index) => {
    const newDetails = details.filter((_, i) => i !== index);
    setDetails(newDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedOrder = {
      name,
      email,
      address,
      total_quantity: details.reduce((acc, detail) => acc + detail.quantity, 0),
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

  if (orderLoading || productsLoading) return <p>Loading...</p>;
  if (orderError) return <p style={{ color: 'red' }}>{orderError}</p>;
  if (productsError) return <p style={{ color: 'red' }}>{productsError}</p>;
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
          <Grid item xs={12}>
            {details.map((detail, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Product</InputLabel>
                    <Select
                      value={detail.variant?.product_id || ''}
                      onChange={(e) => handleDetailChange(index, 'product_id', e.target.value)}
                      required
                    >
                      {products && Object.values(products).map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                          {product.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Variant</InputLabel>
                    <Select
                      value={detail.variant_id || ''}
                      onChange={(e) => handleDetailChange(index, 'variant_id', e.target.value)}
                      required
                    >
                      {products[detail.variant?.product_id]?.variants?.map((variant) => (
                        <MenuItem key={variant.id} value={variant.id}>
                          {variant.color}
                          {' '}
                          -
                          {variant.size}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="Quantity"
                    fullWidth
                    type="number"
                    value={detail.quantity}
                    onChange={(e) => handleDetailChange(index, 'quantity', parseInt(e.target.value, 10))}
                    required
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button variant="outlined" color="secondary" onClick={() => handleRemoveProduct(index)}>
                    Remove
                  </Button>
                </Grid>
              </Grid>
            ))}
            <Button variant="outlined" color="primary" onClick={handleAddProduct}>
              Add Product
            </Button>
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
