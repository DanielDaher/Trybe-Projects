import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../Components/FooterMenu';
import HeaderWithoutSearch from '../Components/HeaderWithoutSearch';

export default class Profile extends Component {
  render() {
    const emailUser = JSON.parse(localStorage.getItem('user'));
    let renderEmail;
    if (emailUser === null) {
      renderEmail = 'Realize o login na tela inicial!';
    } else {
      renderEmail = emailUser.email;
    }
    return (
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-picture">
            <HeaderWithoutSearch title="Perfil" />
          </div>
          <h2 data-testid="profile-email">{ renderEmail }</h2>
        </div>
        <div className="container-link">
          <Link
            to="/receitas-feitas"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </Link>
          <Link
            to="/receitas-favoritas"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </Link>
          <Link
            to="/"
            data-testid="profile-logout-btn"
            onClick={ () => localStorage.clear() }
          >
            Sair
          </Link>
        </div>
        <FooterMenu />
      </div>
    );
  }
}
