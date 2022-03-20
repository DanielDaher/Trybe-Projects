import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import rockGlass from '../images/rockGlass.svg';
import '../styles/Login.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, enableButton] = useState(true);
  const [logged, setLogged] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [errorVisibility, setErrorVisibility] = useState('hidden');

  useEffect(() => {
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]{3}/;
    const minLength = 6;
    const nameLength = 12;
    if (password.length >= minLength && regex.test(email) && name.length >= nameLength) {
      enableButton(false);
    } else {
      enableButton(true);
    }
  }, [name, email, password]);

  const handleRegister = async () => {
    await axios({
      method: 'post',
      url: 'http://localhost:3001/register',
      data: { name, email, password },
    }).then((response) => {
      console.log(response);
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
      setErrorVisibility('hidden');
      setLogged(true);
    }).catch((error) => {
      console.log(error.message);
      if (error.message === 'Request failed with status code 409') {
        setErrorVisibility('visible');
        setErrorMessage('Usuário ja cadastrado');
      // } else if (error.message === 'Request failed with status code 401') {
      //   setErrorVisibility('visible');
      //   setErrorMessage('Senha incorreta');
      }
    });
  };

  return (
    <div className="login-page">
      { logged ? <Navigate to="/customer/products" /> : null }
      <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
        Glass
      </object>
      <h1 className="logo">José Delivery</h1>
      <form className="login-form">
        <label htmlFor="name" className="label">
          <p className="label-text">Nome</p>
          <input
            type="text"
            className="login"
            data-testid="common_register__input-name"
            placeholder="Digite seu nome"
            onChange={ (e) => setName(e.target.value) }
          />
        </label>
        <label htmlFor="email" className="label">
          <p className="label-text">Email</p>
          <input
            type="email"
            className="login"
            data-testid="common_register__input-email"
            placeholder="email@tryber.com.br"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="senha" className="label">
          <p className="label-text">Senha</p>
          <input
            type="password"
            className="senha"
            data-testid="common_register__input-password"
            placeholder="**********"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          type="button"
          className="login-btn btn"
          data-testid="common_register__button-register"
          disabled={ buttonDisabled }
          onClick={ handleRegister }
        >
          CADASTRAR
        </button>
      </form>
      <p
        className="error-msg"
        data-testid="common_register__element-invalid_register"
        style={ { visibility: errorVisibility } }
      >
        { errorMessage }
      </p>
    </div>
  );
};

export default Register;
