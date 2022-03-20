import React, { useContext, useState } from 'react';
import RequisitionContext from '../Context/RequisitionContext';

export default function NumericFilter() {
  const [formState, setFormState] = useState({
    column: '',
    comparison: '',
    value: '',
  });

  const {
    setFilterOn, filters:
    { filterByNumericValues,
      setFilterByNumericValues } } = useContext(RequisitionContext);

  const columnOptions = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  function makeOptions() {
    if (filterByNumericValues[0].column !== '') {
      const newColumnOptions = columnOptions
        .filter((opt) => opt !== filterByNumericValues[0].column);
      return newColumnOptions
        .map((opt, index) => <option value={ opt } key={ index }>{opt}</option>);
    }
    return columnOptions
      .map((opt, index) => <option value={ opt } key={ index }>{opt}</option>);
  }

  const formHandleChange = (event) => {
    const { target: { id, value: selectValue } } = event;
    setFormState({
      ...formState,
      [id]: selectValue,
    });
  };

  const dispatchFilter = (event) => {
    event.preventDefault();
    setFilterByNumericValues([formState]);
    setFilterOn(true);
  };

  return (
    <form onSubmit={ (e) => dispatchFilter(e) }>
      <select
        data-testid="column-filter"
        id="column"
        onChange={ (e) => formHandleChange(e) }
      >
        {makeOptions()}
      </select>
      <select
        data-testid="comparison-filter"
        id="comparison"
        onChange={ (e) => formHandleChange(e) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        placeholder="insira o valor"
        data-testid="value-filter"
        id="value"
        onChange={ (e) => formHandleChange(e) }
      />
      <button type="submit" data-testid="button-filter">Filtrar</button>
    </form>
  );
}
