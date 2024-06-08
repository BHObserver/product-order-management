/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Route, Routes } from 'react-router-dom';
import {
  fetchProducts, addProduct, modifyProduct, removeProduct,
} from '../slices/productsSlice';
import ProductListWithButton from '../components/ProductListWithButton';
import ProductForm from '../components/ProductForm';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    navigate('/products'); // Redirect to products list after submission
  };

  const handleDeleteProduct = (id) => {
    dispatch(removeProduct(id));
  };

  const handleEditProduct = (product) => {
    navigate(`/products/edit/${product.id}`);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={(
          <ProductListWithButton
            products={products}
            loading={loading}
            error={error}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        )}
      />
      <Route
        path="new"
        element={<ProductForm onSubmit={handleCreateOrUpdateProduct} />}
      />
      <Route
        path="edit/:id"
        element={<ProductForm onSubmit={handleCreateOrUpdateProduct} />}
      />
    </Routes>
  );
};

export default ProductsPage;
