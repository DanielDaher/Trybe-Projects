// Coloque aqui suas actions
const ADD_EMAIL = 'ADD_EMAIL';
const ADD_CURRENCIES = 'ADD_CURRENCIES';
const ADD_EXPENSES = 'ADD_EXPENSES';
const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export function addEmail(payload) {
  return {
    type: ADD_EMAIL,
    payload,
  };
}

export function removeExpense(payload) {
  return {
    type: REMOVE_EXPENSE,
    payload,
  };
}

function addWalletCurrencies(payload) {
  return {
    type: ADD_CURRENCIES,
    payload,
  };
}

export function fetchApi() {
  return async (dispatch) => {
    const requisition = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await requisition.json();
    return dispatch(addWalletCurrencies(data));
  };
}

export function addExpenses(payload) {
  return async (dispatch, getState) => {
    dispatch(fetchApi());
    const newData = getState().wallet.currencies;
    return dispatch({
      type: ADD_EXPENSES,
      payload: { ...payload, exchangeRates: newData },
    });
  };
}
