import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBarVendorADmin = () => {
  console.log('entrei');
  return (
    <nav className="navbarAdm">
      <Link
        to="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        <h3> Gerenciar Usuários </h3>
      </Link>
      <div className="user-btn">
        <h3
          data-testid="customer_products__element-navbar-user-full-name"
        >
          USER
        </h3>
        <Link
          to="/"
          onClick={ () => localStorage.removeItem('user') }
          data-testid="customer_products__element-navbar-link-logout"
        >
          <h3>Sair</h3>
        </Link>
      </div>
    </nav>
  );
};

export default NavBarVendorADmin;
