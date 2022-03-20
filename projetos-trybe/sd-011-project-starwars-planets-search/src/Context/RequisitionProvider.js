import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RequisitionContext from './RequisitionContext';

export default function RequisitionProvider({ children }) {
  const [contextState, setContextState] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [filterOn, setFilterOn] = useState(false);

  const [tableData, setTableData] = useState([]);

  const [filterByNumericValues, setFilterByNumericValues] = useState([{
    column: '',
    comparison: '',
    value: '',
  }]);

  useEffect(() => {
    const planets = async () => {
      const getSWInfo = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await getSWInfo.json();
      setContextState(results);
      setTableData(results);
    };
    planets();
  }, []);

  const contextValue = {
    data: contextState,
    tableData,
    setTableData,
    filterOn,
    setFilterOn,
    filters: {
      filterByName: {
        name: filterName,
        setFilterName,
      },
      filterByNumericValues,
      setFilterByNumericValues,
    },
  };

  return (
    <RequisitionContext.Provider value={ contextValue }>
      {children}
    </RequisitionContext.Provider>
  );
}

RequisitionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
