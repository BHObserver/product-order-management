// src/components/OrderForm.js
import React, { useState } from 'react';

function OrderForm({ onSubmit, order }) {
  const [name, setName] = useState(order ? order.name : '');
  const [email, setEmail] = useState(order ? order.email : '');
  const [totalQuantity, setTotalQuantity] = useState(order ? order.total_quantity : 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, total_quantity: totalQuantity });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Total Quantity:
        <input type="number" value={totalQuantity} onChange={(e) => setTotalQuantity(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default OrderForm;
