/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  TextField, Button, Paper, Typography, Grid,
} from '@mui/material';
import { styled } from '@mui/system';
import { addOrder, modifyOrder } from '../slices/ordersSlice';

const Container = styled(Paper)({
  padding: '32px',
  marginTop: '20px',
  borderRadius: '8px',
});

const Title = styled(Typography)({
  marginBottom: '16px',
  fontWeight: 'bold',
});

const Subtitle = styled(Typography)({
  marginBottom: '16px',
  color: '#666',
});

const Form = styled('form')({
  marginTop: '16px',
});

const StyledTextField = styled(TextField)({
  outline: 'none',
  '& label.Mui-focused': {
    color: '#1976d2',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#3b4a53',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#3b4a53',
    },
    '&:hover fieldset': {
      borderColor: '#3b4a53',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3b4a53',
    },
  },
});

const FormActions = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '16px',
});

const StyledButton = styled(Button)({
  marginRight: '10px',
  backgroundColor: '#4f5b62',
  color: 'white',
  '&:hover': {
    backgroundColor: '#3b4a53',
  },
});

const BackButton = styled(Button)({
  color: '#3b4a53',
  borderColor: '#3b4a53',
  '&:hover': {
    backgroundColor: '#f1f1f1',
    borderColor: '#3b4a53',
  },
});

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

    const isValid = details.every((detail) => detail.variant_id && detail.quantity > 0);
    if (!isValid) {
      alert('Please ensure all variant IDs and quantities are filled out and valid.');
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
      if (isEdit) {
        const { id } = location.state.order;
        await dispatch(modifyOrder({ id, order }));
      } else {
        await dispatch(addOrder(order));
      }
      navigate('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  return (
    <Container>
      <Title variant="h5">
        {isEdit ? 'EDIT ORDER' : 'CREATE ORDER'}
      </Title>
      <Subtitle variant="subtitle1" gutterBottom>
        INFORMATION
      </Subtitle>
      <Form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              label="Address"
              variant="outlined"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              label="Total Quantity"
              variant="outlined"
              fullWidth
              value={totalQuantity}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormActions>
              <StyledButton
                type="submit"
                variant="contained"
              >
                {isEdit ? 'Update Order' : 'Submit'}
              </StyledButton>
              <BackButton
                onClick={() => navigate(isEdit ? `/orders/edit/${location.state.order.id}/variants` : '/orders/create/variants', { state: { selectedProducts } })}
                variant="outlined"
              >
                Back
              </BackButton>
            </FormActions>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
}

export default InformationPage;
