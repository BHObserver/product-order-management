// src/pages/ProductsPage.js
import React, { useState, useEffect } from 'react';
import {
  getProducts, createProduct, updateProduct, deleteProduct,
} from '../services/api';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await getProducts();
    setProducts(response.data);
  };

  const handleCreateOrUpdateProduct = async (product) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, product);
    } else {
      await createProduct(product);
    }
    fetchProducts();
    setEditingProduct(null);
  };

  const handleEditProduct = (id) => {
    const product = products.find((p) => p.id === id);
    setEditingProduct(product);
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div>
      <h1>Products</h1>
      <ProductForm onSubmit={handleCreateOrUpdateProduct} product={editingProduct} />
      <ProductList products={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
    </div>
  );
}

export default ProductsPage;
