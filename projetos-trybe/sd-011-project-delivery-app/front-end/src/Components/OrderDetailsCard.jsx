import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const OrderDetailsCard = () => {
  const { id: OrderId } = useParams();
  const [sale, setSale] = useState();
  const suffix = 'customer_order_details__';

  const getOrderInfo = async () => {
    const { data } = await axios({
      method: 'get',
      url: `http://localhost:3001/saleSeller/${OrderId}`,
    });
    setSale(data);
  };

  useEffect(() => {
    getOrderInfo();
  }, []);

  const changeSaleStatus = async (saleId, newStatus) => {
    const { data } = await axios({
      method: 'put',
      url: 'http://localhost:3001/sale/update',
      data: { saleId, newStatus },
    });

    getOrderInfo();
    console.log(data);
  };

  const getProductQuantity = (productId) => {
    const { quantity } = sale.productList.find((p) => p.productId === productId);
    return quantity;
  };

  const ordersList = ({ id, name, price }, index) => (
    <tr className={ `product-${id}` }>
      <td
        data-testid={ `${suffix}element-order-table-item-number-${index}` }
      >
        {index + 1}
      </td>
      <td data-testid={ `${suffix}element-order-table-name-${index}` }>
        { name }
      </td>
      <td data-testid={ `${suffix}element-order-table-quantity-${index}` }>
        { getProductQuantity(id)}
      </td>
      <td data-testid={ `${suffix}element-order-table-unit-price-${index}` }>
        { Number(price).toFixed(2).replace('.', ',') }
      </td>
      <td
        id="teste"
        data-testid={ `${suffix}element-order-table-sub-total-${index}` }
      >
        R$
        { String((Number(price) * getProductQuantity(id)).toFixed(2)).replace('.', ',') }
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
        data-testid={ `${suffix}element-order-details-label-seller-name` }
      >
        { sale.seller }
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
        data-testid={ `${suffix}button-delivery-check` }
        disabled={ sale.status !== 'Em Trânsito' }
        type="button"
        onClick={ () => changeSaleStatus(sale.id, 'Entregue') }
      >
        Marcar como entregue
      </button>
      <span
        data-testid={ `${suffix}element-order-total-price` }
      >
        {sale.totalPrice.replace('.', ',')}
      </span>
    </div>
  );

  return (
    <div>
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
          { sale ? sale.products.map((product, index) => (
            ordersList(product, index)
          )) : null }
        </table>
      </div>
    </div>
  );
};

export default OrderDetailsCard;
