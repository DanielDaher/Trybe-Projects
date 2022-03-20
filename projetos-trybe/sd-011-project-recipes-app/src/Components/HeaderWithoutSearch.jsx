import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profilePicture from '../images/profileIcon.svg';

export default class HeaderWithoutSearch extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className="header-container">
        <Link to="/perfil" className="profilePicture">
          <img data-testid="profile-top-btn" src={ profilePicture } alt="profileIcon" />
        </Link>
        <h1 className="title-header" data-testid="page-title">{ title }</h1>
      </div>
    );
  }
}

HeaderWithoutSearch.propTypes = {
  title: PropTypes.string.isRequired,
};
