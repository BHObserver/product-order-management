/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ProductForm({ onSubmit, product }) {
  const [name, setName] = useState(product ? product.name : '');
  const [brand, setBrand] = useState(product ? product.brand : '');
  const [type, setType] = useState(product ? product.type : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, brand, type });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="brand">Brand:</label>
      <input id="brand" type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />

      <label htmlFor="type">Type:</label>
      <input id="type" type="text" value={type} onChange={(e) => setType(e.target.value)} />

      <button type="submit">Submit</button>
    </form>
  );
}

ProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string,
    brand: PropTypes.string,
    type: PropTypes.string,
  }),
};

ProductForm.defaultProps = {
  product: {
    name: '',
    brand: '',
    type: '',
  },
};

export default ProductForm;
