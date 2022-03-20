import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGameAction } from '../actions';

class Forms extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.savePlayerToLocalStorage = this.savePlayerToLocalStorage.bind(this);
    this.redirectUser = this.redirectUser.bind(this);
  }

  handleChange({ target }) {
    const { id, value } = target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [id]: value });
  }

  generateURL() {
    const { settings: { category, level, nQuestions, type } } = this.props;
    let url = `https://opentdb.com/api.php?amount=${nQuestions}`;
    if (level) {
      url = `${url}&difficulty=${level}`;
    }
    if (category) {
      url = `${url}&category=${category}`;
    }
    if (type) {
      url = `${url}&type=${type}`;
    }
    return url;
  }

  savePlayerToLocalStorage() {
    const { fetchGame } = this.props;
    const { name, email } = this.state;
    const obj = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };

    localStorage.setItem('state', JSON.stringify(obj));
    this.redirectUser();
    fetchGame(this.generateURL());
  }

  redirectUser() {
    const { history } = this.props;
    history.push('/game');
  }

  render() {
    const { name, email } = this.state;
    return (
      <form className="trivia__forms">
        <label htmlFor="name">
          <input
            placeholder="name"
            data-testid="input-player-name"
            value={ name }
            id="name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          <input
            placeholder="gravatar-email"
            data-testid="input-gravatar-email"
            value={ email }
            id="email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          disabled={ !(name && email) }
          type="button"
          data-testid="btn-play"
          onClick={ () => this.savePlayerToLocalStorage() }
        >
          Play
        </button>
        <button type="button">
          <Link className="link" to="/settings" data-testid="btn-settings">
            Settings
          </Link>
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.gameReducer.settings,
});

const mapDispatchToProps = (dispatch) => ({
  fetchGame: (url) => dispatch(fetchGameAction(url)),
});

Forms.propTypes = {
  fetchGame: PropTypes.string,
}.isRequired;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Forms));
