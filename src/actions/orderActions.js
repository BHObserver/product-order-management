// src/actions/orderActions.js
import {
  getOrders as fetchOrdersApi,
  createOrder as createOrderApi,
  updateOrder as updateOrderApi,
  deleteOrder as deleteOrderApi,
} from '../services/api';

export const fetchOrders = () => async (dispatch) => {
  dispatch({ type: 'FETCH_ORDERS_REQUEST' });
  try {
    const data = await fetchOrdersApi();
    dispatch({ type: 'FETCH_ORDERS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_ORDERS_FAILURE', payload: error });
  }
};

export const createOrder = (order) => async (dispatch) => {
  try {
    const data = await createOrderApi(order);
    dispatch({ type: 'CREATE_ORDER_SUCCESS', payload: data });
    dispatch(fetchOrders());
  } catch (error) {
    console.error(error);
  }
};

export const updateOrder = (id, order) => async (dispatch) => {
  try {
    await updateOrderApi(id, order);
    dispatch(fetchOrders());
  } catch (error) {
    console.error(error);
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    await deleteOrderApi(id);
    dispatch(fetchOrders());
  } catch (error) {
    console.error(error);
  }
};
