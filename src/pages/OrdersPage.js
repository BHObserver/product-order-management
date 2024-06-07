import React, { useState, useEffect } from 'react';
import {
  getOrders, createOrder, updateOrder, deleteOrder,
} from '../services/api';
import OrderList from '../components/OrderList';
import OrderForm from '../components/OrderForm';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCreateOrUpdateOrder = async (order) => {
    try {
      if (editingOrder) {
        await updateOrder(editingOrder.id, order);
      } else {
        await createOrder(order);
        setSuccessMessage('Successfully Added');
        setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
      }
      fetchOrders();
      setEditingOrder(null);
    } catch (err) {
      setError('Failed to save order');
      console.error(err);
    }
  };

  const handleEditOrder = (id) => {
    const order = orders.find((o) => o.id === id);
    setEditingOrder(order);
  };

  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrder(id);
      fetchOrders();
    } catch (err) {
      setError('Failed to delete order');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Orders</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <OrderForm onSubmit={handleCreateOrUpdateOrder} order={editingOrder} />
      <OrderList orders={orders} onEdit={handleEditOrder} onDelete={handleDeleteOrder} />
    </div>
  );
}

export default OrdersPage;
