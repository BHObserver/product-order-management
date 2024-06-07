/* eslint-disable jsx-a11y/control-has-associated-label */
// src/components/ProductList.js
import React from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductList = ({ products, onEdit, onDelete }) => (
  <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Product</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Brand</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Created At</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{product.id}</td>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.brand}</td>
              <td className="py-2 px-4 border-b">{product.type}</td>
              <td className="py-2 px-4 border-b">{product.createdAt}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 mx-2"
                  onClick={() => onEdit(product.id)}
                >
                  <FaEdit />
                </button>
                <button
                  type="button"
                  className="text-red-600 hover:text-red-800 mx-2"
                  onClick={() => onDelete(product.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button type="button" className="mx-2 px-4 py-2 bg-blue-500 text-white rounded">1</button>
        <button type="button" className="mx-2 px-4 py-2 bg-blue-500 text-white rounded">2</button>
        <button type="button" className="mx-2 px-4 py-2 bg-blue-500 text-white rounded">3</button>
        <button type="button" className="mx-2 px-4 py-2 bg-blue-500 text-white rounded">4</button>
      </div>
    </div>
  </div>
);

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  })).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductList;
