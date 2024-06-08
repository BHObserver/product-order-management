/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import Navbar from './components/Navbar';
import ProductForm from './components/ProductForm';
import SelectProductsPage from './pages/SelectProductsPage';
import SelectVariantsPage from './pages/SelectVariantsPage';
import InformationPage from './pages/InformationPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/edit/:id" element={<ProductForm />} />
          <Route path="/orders/create" element={<SelectProductsPage />} />
          <Route path="/orders/create/variants" element={<SelectVariantsPage />} />
          <Route path="/orders/create/info" element={<InformationPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
