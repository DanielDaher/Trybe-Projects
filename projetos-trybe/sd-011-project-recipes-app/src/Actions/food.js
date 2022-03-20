export const RECEIVED_RECIPES_FOOD = 'RECEIVED_RECIPES_FOOD';
export const REQUEST_RECEIVED = 'REQUEST_RECEIVED';

const receiveRecipes = (allRecipes) => ({
  type: RECEIVED_RECIPES_FOOD,
  allRecipes,
});

const requestRecipes = () => ({
  type: REQUEST_RECEIVED,
});

export default function fetchReceiveRecipes(textInputValue, radioInputValue) {
  return (dispatch) => {
    dispatch(requestRecipes());
    let url = '';
    const message = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
    switch (radioInputValue) {
    case 'ingrediente':
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${textInputValue}`;
      break;
    case 'nome':
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${textInputValue}`;
      break;
    case 'primeira-letra':
      if (textInputValue.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${textInputValue}`;
      break;
    case 'filter':
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${textInputValue}`;
      break;
    default:
      url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      break;
    }
    return fetch(url)
      .then((response) => response.json())
      .then((recipes) => {
        if (recipes.meals === null) {
          return alert(message);
        }
        return dispatch(receiveRecipes(recipes));
      });
  };
}
