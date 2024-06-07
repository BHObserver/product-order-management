// ProductsPage.js

import React, { useState, useEffect } from 'react';
import {
  getProducts, createProduct, updateProduct, deleteProduct,
} from '../services/api';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        console.log('Fetched products data:', response); // Log the fetched data to understand its structure
        setProducts(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCreate = () => {
    setSelectedProduct(null);
    setFormVisible(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleSubmit = async (product) => {
    try {
      if (selectedProduct) {
        const updatedProduct = await updateProduct(selectedProduct.id, product);
        setProducts(products.map((p) => (p.id === selectedProduct.id ? updatedProduct : p)));
      } else {
        const newProduct = await createProduct(product);
        setProducts([...products, newProduct]);
      }
      setFormVisible(false);
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleCreate}>Create Product</button>
      {isFormVisible && (
        <ProductForm product={selectedProduct} onSubmit={handleSubmit} />
      )}
      <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default ProductsPage;
