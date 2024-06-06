// src/pages/OrdersPage.js
import React, { useState, useEffect } from 'react';
import {
  getOrders, createOrder, updateOrder, deleteOrder,
} from '../services/api';
import OrderList from '../components/OrderList';
import OrderForm from '../components/OrderForm';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await getOrders();
    setOrders(response.data);
  };

  const handleCreateOrUpdateOrder = async (order) => {
    if (editingOrder) {
      await updateOrder(editingOrder.id, order);
    } else {
      await createOrder(order);
    }
    fetchOrders();
    setEditingOrder(null);
  };

  const handleEditOrder = (id) => {
    const order = orders.find((o) => o.id === id);
    setEditingOrder(order);
  };

  const handleDeleteOrder = async (id) => {
    await deleteOrder(id);
    fetchOrders();
  };

  return (
    <div>
      <h1>Orders</h1>
      <OrderForm onSubmit={handleCreateOrUpdateOrder} order={editingOrder} />
      <OrderList orders={orders} onEdit={handleEditOrder} onDelete={handleDeleteOrder} />
    </div>
  );
}

export default OrdersPage;
