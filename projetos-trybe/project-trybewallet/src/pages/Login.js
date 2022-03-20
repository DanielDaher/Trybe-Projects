import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { addEmail } from '../actions';
import '../CSS/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      invalidAcess: true,
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkAcess = this.checkAcess.bind(this);
  }

  handleClick() {
    const { email } = this.state;
    const { save } = this.props;
    save(email);
    this.setState({
      redirect: true,
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => this.checkAcess());
  }

  checkAcess() {
    const { email, password } = this.state;
    const magicNumber = -1;
    const minLength = 5;
    if ((email.length > 0)
    && (password.length > minLength)
    && (email.search('@') !== magicNumber)
    && (email.lastIndexOf('@') !== email.length - 1)
    && (email.search('.') !== magicNumber)
    && (email.lastIndexOf('.') !== email.length - 1)) {
      this.setState({
        invalidAcess: false,
      });
    } else {
      this.setState({
        invalidAcess: true,
      });
    }
  }

  render() {
    const { invalidAcess, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/carteira" />;
    }
    return (
      <div className="Login-Page">
        <h1>The Wallet - Login</h1>
        <form className="login-form">
          <label htmlFor="email">
            <input
              type="text"
              name="email"
              className="input"
              placeholder="insira aqui o seu email"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              className="input"
              placeholder="insira aqui a sua senha"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            className="Login-Button"
            disabled={ invalidAcess }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  save: (email) => dispatch(addEmail(email)),
});

Login.propTypes = {
  save: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
