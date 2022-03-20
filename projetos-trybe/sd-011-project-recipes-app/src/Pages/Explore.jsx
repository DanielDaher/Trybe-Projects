import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../Components/FooterMenu';
import HeaderWithoutSearch from '../Components/HeaderWithoutSearch';

export default class Explore extends Component {
  render() {
    return (
      <div className="explore-container">
        <HeaderWithoutSearch title="Explorar" />
        <Link data-testid="explore-food" to="/explorar/comidas">Explorar Comidas</Link>
        <Link data-testid="explore-drinks" to="/explorar/bebidas">Explorar Bebidas</Link>
        <FooterMenu />
      </div>
    );
  }
}
