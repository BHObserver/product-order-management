/* eslint-disable import/no-extraneous-dependencies */
// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './slices/ordersSlice';
import productsReducer from './slices/productsSlice';

const store = configureStore({
  reducer: {
    orders: ordersReducer,
    products: productsReducer,
  },
});

export default store;
