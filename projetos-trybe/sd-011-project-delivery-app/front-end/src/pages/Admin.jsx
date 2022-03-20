import React, { useEffect, useState } from 'react';
import axios from 'axios';

import NavBarVendorADmin from '../Components/NavBarVendorAdm';

import '../styles/FormAdm.css';

const Admin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [buttonDisabled, enableButton] = useState(true);
  const [errorVisibility, setErrorVisibility] = useState('hidden');
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]{3}/;
    const minLength = 6;
    const nameLength = 12;
    if (password.length >= minLength
      && regex.test(email)
      && name.length >= nameLength
      && role !== '') {
      enableButton(false);
    } else {
      enableButton(true);
    }
  }, [name, email, password, role]);

  const handleClick = async (e) => {
    e.preventDefault();
    await axios({
      method: 'post',
      url: 'http://localhost:3001/admin',
      data: { name, email, password, role },
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

  const formRegister = () => {
    console.log('entrei');
    return (
      <div className="main-content-form-adm">
        <form className="content-form">
          <label htmlFor="name" className="label">
            <p>Nome</p>
            <input
              type="text"
              data-testid="admin_manage__input-name"
              placeholder="Digite seu nome"
              onChange={ (e) => setName(e.target.value) }
            />
          </label>
          <label htmlFor="email" className="label">
            <p className="label-text">Email</p>
            <input
              type="email"
              data-testid="admin_manage__input-email"
              placeholder="email@tryber.com.br"
              onChange={ (e) => setEmail(e.target.value) }
            />
          </label>
          <label htmlFor="senha" className="label">
            <p className="">Senha</p>
            <input
              type="password"
              data-testid="admin_manage__input-password"
              placeholder="**********"
              onChange={ (e) => setPassword(e.target.value) }
            />
          </label>
          <label htmlFor="senha" className="label">
            <p className="">Tipo</p>
            <select
              type="role"
              data-testid="admin_manage__select-role"
              onChange={ (e) => setRole(e.target.value) }
            >
              <option selected value="tipo">Tipo</option>
              <option value="customer">Cliente</option>
              <option value="seller">Vendedor</option>
              <option value="administrator">Administrador</option>
            </select>
          </label>
          <button
            type="button"
            data-testid="admin_manage__button-register"
            disabled={ buttonDisabled }
            onClick={ handleClick }
          >
            CADASTRAR
          </button>
        </form>
        <p
          className="error-msg"
          data-testid="admin_manage__element-invalid-register"
          style={ { visibility: errorVisibility } }
        >
          { errorMessage }
        </p>
      </div>
    );
  };

  // if() logica para validar rota pra admin

  return (
    <div className="main-content-adm">
      <div className="main-navbar">
        <NavBarVendorADmin />
      </div>
      { formRegister() }
    </div>
  );
};

export default Admin;
