import React, { Component } from 'react';
import FooterMenu from '../Components/FooterMenu';
import Header from '../Components/HeaderFood';

export default class ExploreDrinkOrigin extends Component {
  render() {
    return (
      <div>
        <Header title="Explorar Origem" />
        <p className="explore-container">Not Found</p>
        <FooterMenu />
      </div>
    );
  }
}
