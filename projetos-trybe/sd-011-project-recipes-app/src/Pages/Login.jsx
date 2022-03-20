import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import trybe from '../images/TRYBE.gif';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      email: '',
    };
    this.validaLogin = this.validaLogin.bind(this);
    this.saveEmail = this.saveEmail.bind(this);
    this.sendEmailAndPasswordToLocalStorage = this
      .sendEmailAndPasswordToLocalStorage.bind(this);
  }

  saveEmail({ target: { value } }) {
    this.setState({ email: value });
  }

  redirect() {
    const { history } = this.props;
    history.push('/comidas');
  }

  validaLogin({ target: { value } }) {
    const lengthPassword = 6;
    const validaEmail = /\S+@\S+\.\S+/;
    const { email } = this.state;
    if (value.length > lengthPassword && validaEmail.test(email)) {
      this.setState({ login: true });
    }
  }

  sendEmailAndPasswordToLocalStorage(event) {
    event.preventDefault();
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const { email } = this.state;
    const user = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(user));
    this.redirect();
  }

  render() {
    const { login } = this.state;
    return (
      <Form
        className="text-center center"
        onSubmit={ this.sendEmailAndPasswordToLocalStorage }
      >
        <img src={ trybe } alt="trybe-logo" style={ { height: '300px' } } />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label htmlFor="email">
            E-mail
            <Form.Control
              type="text"
              id="email"
              data-testid="email-input"
              onChange={ (event) => this.saveEmail(event) }
            />
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label htmlFor="password">
            Password
            <Form.Control
              type="password"
              id="password"
              data-testid="password-input"
              onChange={ (event) => this.validaLogin(event) }
            />
          </Form.Label>
        </Form.Group>
        <Button
          disabled={ !login }
          type="submit"
          data-testid="login-submit-btn"
        >
          Submit
        </Button>
      </Form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
