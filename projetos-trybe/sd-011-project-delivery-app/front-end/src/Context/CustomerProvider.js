import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import CustomerContext from './CustomerContext';

const CustomerProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('Provider useEffect');
    const getProductsFromAPI = async () => {
      const { data } = await axios({
        method: 'get',
        url: 'http://localhost:3001/products',
      });

      const productsFromAPiWithQuantityAttribute = data.products.map((product) => (
        { ...product, quantity: 0 }
      ));

      setProducts(productsFromAPiWithQuantityAttribute);
    };

    getProductsFromAPI(); // para isso funcionar, é preciso que o backend e mySQL estejam ligados
  }, []);

  const sortProductsByID = (theProducts) => theProducts.sort((a, b) => a.id - b.id);

  const changeProductQuantity = (id, quantity, updatedProducts) => {
    const thisProduct = products.find((product) => product.id === id);

    const otherProducts = updatedProducts.filter((product) => product.id !== id);

    const productsOrderedByID = sortProductsByID([
      ...otherProducts,
      { ...thisProduct, quantity },
    ]);

    return setProducts(productsOrderedByID);
  };

  const roteAdminAndSeller = async (data) => {
    const result = await axios({
      method: 'post',
      url: 'http://localhost:3001/admin',
      data,
    });
    console.log(result);
  };

  const contextValue = {
    products,
    changeProductQuantity,
    roteAdminAndSeller,
  };

  return (
    <CustomerContext.Provider value={ contextValue }>
      { children }
    </CustomerContext.Provider>
  );
};

CustomerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomerProvider;
