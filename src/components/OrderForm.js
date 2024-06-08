/* eslint-disable import/no-extraneous-dependencies */
// OrderForm.js

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Button, Grid, Paper, Typography, IconButton,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

function OrderForm({ onSubmit, order }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [totalQuantity, setTotalQuantity] = useState('');
  const [details, setDetails] = useState(order ? order.details : [{ variant_id: 1, quantity: '' }]);
  const [counter, setCounter] = useState(order ? order.details.length + 1 : 2);

  useEffect(() => {
    if (order) {
      setName(order.name);
      setEmail(order.email);
      setAddress(order.address);
      setTotalQuantity(order.total_quantity);
      setDetails(order.details);
    } else {
      setName('');
      setEmail('');
      setAddress('');
      setTotalQuantity('');
      setDetails([{ variant_id: 1, quantity: '' }]);
      setCounter(2);
    }
  }, [order]);

  const handleDetailChange = (index, key, value) => {
    const updatedDetails = [...details];
    if (updatedDetails[index]) {
      updatedDetails[index][key] = value;
      setDetails(updatedDetails);
    }
  };

  const handleAddDetail = () => {
    setDetails([...details, { variant_id: counter, quantity: '' }]);
    setCounter(counter + 1);
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = details.filter((_, i) => i !== index);
    setDetails(updatedDetails);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name, email, address, total_quantity: totalQuantity, details,
    });
    if (!order) {
      setName('');
      setEmail('');
      setAddress('');
      setTotalQuantity('');
      setDetails([{ variant_id: 1, quantity: '' }]);
      setCounter(2);
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        {order ? 'Edit Order' : 'Create Order'}
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
            <TextField
              label="Total Quantity"
              fullWidth
              type="number"
              value={totalQuantity}
              onChange={(e) => setTotalQuantity(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Details</Typography>
            {details.map((detail, index) => (
              <Grid container spacing={2} key={detail.variant_id} alignItems="center">
                <Grid item xs={4}>
                  <TextField
                    label="Variant ID"
                    value={detail.variant_id}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Quantity"
                    type="number"
                    value={detail.quantity}
                    onChange={(e) => handleDetailChange(index, 'quantity', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <IconButton onClick={() => handleRemoveDetail(index)}>
                    <Remove />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button variant="outlined" onClick={handleAddDetail} startIcon={<Add />}>
              Add Detail
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

OrderForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  order: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    total_quantity: PropTypes.number,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        variant_id: PropTypes.number,
        quantity: PropTypes.number,
      }),
    ),
  }),
};

OrderForm.defaultProps = {
  order: null,
};

export default OrderForm;
