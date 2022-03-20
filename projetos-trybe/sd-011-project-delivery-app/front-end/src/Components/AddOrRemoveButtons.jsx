import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import CustomerContext from '../Context/CustomerContext';

const AddOrRemoveButtons = ({ id }) => {
  const { changeProductQuantity, products } = useContext(CustomerContext);
  const changeQuantity = useRef(changeProductQuantity);
  const thisID = useRef(id);

  const thisProduct = products.find((product) => product.id === id);
  const [orderQuantity, setOrderQuantity] = useState(thisProduct.quantity);

  useEffect(() => {
    console.log('useEffect AddButton');

    if (orderQuantity < 0) {
      return setOrderQuantity(0);
    }

    if (thisProduct.quantity !== orderQuantity) {
      changeQuantity.current(thisID.current, orderQuantity, products);
    }
  }, [orderQuantity, products, thisProduct]);

  return (
    <div className="quantity-inputs">
      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        onClick={ () => setOrderQuantity(orderQuantity - 1) }
      >
        -
      </button>
      <input
        type="number"
        value={ orderQuantity }
        onChange={ (e) => setOrderQuantity(Number(e.target.value)) }
        data-testid={ `customer_products__input-card-quantity-${id}` }
      />
      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${id}` }
        onClick={ () => setOrderQuantity(orderQuantity + 1) }
      >
        +
      </button>
    </div>
  );
};

AddOrRemoveButtons.propTypes = {
  id: PropTypes.number.isRequired,
};

export default AddOrRemoveButtons;
