// src/components/OrderList.js
import React from 'react';

function OrderList({ orders, onEdit, onDelete }) {
  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.name}
            {' '}
            -
            {order.email}
            {' '}
            -
            {order.total_quantity}
            <button onClick={() => onEdit(order.id)}>Edit</button>
            <button onClick={() => onDelete(order.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderList;
