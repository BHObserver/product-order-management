/* eslint-disable import/no-extraneous-dependencies */
// src/pages/ProductsPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts, addProduct, modifyProduct, removeProduct,
} from '../slices/productsSlice';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCreateOrUpdateProduct = (product) => {
    if (product.id) {
      dispatch(modifyProduct({ id: product.id, product }));
    } else {
      dispatch(addProduct(product));
    }
  };

  const handleDeleteProduct = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <div>
      <h1>Products</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ProductForm onSubmit={handleCreateOrUpdateProduct} />
      <ProductList products={products} onDelete={handleDeleteProduct} />
    </div>
  );
};

export default ProductsPage;
