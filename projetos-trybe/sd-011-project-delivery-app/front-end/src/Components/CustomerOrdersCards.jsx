import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const CustomerOrdersCards = () => {
  const [userId] = useState(JSON.parse(localStorage.getItem('user')).id);
  const [salesList, setSalesList] = useState([]);

  const getSalesFromAPI = async () => {
    await axios({
      method: 'get',
      url: `http://localhost:3001/customerSales/${userId}`,
      // data: { userId },
    }).then((response) => {
      setSalesList(response.data);
    });
  };

  useEffect(() => {
    getSalesFromAPI();
  }, []);

  const dateConvert = (date) => moment(date).format('DD/MM/YYYY');

  const priceConvert = (price) => Number(price).toFixed(2).replace('.', ',');

  return (
    <div className="orders-conteiner">
      { salesList.map(({ id, saleDate, totalPrice, status }) => (
        <div style={ { border: '1px solid blue' } } key={ id }>
          <Link to={ `/customer/orders/${id}` }>
            <p data-testid={ `customer_orders__element-order-id-${id}` }>
              { `Pedido ${id}` }
            </p>
            <p data-testid={ `customer_orders__element-delivery-status-${id}` }>
              { status }
            </p>
            <p data-testid={ `customer_orders__element-order-date-${id}` }>
              { dateConvert(saleDate) }
            </p>
            <p data-testid={ `customer_orders__element-card-price-${id}` }>
              { `R$ ${priceConvert(totalPrice)}` }
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CustomerOrdersCards;
