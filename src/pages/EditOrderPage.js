/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
// EditOrderPage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField, Button, Paper, Typography, Grid, FormControl,
  InputLabel, Select, MenuItem, IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchOrder, modifyOrder } from '../slices/ordersSlice';
import { fetchProduct } from '../slices/productsSlice';

const Container = styled(Paper)({
  padding: '32px',
  marginTop: '20px',
  borderRadius: '8px',
});

const Title = styled(Typography)({
  marginBottom: '16px',
  fontWeight: 'bold',
});

const Form = styled('form')({
  marginTop: '16px',
});

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#1976d2',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#1976d2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ccc',
    },
    '&:hover fieldset': {
      borderColor: '#1976d2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
});

const StyledFormControl = styled(FormControl)({
  '& label.Mui-focused': {
    color: '#1976d2',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#1976d2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ccc',
    },
    '&:hover fieldset': {
      borderColor: '#1976d2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
});

const FormActions = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '16px',
  gap: '10px',
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
  border: '1px solid #3b4a53',
  '&:hover': {
    backgroundColor: '#f1f1f1',
    borderColor: '#3b4a53',
  },
});

const LoadingContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

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
    newDetails[index] = {
      ...newDetails[index],
      [field]: field === 'quantity' && value < 0 ? 0 : value,
    };
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

  if (orderLoading || productsLoading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  if (orderError) return <p style={{ color: 'red' }}>{orderError}</p>;
  if (productsError) return <p style={{ color: 'red' }}>{productsError}</p>;

  if (!order) return <p>No order found.</p>;

  return (
    <Container>
      <Title variant="h6" gutterBottom>
        Edit Order
      </Title>
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
          <Grid item xs={12}>
            <StyledTextField
              label="Address"
              variant="outlined"
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
                  <StyledFormControl fullWidth>
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
                  </StyledFormControl>
                </Grid>
                <Grid item xs={4}>
                  <StyledFormControl fullWidth>
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
                  </StyledFormControl>
                </Grid>
                <Grid item xs={2}>
                  <StyledTextField
                    label="Quantity"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={detail.quantity}
                    onChange={(e) => handleDetailChange(index, 'quantity', parseInt(e.target.value, 10))}
                    required
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    color="secondary"
                    onClick={() => handleRemoveProduct(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button variant="outlined" color="primary" onClick={handleAddProduct}>
              Add Product
            </Button>
          </Grid>
          <Grid item xs={12}>
            <FormActions>
              <BackButton
                onClick={() => navigate('/orders')}
                variant="outlined"
              >
                Back
              </BackButton>
              <StyledButton
                type="submit"
                variant="contained"
              >
                Submit
              </StyledButton>
            </FormActions>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
}

export default EditOrderPage;
