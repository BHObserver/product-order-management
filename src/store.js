import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import ordersReducer from './slices/ordersSlice';
import variantsReducer from './slices/variantsSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
    variants: variantsReducer,
  },
});

export default store;
