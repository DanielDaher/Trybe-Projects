import React, { useContext } from 'react';
import RequisitionContext from '../Context/RequisitionContext';

export default function Table() {
  const { data, filterOn, setFilterOn, tableData, setTableData,
    filters:
      { filterByName:
        { name: planetName }, filterByNumericValues } } = useContext(RequisitionContext);

  const { column, comparison, value } = filterByNumericValues[0];

  let filteredData = [[]];

  let tablePlanets = tableData;

  if (data.length > 0) {
    filteredData = data.map(
      (planet) => Object.entries(planet).filter((keyName) => keyName[0] !== 'residents'),
    );
  }

  if (filterOn) {
    switch (comparison) {
    case ('maior que'):
      setTableData(
        data.filter((planet) => parseInt(planet[column], 10) > parseInt(value, 10)),
      );
      break;
    case ('menor que'):
      setTableData(
        data.filter((planet) => parseInt(planet[column], 10) < parseInt(value, 10)),
      );
      break;
    case ('igual a'):
      setTableData(
        data.filter((planet) => parseInt(planet[column], 10) === parseInt(value, 10)),
      );
      break;
    default:
      break;
    }
    setFilterOn(false);
  }

  if (planetName !== '') {
    tablePlanets = tableData
      .filter((planet) => planet.name.toLowerCase().includes(planetName.toLowerCase()));
  }

  return (
    <table>
      <thead>
        <tr>
          {filteredData[0].map((planet, index) => <th key={ index }>{planet[0]}</th>)}
        </tr>
      </thead>
      <tbody>
        {tablePlanets.map(({
          name,
          rotation_period: rotation,
          orbital_period: orbit,
          diameter,
          climate,
          gravity,
          terrain,
          surface_water: surfaceWater,
          population,
          films,
          created,
          edited,
          url,
        }) => (
          <tr key={ name }>
            <td>{ name }</td>
            <td>{ rotation }</td>
            <td>{ orbit }</td>
            <td>{ diameter }</td>
            <td>{ climate }</td>
            <td>{ gravity }</td>
            <td>{ terrain }</td>
            <td>{ surfaceWater }</td>
            <td>{ population }</td>
            <td>{ films }</td>
            <td>{ created }</td>
            <td>{ edited }</td>
            <td>{ url }</td>
          </tr>
        ))}
      </tbody>
    </table>);
}
