/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Button, Grid, Paper, Typography, IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/productsSlice';

const ProductForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [origin, setOrigin] = useState('');
  const [variants, setVariants] = useState([{ color: '', specification: '', size: '' }]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state
    .products.products.find((p) => p.id === parseInt(id, 10)));
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      if (!product) {
        dispatch(fetchProducts(id));
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
    navigate('/products'); // Redirect to products list after submission
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
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        {id ? 'Edit Product' : 'Add Product'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Brand"
              fullWidth
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Type"
              fullWidth
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Origin"
              fullWidth
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Variants
            </Typography>
            {variants.map((variant, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={3}>
                  <TextField
                    label="Color"
                    fullWidth
                    value={variant.color}
                    onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Specification"
                    fullWidth
                    value={variant.specification}
                    onChange={(e) => handleVariantChange(index, 'specification', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Size"
                    fullWidth
                    value={variant.size}
                    onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <IconButton onClick={handleAddVariant}>
                    <AddIcon />
                  </IconButton>
                  <IconButton onClick={() => handleRemoveVariant(index)}>
                    <RemoveIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleBack}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" style={{ marginLeft: 16 }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

ProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ProductForm;
