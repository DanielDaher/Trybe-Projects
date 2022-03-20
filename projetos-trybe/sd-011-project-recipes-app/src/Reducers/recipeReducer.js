import { RECEIVED_RECIPES_FOOD } from '../Actions/food';
import { RECEIVED_RECIPES_DRINKS } from '../Actions/drink';

const INITIAL_STATE = {
  foodRecipes: { meals: [] },
  drinksRecipes: { drinks: [] },
};

function recipeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECEIVED_RECIPES_FOOD:
    return { ...state, foodRecipes: action.allRecipes };
  case RECEIVED_RECIPES_DRINKS:
    return { ...state, drinksRecipes: action.allRecipes };
  default:
    return state;
  }
}

export default recipeReducer;
