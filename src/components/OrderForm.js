// OrderForm.js

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function OrderForm({ onSubmit, order }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [totalQuantity, setTotalQuantity] = useState('');
  const [details, setDetails] = useState(order ? order.details : [{ variant_id: 1, quantity: '' }]);
  const [counter, setCounter] = useState(order ? order.details.length + 1 : 2);

  useEffect(() => {
    if (order) {
      setName(order.name);
      setEmail(order.email);
      setAddress(order.address);
      setTotalQuantity(order.total_quantity);
      setDetails(order.details);
    } else {
      setName('');
      setEmail('');
      setAddress('');
      setTotalQuantity('');
      setDetails([{ variant_id: 1, quantity: '' }]);
      setCounter(2);
    }
  }, [order]);

  const handleDetailChange = (index, key, value) => {
    const updatedDetails = [...details];
    if (updatedDetails[index]) {
      updatedDetails[index][key] = value;
      setDetails(updatedDetails);
    }
  };

  const handleAddDetail = () => {
    setDetails([...details, { variant_id: counter, quantity: '' }]);
    setCounter(counter + 1);
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = details.filter((_, i) => i !== index);
    setDetails(updatedDetails);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name, email, address, total_quantity: totalQuantity, details,
    });
    if (!order) {
      setName('');
      setEmail('');
      setAddress('');
      setTotalQuantity('');
      setDetails([{ variant_id: 1, quantity: '' }]);
      setCounter(2);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </div>
      <div>
        <label>Total Quantity:</label>
        <input type="number" value={totalQuantity} onChange={(e) => setTotalQuantity(e.target.value)} required />
      </div>
      <div>
        <label>Details:</label>
        {details.map((detail, index) => (
          <div key={detail.variant_id}>
            <input
              type="text"
              placeholder="Variant ID"
              value={detail.variant_id}
              readOnly
            />
            <input
              type="number"
              placeholder="Quantity"
              value={detail.quantity}
              onChange={(e) => handleDetailChange(index, 'quantity', e.target.value)}
              required
            />
            <button type="button" onClick={() => handleRemoveDetail(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddDetail}>Add Detail</button>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

OrderForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  order: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    total_quantity: PropTypes.number,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        variant_id: PropTypes.number,
        quantity: PropTypes.number,
      }),
    ),
  }),
};

OrderForm.defaultProps = {
  order: null,
};

export default OrderForm;
