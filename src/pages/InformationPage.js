/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  TextField, Button, Paper, Typography, Grid,
} from '@mui/material';

function InformationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if location.state is null and provide a default value
  const selectedVariants = location.state?.selectedVariants || [];
  const selectedProducts = location.state?.selectedProducts || [];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [totalQuantity] = useState(
    selectedVariants.reduce((acc, variant) => acc + variant.quantity, 0),
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit order logic here
    navigate('/orders');
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
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
            <Typography>
              Total Quantity:
              {' '}
              {totalQuantity}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button onClick={() => navigate('/orders/create/variants', { state: { selectedProducts } })}>
              Back
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default InformationPage;
