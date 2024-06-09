/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/system';
import { fetchProduct } from '../slices/productsSlice';

const StyledPaper = styled(Paper)({
  padding: '20px',
});

const StyledTypography = styled(Typography)({
  marginBottom: '28px',
  textAlign: 'center',
  fontSize: '28px',
});

const StyledGridItem = styled(Grid)({
  marginBottom: '8px',
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

const ProductForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [origin, setOrigin] = useState('');
  const [variants, setVariants] = useState([{ color: '', specification: '', size: '' }]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.items[id]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      if (!product) {
        dispatch(fetchProduct(id));
      } else {
        setName(product.name);
        setBrand(product.brand);
        setType(product.type);
        setOrigin(product.origin);
        setVariants(product.variants || [{ color: '', specification: '', size: '' }]);
      }
    } else {
      setName('');
      setBrand('');
      setType('');
      setOrigin('');
      setVariants([{ color: '', specification: '', size: '' }]);
    }
  }, [dispatch, id, product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id, name, brand, type, origin, variants,
    });
    navigate('/products');
  };

  const handleBack = () => {
    navigate('/products');
  };

  const handleAddVariant = () => {
    setVariants([...variants, { color: '', specification: '', size: '' }]);
  };

  const handleRemoveVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  return (
    <StyledPaper>
      <IconButton onClick={handleBack}>
        <ArrowBackIcon />
      </IconButton>
      <StyledTypography variant="h5" gutterBottom>
        {id ? 'EDIT PRODUCT' : 'ADD PRODUCT'}
      </StyledTypography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <StyledGridItem item xs={12} sm={6}>
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </StyledGridItem>
          <StyledGridItem item xs={12} sm={6}>
            <TextField
              label="Brand"
              fullWidth
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </StyledGridItem>
          <StyledGridItem item xs={12} sm={6}>
            <TextField
              label="Type"
              fullWidth
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </StyledGridItem>
          <StyledGridItem item xs={12} sm={6}>
            <TextField
              label="Origin"
              fullWidth
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
            />
          </StyledGridItem>
          <StyledGridItem item xs={12}>
            <Typography variant="h6" gutterBottom>
              VARIANTS:
            </Typography>
            {variants.map((variant, index) => (
              <Grid container spacing={2} key={index}>
                <StyledGridItem item xs={12} sm={3}>
                  <TextField
                    label="Color"
                    fullWidth
                    value={variant.color}
                    onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                    required
                  />
                </StyledGridItem>
                <StyledGridItem item xs={12} sm={3}>
                  <TextField
                    label="Specification"
                    fullWidth
                    value={variant.specification}
                    onChange={(e) => handleVariantChange(index, 'specification', e.target.value)}
                    required
                  />
                </StyledGridItem>
                <StyledGridItem item xs={12} sm={3}>
                  <TextField
                    label="Size"
                    fullWidth
                    value={variant.size}
                    onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                    required
                  />
                </StyledGridItem>
                <StyledGridItem item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <IconButton onClick={handleAddVariant}>
                    <AddIcon />
                  </IconButton>
                  <IconButton onClick={() => handleRemoveVariant(index)}>
                    <RemoveIcon />
                  </IconButton>
                </StyledGridItem>
              </Grid>
            ))}
          </StyledGridItem>
          <StyledGridItem item xs={12}>
            <Box display="flex" justifyContent="flex-end" gap="10px">
              <BackButton onClick={handleBack}>
                Cancel
              </BackButton>
              <StyledButton type="submit">
                Submit
              </StyledButton>
            </Box>
          </StyledGridItem>
        </Grid>
      </form>
    </StyledPaper>
  );
};

ProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ProductForm;
