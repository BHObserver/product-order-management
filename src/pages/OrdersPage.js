/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrders, removeOrder } from '../slices/ordersSlice';
import OrderList from '../components/OrderList';

function OrdersPage() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleDeleteOrder = (id) => {
    dispatch(removeOrder(id));
  };

  const handleEditOrder = (id) => {
    // Implement the edit order functionality here
    // For example, navigate to an edit order page
    navigate(`/orders/edit/${id}`);
  };

  return (
    <div>
      <h1>Orders</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="button" onClick={() => navigate('/orders/create')}>Create Order</button>
      <OrderList orders={orders} onEdit={handleEditOrder} onDelete={handleDeleteOrder} />
    </div>
  );
}

export default OrdersPage;
