import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const urlPath = () => {
  const userRole = JSON.parse(localStorage.getItem('user')).role;
  if (userRole === 'seller') {
    return '/seller/orders';
  }
  return '/customer/orders';
};

const NavBar = () => (
  <nav className="navbar">
    <Link
      to="/customer/products"
      className="navbar-links"
      data-testid="customer_products__element-navbar-link-products"
    >
      <h3>Produtos</h3>
    </Link>
    <Link
      to={ urlPath() }
      className="navbar-links"
      data-testid="customer_products__element-navbar-link-orders"
    >
      <h3>Meus Pedidos</h3>
    </Link>
    <h3
      className="userName"
      data-testid="customer_products__element-navbar-user-full-name"
    >
      {JSON.parse(localStorage.getItem('user')).name}
    </h3>
    <Link
      to="/"
      onClick={ () => localStorage.removeItem('user') }
      className="navbar-logout"
      data-testid="customer_products__element-navbar-link-logout"
    >
      <h3>Sair</h3>
    </Link>
  </nav>
);

export default NavBar;
