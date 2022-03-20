import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import NavBar from '../Components/NavBar';

// import rockGlass from '../images/rockGlass.svg';
import '../styles/Login.css';

const SellerDetails = () => {
  const [productList, setProductList] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [sale, setSale] = useState();
  const { id } = useParams();
  const suffix = 'seller_order_details__';

  const getSaleProductsFromAPI = async () => {
    await axios({
      method: 'get',
      url: `http://localhost:3001/saleDetails/${id}`,
    }).then((response) => {
      setProductList(response.data);
    });
  };

  const getSaleFromAPI = async () => {
    await axios({
      method: 'get',
      url: `http://localhost:3001/sale/${id}`,
    }).then((response) => {
      setSale(response.data);
      console.log('Sale details: ', sale);
    });
  };

  const getAllProducts = async () => {
    await axios({
      method: 'get',
      url: 'http://localhost:3001/products',
    }).then((response) => {
      setAllProducts(response.data.products);
      console.log('Product list: ', allProducts);
    });
  };

  const changeSaleStatus = async (saleId, newStatus) => {
    await axios({
      method: 'put',
      url: 'http://localhost:3001/sale/update',
      data: { saleId, newStatus },
    }).then((response) => {
      setSale(response.data);
    });
  };

  useEffect(() => {
    getSaleProductsFromAPI();
    getSaleFromAPI();
    getAllProducts();
  }, []);

  const getProductName = (productId) => {
    const data = allProducts.find((p) => p.id === productId);
    return data.name;
  };

  const getProductPrice = (productId) => {
    const data = allProducts.find((p) => p.id === productId);
    return data.price;
  };

  const createProductElement = (product, index) => (
    <tr className={ `product-${product.id}` }>
      <td
        data-testid={ `seller_order_details__element-order-table-item-number-${index}` }
      >
        {index + 1}
      </td>
      <td data-testid={ `seller_order_details__element-order-table-name-${index}` }>
        { getProductName(product.productId) }
      </td>
      <td data-testid={ `seller_order_details__element-order-table-quantity-${index}` }>
        { product.quantity}
      </td>
      <td data-testid={ `seller_order_details__element-order-table-unit-price-${index}` }>
        { getProductPrice(product.productId) }
      </td>
      <td
        id="teste"
        data-testid={ `seller_order_details__element-order-table-sub-total-${index}` }
      >
        R$
        { String((getProductPrice(product.productId) * product.quantity)
          .toFixed(2)).replace('.', ',') }
      </td>
    </tr>
  );

  const renderSaleData = () => (
    <div>
      <span
        data-testid={ `${suffix}element-order-details-label-order-id` }
      >
        Pedido:
        {sale.id}
      </span>
      <span
        data-testid={ `${suffix}element-order-details-label-order-date` }
      >
        {moment(sale.saleDate).format('DD/MM/YYYY')}
      </span>
      <span
        data-testid={ `${suffix}element-order-details-label-delivery-status` }
      >
        {sale.status}
      </span>
      <button
        data-testid={ `${suffix}button-preparing-check` }
        type="button"
        onClick={ () => changeSaleStatus(id, 'Preparando') }
        disabled={ sale.status !== 'Pendente' }
      >
        Prepara pedido
      </button>
      <button
        data-testid={ `${suffix}button-dispatch-check` }
        disabled={ sale.status !== 'Preparando' }
        type="button"
        onClick={ () => changeSaleStatus(id, 'Em Trânsito') }
      >
        Saiu para entrega
      </button>
      <span
        data-testid={ `${suffix}element-order-total-price` }
      >
        {sale.totalPrice.toString().replace('.', ',')}
      </span>
    </div>
  );

  return (
    <div>
      <NavBar />
      <div style={ { marginTop: '100px' } }>
        { sale ? renderSaleData() : null }
        <table border="1">
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
          { allProducts.length > 0 ? productList.map((product, index) => (
            createProductElement(product, index)
          )) : null }
        </table>
      </div>
    </div>
  );
};

export default SellerDetails;
