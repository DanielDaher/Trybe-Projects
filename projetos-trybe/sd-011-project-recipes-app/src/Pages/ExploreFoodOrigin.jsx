import React, { Component } from 'react';
import FilterAreaExplore from '../Components/FilterAreaExplore';
import FooterMenu from '../Components/FooterMenu';
import Header from '../Components/HeaderFood';

export default class ExploreFoodOrigin extends Component {
  render() {
    return (
      <div className="explore-container">
        <Header title="Explorar Origem" />
        <FilterAreaExplore />
        <FooterMenu />
      </div>
    );
  }
}
