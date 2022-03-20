import React from 'react';
import NavBar from '../Components/NavBar';
import CustomerOrdersCards from '../Components/CustomerOrdersCards';
import CustomerProvider from '../Context/CustomerProvider';

const customerOrders = () => (
  // const [isLoading, setIsLoading] = useState(true);

  // if (isLoading) return <p>Carregando...</p>;
  <div>
    <CustomerProvider>
      <NavBar />
      <CustomerOrdersCards />
    </CustomerProvider>
  </div>
);

export default customerOrders;
