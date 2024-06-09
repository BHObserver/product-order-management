// src/slices/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getProducts, getProduct, createProduct, updateProduct, deleteProduct,
} from '../services/api';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await getProducts();
  return response.data.data;
});

export const fetchProduct = createAsyncThunk('products/fetchProduct', async (productId) => {
  const response = await getProduct(productId);
  return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
  const response = await createProduct(product);
  return response.data.data;
});

export const modifyProduct = createAsyncThunk('products/modifyProduct', async ({ id, product }) => {
  const response = await updateProduct(id, product);
  return response.data.data;
});

export const removeProduct = createAsyncThunk('products/removeProduct', async (id) => {
  await deleteProduct(id);
  return id;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: {}, // Use an object to store products by id
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.reduce((acc, product) => {
          acc[product.id] = product;
          return acc;
        }, {});
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items[action.payload.id] = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items[action.payload.id] = action.payload;
      })
      .addCase(modifyProduct.fulfilled, (state, action) => {
        state.items[action.payload.id] = action.payload;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        delete state.items[action.payload];
      });
  },
});

export default productsSlice.reducer;
