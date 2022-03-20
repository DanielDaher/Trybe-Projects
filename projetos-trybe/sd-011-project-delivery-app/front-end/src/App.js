import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Admin from './pages/Admin';
import CheckoutCustomer from './pages/CheckoutCustomer';
import CustomerProducts from './pages/CustomerProducts';
import OrderDetails from './pages/OrderDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import SellerOrders from './pages/SellerOrders';
import SellerDetails from './pages/SellerDetails';
import CustomerProvider from './Context/CustomerProvider';
import CustomerOrders from './pages/CustomerOrders';

function App() {
  return (
    <div className="App">
      <CustomerProvider>
        <Routes>
          <Route path="/" element={ <Navigate to="/login" /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/admin/manage" element={ <Admin /> } />
          <Route path="/customer/products" element={ <CustomerProducts /> } />
          <Route path="/customer/checkout" element={ <CheckoutCustomer /> } />
          <Route exact path="/customer/orders/:id" element={ <OrderDetails /> } />
          <Route exact path="/seller/orders" element={ <SellerOrders /> } />
          <Route exact path="/seller/orders/:id" element={ <SellerDetails /> } />
          <Route exact path="/customer/orders" element={ <CustomerOrders /> } />
        </Routes>
      </CustomerProvider>
    </div>
  );
}
export default App;
