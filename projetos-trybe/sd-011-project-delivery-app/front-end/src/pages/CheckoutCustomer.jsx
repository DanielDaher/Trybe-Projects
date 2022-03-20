import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router';
import axios from 'axios';

import NavBar from '../Components/NavBar';
import CustomerContext from '../Context/CustomerContext';

import '../styles/CheckoutCustomer.css';

const prefix = 'customer_checkout__';

const CheckoutCustomer = () => {
  const {
    changeProductQuantity,
    products,
  } = useContext(CustomerContext);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sellers, setSellers] = useState([]);
  const [saleData, setSaleData] = useState({});
  const [detailsIndex, setDetailsIndex] = useState();

  const { token } = JSON.parse(localStorage.getItem('user'));

  const fildsFiled = 3;

  // CRIA UMA LISTA COM OS PRODUTOS SELECIONADOS
  useEffect(() => {
    const listOfProducts = products.filter((product) => product.quantity > 0);
    setSelectedProducts(listOfProducts);
  }, [products, changeProductQuantity]);

  // CALCULA O PREÇO TOTAL
  useEffect(() => {
    const total = selectedProducts.reduce((acc, product) => (
      acc + (product.price * product.quantity)
    ), 0);
    setTotalPrice(total);
  }, [selectedProducts]);

  // BUSCA DADOS DE VENDEDORES
  useEffect(() => {
    const getSellers = async () => {
      const allSellers = await axios.get('http://localhost:3001/sellers');
      setSellers(allSellers.data.sellers);
    };

    getSellers();
  }, []);

  // REMOVE UM ITEM DA LISTA
  const handleRemoveAction = ({ target }) => {
    const productId = target.parentElement.parentElement
      .getAttribute('class').replace(/[^0-9]/g, '');

    changeProductQuantity(Number(productId), 0, products);
  };

  // SALVA ID DO VENDEDOR SELECIONADO NO ESTADO
  const handleSelectionChange = ({ target }) => {
    const sellerId = target.value;
    setSaleData({ ...saleData, seller_id: sellerId });
  };

  // FAZ INSERT NA TABELA "SALES"
  const createSaleAPI = async (data) => {
    const sale = await axios.post(
      'http://localhost:3001/order',
      data,
      { headers: {
        Authorization: token,
      } },
    );

    return sale;
  };

  // FAZ INSERT NA TABELA "SALES_PRODUCTS"
  const createSalaProductAPI = async (saleId, saleProducts) => {
    await axios.post(
      'http://localhost:3001/sale',
      { saleId, saleProducts },
      { headers: {
        Authorization: token,
      } },
    );
  };

  // FAZ O POST DA VENDA
  const handleSubmit = async () => {
    const productsData = selectedProducts.map((product) => (
      { productId: product.id, quantity: product.quantity }
    ));

    const data = {
      ...saleData,
      total_price: totalPrice,
      user_id: 3,
      status: 'Pendente',
    };

    const newOrder = await createSaleAPI(data);
    const saleId = newOrder.data.id;

    await createSalaProductAPI(saleId, productsData);

    console.log('Chegou aqui');
    console.log(saleId);
    setDetailsIndex(saleId);
  };

  const renderSelection = () => (
    <select
      data-testid={ `${prefix}select-seller` }
      className="details-input"
      onChange={ handleSelectionChange }
    >
      <option>-</option>
      { sellers.map((seller) => (
        <option key={ seller.id } value={ seller.id }>
          { seller.name }
        </option>
      )) }
    </select>
  );

  const removeButton = () => (
    <button
      type="button"
      onClick={ handleRemoveAction }
    >
      Remover
    </button>
  );

  const createProductElement = (product, index) => (
    <tr className={ `product-${product.id}` }>
      <td
        data-testid={ `${prefix}element-order-table-item-number-${index}` }
      >
        {index + 1}
      </td>
      <td data-testid={ `${prefix}element-order-table-name-${index}` }>
        {product.name}
      </td>
      <td data-testid={ `${prefix}element-order-table-unit-price-${index}` }>
        {String(product.price).replace('.', ',')}
      </td>
      <td data-testid={ `${prefix}element-order-table-quantity-${index}` }>
        { product.quantity}
      </td>
      <td
        id="teste"
        data-testid={ `${prefix}element-order-table-sub-total-${index}` }
      >
        R$
        { String((product.price * product.quantity).toFixed(2)).replace('.', ',') }
      </td>
      <td data-testid={ `${prefix}element-order-table-remove-${index}` }>
        { removeButton() }
      </td>
    </tr>
  );

  return (
    <div>
      <NavBar />
      { detailsIndex ? <Navigate to={ `/customer/orders/${detailsIndex}` } /> : null }
      <section>
        <h2>Finalizar Pedido</h2>
        <table className="table products-table" border="1">
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Valor Unitário</th>
            <th>Quantidade</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
          { selectedProducts.map((product, index) => (
            createProductElement(product, index)
          )) }
          <tr>
            <td data-testid={ `${prefix}element-order-total-price` }>
              Total: R$
              { String(totalPrice.toFixed(2)).replace('.', ',') }
            </td>
          </tr>
        </table>
      </section>
      <section>
        <h2>Detalhes e Endereço para Entrega</h2>
        <form className="details-form">
          <label htmlFor="seller">
            P. Vendedora Responsável
            { renderSelection() }
          </label>
          <label htmlFor="address">
            Endereço
            <input
              type="text"
              placeholder="Travessa Terceira da Castanheira, Bairo Moruci"
              data-testid={ `${prefix}input-address` }
              className="details-input"
              onChange={ ({ target }) => (
                setSaleData({ ...saleData, delivery_address: target.value })
              ) }
            />
          </label>
          <label htmlFor="number">
            Número
            <input
              type="number"
              placeholder="198"
              data-testid={ `${prefix}input-addressNumber` }
              className="details-input"
              onChange={ ({ target }) => (
                setSaleData({ ...saleData, delivery_number: target.value })
              ) }
            />
          </label>
          <button
            type="button"
            data-testid={ `${prefix}button-submit-order` }
            className="send-button"
            onClick={ handleSubmit }
            disabled={ Object.keys(saleData).length !== fildsFiled }
          >
            FINALIZAR PEDIDO
          </button>
        </form>
      </section>
    </div>
  );
};

export default CheckoutCustomer;
