/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Route, Routes } from 'react-router-dom';
import {
  fetchProducts,
  addProduct,
  modifyProduct,
  removeProduct,
} from '../slices/productsSlice';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const productsPerPage = 8;
  const totalPages = Math.ceil(Object.values(products).length / productsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const handleCreateOrUpdateProduct = (product) => {
    if (product.id) {
      dispatch(modifyProduct({ id: product.id, product }));
    } else {
      dispatch(addProduct(product));
    }
    navigate('/products');
  };

  const handleDeleteProduct = (id) => {
    dispatch(removeProduct(id));
  };

  const handleEditProduct = (product) => {
    navigate(`/products/edit/${product.id}`);
  };

  const productArray = Object.values(products).slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  return (
    <Routes>
      <Route
        path="new/product"
        element={<ProductForm onSubmit={handleCreateOrUpdateProduct} />}
      />
      <Route
        path="edit/:id"
        element={<ProductForm onSubmit={handleCreateOrUpdateProduct} />}
      />
      <Route
        path="/"
        element={(
          <ProductList
            products={productArray}
            loading={loading}
            error={error}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      />
    </Routes>
  );
};

export default ProductsPage;
