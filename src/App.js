import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import Navbar from './components/Navbar'; // Import Navbar

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<OrdersPage />} />
        <Route path="/products" element={<ProductsPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
