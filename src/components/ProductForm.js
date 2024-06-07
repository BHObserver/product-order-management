// ProductForm.js

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const generateRandomId = () => Math.floor(1000 + Math.random() * 9000);

const ProductForm = ({ product, onSubmit }) => {
  const [name, setName] = useState(product?.name || '');
  const [brand, setBrand] = useState(product?.brand || '');
  const [type, setType] = useState(product?.type || '');
  const [origin, setOrigin] = useState(product?.origin || '');
  const [variants, setVariants] = useState(product?.variants || [
    {
      id: generateRandomId(), color: '', specification: '', size: '',
    }]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setBrand(product.brand);
      setType(product.type);
      setOrigin(product.origin);
      setVariants(product.variants);
    }
  }, [product]);

  const handleVariantChange = (id, field, value) => {
    const newVariants = variants.map((variant) => {
      if (variant.id === id) {
        return { ...variant, [field]: value };
      }
      return variant;
    });
    setVariants(newVariants);
  };

  const handleAddVariant = () => {
    setVariants([...variants, {
      id: generateRandomId(), color: '', specification: '', size: '',
    }]);
  };

  const handleRemoveVariant = (id) => {
    setVariants(variants.filter((variant) => variant.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name, brand, type, origin, variants,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

      <label htmlFor="brand">Brand:</label>
      <input type="text" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />

      <label htmlFor="type">Type:</label>
      <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} required />

      <label htmlFor="origin">Origin:</label>
      <input type="text" id="origin" value={origin} onChange={(e) => setOrigin(e.target.value)} required />

      <h4>Variants</h4>
      {variants.map((variant) => (
        <div key={variant.id}>
          <label htmlFor={`color-${variant.id}`}>Color:</label>
          <input
            type="text"
            id={`color-${variant.id}`}
            value={variant.color}
            onChange={(e) => handleVariantChange(variant.id, 'color', e.target.value)}
            required
          />

          <label htmlFor={`specification-${variant.id}`}>Specification:</label>
          <input
            type="text"
            id={`specification-${variant.id}`}
            value={variant.specification}
            onChange={(e) => handleVariantChange(variant.id, 'specification', e.target.value)}
            required
          />

          <label htmlFor={`size-${variant.id}`}>Size:</label>
          <input
            type="text"
            id={`size-${variant.id}`}
            value={variant.size}
            onChange={(e) => handleVariantChange(variant.id, 'size', e.target.value)}
            required
          />

          {variants.length > 1 && (
            <button type="button" onClick={() => handleRemoveVariant(variant.id)}>Remove</button>
          )}
        </div>
      ))}
      <button type="button" onClick={handleAddVariant}>Add Variant</button>
      <button type="submit">Submit</button>
    </form>
  );
};

ProductForm.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    brand: PropTypes.string,
    type: PropTypes.string,
    origin: PropTypes.string,
    variants: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      color: PropTypes.string,
      specification: PropTypes.string,
      size: PropTypes.string,
    })),
  }),
  onSubmit: PropTypes.func.isRequired,
};

ProductForm.defaultProps = {
  product: null,
};

export default ProductForm;
