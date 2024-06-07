import React from 'react';
import PropTypes from 'prop-types';

function OrderList({ orders, onEdit, onDelete }) {
  if (!Array.isArray(orders)) {
    return <p>No orders found.</p>;
  }

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
            <button type="button" onClick={() => onEdit(order.id)}>Edit</button>
            <button type="button" onClick={() => onDelete(order.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

OrderList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    total_quantity: PropTypes.number,
  })).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default OrderList;
