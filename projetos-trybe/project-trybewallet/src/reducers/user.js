// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: 'vanderlei@vanderlei.com',
};

function saveEmail(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case 'ADD_EMAIL':
    return {
      ...state,
      email: payload,
    };
  default:
    return state;
  }
}

export default saveEmail;
