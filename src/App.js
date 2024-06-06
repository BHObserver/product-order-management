import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';

function App() {
  return (
    <Router>
      <Route path="/products" component={ProductsPage} />
      <Route path="/orders" component={OrdersPage} />
      <Route path="/" exact component={ProductsPage} />
    </Router>
  );
}

export default App;
