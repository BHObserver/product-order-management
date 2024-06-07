/* eslint-disable import/no-extraneous-dependencies */
// src/pages/OrdersPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOrders, addOrder, modifyOrder, removeOrder,
} from '../slices/ordersSlice';
import OrderList from '../components/OrderList';
import OrderForm from '../components/OrderForm';

function OrdersPage() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleCreateOrUpdateOrder = (order) => {
    if (order.id) {
      dispatch(modifyOrder({ id: order.id, order }));
    } else {
      dispatch(addOrder(order));
    }
  };

  const handleDeleteOrder = (id) => {
    dispatch(removeOrder(id));
  };

  return (
    <div>
      <h1>Orders</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <OrderForm onSubmit={handleCreateOrUpdateOrder} />
      <OrderList orders={orders} onDelete={handleDeleteOrder} />
    </div>
  );
}

export default OrdersPage;
