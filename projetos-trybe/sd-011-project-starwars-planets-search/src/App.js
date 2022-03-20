import React from 'react';
import './App.css';
import FilterByName from './Components/FilterByName';
import NumericFilter from './Components/NumericFilter';
import Table from './Components/Table';
import RequisitionProvider from './Context/RequisitionProvider';

function App() {
  return (
    <RequisitionProvider>
      <div>
        <FilterByName />
        <NumericFilter />
        <Table />
      </div>
    </RequisitionProvider>
  );
}

export default App;
