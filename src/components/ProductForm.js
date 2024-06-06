// src/components/ProductForm.js
import React, { useState } from 'react';

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
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Brand:
        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
      </label>
      <label>
        Type:
        <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ProductForm;
