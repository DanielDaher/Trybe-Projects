import React from 'react';
import CustomerProductsCards from '../Components/CustomerProductsCards';
import NavBar from '../Components/NavBar';
import CartButton from '../Components/CartButton';

const CustomerProducts = () => {
  if (!localStorage.getItem('user')) return (<p>Faça login ou crie um usuário!</p>);

  return (
    <div className="login-page">
      <NavBar />
      <CustomerProductsCards />
      <CartButton />
    </div>
  );
};

export default CustomerProducts;
