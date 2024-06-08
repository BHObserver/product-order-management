/* eslint-disable import/no-extraneous-dependencies */
// src/slices/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getProducts, createProduct, updateProduct, deleteProduct,
} from '../services/api';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await getProducts();
  return response.data.data;
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
    products: [],
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
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(modifyProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
