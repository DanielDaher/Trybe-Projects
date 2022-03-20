import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import rockGlass from '../images/rockGlass.svg';
import '../styles/Login.css';

const isLogged = (redirect) => {
  const storageUser = localStorage.getItem('user');

  if (!storageUser) return;
  if (JSON.parse(storageUser).role === 'customer') return redirect('/customer/products');
  if (JSON.parse(storageUser).role === 'seller') return redirect('/seller/orders');
  if (JSON.parse(storageUser).role === 'admin') return redirect('/admin/manage');
};

const setUserType = (redirect, role) => {
  if (role === 'seller') {
    redirect('/seller/orders');
  } else if (role === 'customer') {
    redirect('/customer/products');
  } else {
    redirect('/admin/manage');
  }
};

const Login = () => {
  const redirect = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, enableButton] = useState(true);
  // const [logged, setLogged] = useState(false);
  // const [custumerLogged, setCustumerLogged] = useState(false);
  // const [sellerLogged, setSellerLogged] = useState(false);
  // const [adminLogged, setAdminLogged] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [errorVisibility, setErrorVisibility] = useState('hidden');

  useEffect(() => {
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]{3}/i;
    const minLength = 6;
    if (password.length >= minLength && regex.test(login)) {
      enableButton(false);
    } else {
      enableButton(true);
    }
  }, [login, password]);

  useEffect(() => {
    isLogged(redirect);
  }, []);

  const handleLogin = async () => {
    await axios({
      method: 'post',
      url: 'http://localhost:3001/login',
      data: { login, password },
    }).then((response) => {
      const userData = response.data;

      const userInfo = {
        id: userData.user.id,
        name: userData.user.name,
        email: userData.user.email,
        role: userData.user.role,
        token: userData.token,
      };

      localStorage.setItem('user', JSON.stringify(userInfo));

      setErrorVisibility('hidden');
      setUserType(redirect, userInfo.role);
    }).catch((error) => {
      console.log(error.message);
      if (error.message === 'Request failed with status code 404') {
        setErrorVisibility('visible');
        setErrorMessage('Usuário não cadastrado');
      } else if (error.message === 'Request failed with status code 401') {
        setErrorVisibility('visible');
        setErrorMessage('Senha incorreta');
      }
    });
  };

  // if (roleUser !== '') {
  //   switch (roleUser) {
  //   case 'custumer':
  //     return (<Navigate to="/customer/products" />);

  //   case 'seller':
  //     return (<Navigate to="/customer/products" />);

  //   case 'admnistrator':
  //     return (<Navigate to="/admin" />);

  //   default:
  //     break;
  //   }
  // }

  return (
    <div className="login-page">
      {/* { custumerLogged ? <Navigate to="/customer/products" /> : null }
      { sellerLogged ? <Navigate to="/seller/orders" /> : null }
      { adminLogged ? <Navigate to="/admin/manage" /> : null } */}
      <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
        Glass
      </object>
      <h1 className="logo">José Delivery</h1>
      <form className="login-form">
        <label htmlFor="login" className="label">
          <p className="label-text">Login</p>
          <input
            type="email"
            className="login"
            data-testid="common_login__input-email"
            placeholder="email@tryber.com.br"
            onChange={ (e) => setLogin(e.target.value) }
          />
        </label>
        <label htmlFor="senha" className="label">
          <p className="label-text">Senha</p>
          <input
            type="password"
            className="senha"
            data-testid="common_login__input-password"
            placeholder="**********"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          type="button"
          className="login-btn btn"
          data-testid="common_login__button-login"
          disabled={ buttonDisabled }
          onClick={ handleLogin }
        >
          LOGIN
        </button>
        <Link to="/register">
          <button
            type="button"
            className="register-btn btn"
            data-testid="common_login__button-register"
          >
            Ainda não tenho conta
          </button>
        </Link>
      </form>
      <p
        className="error-msg"
        data-testid="common_login__element-invalid-email"
        style={ { visibility: errorVisibility } }
      >
        { errorMessage }
      </p>
    </div>
  );
};

export default Login;
