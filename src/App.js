/* eslint-disable import/no-extraneous-dependencies */
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<OrdersPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
