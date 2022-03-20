// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Mudar a função depois.
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  id: 0,
};

function saveWallet(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case 'ADD_CURRENCIES':
    return {
      ...state,
      currencies: payload,
    };
  case 'ADD_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, { ...payload, id: state.id }],
      id: state.id + 1,
    };
  case 'REMOVE_EXPENSE':
    return {
      ...state,
      expenses: payload,
    };
  default:
    return state;
  }
}

export default saveWallet;
