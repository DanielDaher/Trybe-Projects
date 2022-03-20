import React, { useContext } from 'react';
import AddOrRemoveButtons from './AddOrRemoveButtons';
import CustomerContext from '../Context/CustomerContext';
import '../styles/CustomerProductsCards.css';

const CustomerProductsCards = () => {
  const { products } = useContext(CustomerContext);
  return (
    <div className="cards-container">
      {products.map(({ id, name, price, url_image: urlImage }) => (
        <div key={ id } className="card">
          <h3
            data-testid={ `customer_products__element-card-title-${id}` }
          >
            {name}
          </h3>
          <p>
            R$
            <span data-testid={ `customer_products__element-card-price-${id}` }>
              {price.toString().replace('.', ',')}
            </span>
          </p>
          <img
            alt=""
            src={ urlImage }
            data-testid={ `customer_products__img-card-bg-image-${id}` }
          />
          <AddOrRemoveButtons id={ id } />
        </div>
      ))}
    </div>
  );
};

export default CustomerProductsCards;
