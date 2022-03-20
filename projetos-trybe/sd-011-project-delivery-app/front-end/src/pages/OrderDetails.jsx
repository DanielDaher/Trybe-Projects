import React from 'react';
import NavBar from '../Components/NavBar';
import OrderDetailsCard from '../Components/OrderDetailsCard';

const OrderDetails = () => {
  const test = 'test';
  console.log(test);
  return (
    <>
      <NavBar />
      <OrderDetailsCard />
    </>
  );
};

export default OrderDetails;
