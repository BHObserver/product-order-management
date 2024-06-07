/* eslint-disable import/no-extraneous-dependencies */
// src/slices/ordersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getOrders, createOrder, updateOrder, deleteOrder,
} from '../services/api';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await getOrders();
  return response.data.data;
});

export const addOrder = createAsyncThunk('orders/addOrder', async (order) => {
  const response = await createOrder(order);
  return response;
});

export const modifyOrder = createAsyncThunk('orders/modifyOrder', async ({ id, order }) => {
  const response = await updateOrder(id, order);
  return response;
});

export const removeOrder = createAsyncThunk('orders/removeOrder', async (id) => {
  await deleteOrder(id);
  return id;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(modifyOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex((order) => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((order) => order.id !== action.payload);
      });
  },
});

export default ordersSlice.reducer;
