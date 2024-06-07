/* eslint-disable import/no-extraneous-dependencies */
// src/reducers/index.js
import { combineReducers } from 'redux';
import ordersReducer from './ordersReducer';
import productsReducer from './productsReducer';

const rootReducer = combineReducers({
  orders: ordersReducer,
  products: productsReducer,
});

export default rootReducer;
