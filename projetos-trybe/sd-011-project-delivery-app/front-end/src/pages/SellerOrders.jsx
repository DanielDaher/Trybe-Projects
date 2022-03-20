import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Components/NavBar';
import '../styles/Login.css';

const SellerOrders = () => {
  const [userId] = useState(JSON.parse(localStorage.getItem('user')).id);
  const [salesList, setSalesList] = useState([]);

  const getSalesFromAPI = async () => {
    await axios({
      method: 'get',
      url: `http://localhost:3001/sales/${userId}`,
      // data: { userId },
    }).then((response) => {
      setSalesList(response.data);
    });
  };

  useEffect(() => {
    getSalesFromAPI();
  }, []);

  return (
    <div>
      <NavBar />
      <div style={ { marginTop: '100px' } }>
        {salesList.map((
          { id, status, deliveryAddress: delivery, saleDate: date, totalPrice: price },
          index,
        ) => (
          <Link to={ `/seller/orders/${id}` } key={ id }>
            <div
              style={ { border: '2px solid black' } }
            >
              <h3
                data-testid={ `seller_orders__element-order-id-${id}` }
              >
                <span>Pedido: </span>
                {index + 1}
              </h3>
              <h3
                data-testid={ `seller_orders__element-delivery-status-${id}` }
              >
                {status}
              </h3>
              <p>
                <span data-testid={ `seller_orders__element-order-date-${id}` }>
                  {date}
                </span>
                <span data-testid={ `seller_orders__element-card-price-${id}` }>
                  Total:
                  {price}
                </span>
                <span data-testid={ `seller_orders__element-card-address-${id}` }>
                  {delivery}
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SellerOrders;
