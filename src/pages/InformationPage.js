/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { addOrder, modifyOrder } from '../slices/ordersSlice';

function InformationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedVariants } = location.state;
  const isEdit = location.state && location.state.order;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (isEdit) {
      const { order } = location.state;
      setName(order.name);
      setEmail(order.email);
      setAddress(order.address);
    }
  }, [isEdit, location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      name,
      email,
      address,
      details: selectedVariants.map((variant) => ({
        variant_id: variant.id,
        quantity: variant.quantity,
      })),
    };
    if (isEdit) {
      dispatch(modifyOrder({ id: location.state.order.id, order: orderData }));
    } else {
      dispatch(addOrder(orderData));
    }
    navigate('/orders');
  };

  return (
    <div>
      <h1>Information</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          required
        />
        <Button onClick={() => navigate('/orders')}>Back</Button>
        <Button type="submit">{isEdit ? 'Update Order' : 'Create Order'}</Button>
      </form>
    </div>
  );
}

export default InformationPage;
