import userEvent from '@testing-library/user-event';
import React from 'react';
import Login from '../Pages/Login';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test Header', () => {
  it('Testing inputs and button if they exists', async () => {
    const { getByText, history } = renderWithRouter(
      <App />,
    );

    history.push('/');

    expect(history.location.pathname).toBe('/');

    const email = getByText('E-mail');
    expect(email).toBeInTheDocument();

    const password = getByText('Password');
    expect(password).toBeInTheDocument();

    const submitButton = getByText('Submit');

    expect(submitButton).toBeInTheDocument();
  });

  it('Ao clicar no botão, o usuário vai para /comidas', () => {
    const { getByTestId, history } = renderWithRouter(<Login />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginButton = getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'fulano@gmail.com');
    userEvent.type(passwordInput, '12345678');
    expect(loginButton).not.toHaveAttribute('disabled');

    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/comidas');
  });
});
