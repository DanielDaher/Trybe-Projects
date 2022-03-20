import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import CustomerContext from '../Context/CustomerContext';
import '../styles/CartButton.css';

const CartButton = () => {
  const { products } = useContext(CustomerContext);
  const [statusButton, setStatusButton] = useState(true);
  const [redirectToCheckout, setRedirectToCheckout] = useState(false);

  function myFunc(total, num) {
    return total + num;
  }

  const totalPrice = () => {
    const cartItems = products.filter(({ quantity }) => quantity > 0);
    if (cartItems.length > 0) {
      const prices = cartItems.map(({ price, quantity }) => Number(price * quantity));
      const fullPrice = prices.reduce(myFunc);
      if (statusButton) setStatusButton(false);
      return (
        <span data-testid="customer_products__checkout-bottom-value">
          {fullPrice.toFixed(2).toString().replace('.', ',')}
        </span>
      );
    }
    if (!statusButton) setStatusButton(true);
  };

  if (redirectToCheckout) return <Navigate to="/customer/checkout" />;

  return (
    <button
      type="button"
      disabled={ statusButton }
      onClick={ () => setRedirectToCheckout(true) }
      className="cart-button"
      data-testid="customer_products__button-cart"
    >
      <h3>
        Ver carrinho: R$
        {totalPrice()}
      </h3>
    </button>
  );
};

export default CartButton;
