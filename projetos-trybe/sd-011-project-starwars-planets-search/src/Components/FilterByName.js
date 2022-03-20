import React, { useContext } from 'react';
import RequisitionContext from '../Context/RequisitionContext';

export default function FilterByName() {
  const { filters: { filterByName: { setFilterName } } } = useContext(RequisitionContext);

  return (
    <input
      placeholder="pesquise por nome"
      data-testid="name-filter"
      type="text"
      onChange={ (e) => setFilterName(e.target.value) }
    />
  );
}
