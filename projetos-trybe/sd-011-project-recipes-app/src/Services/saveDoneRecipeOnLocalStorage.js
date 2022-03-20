function doneDate() {
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

export function saveDoneRecipeFoodOnLocalStorage(foodDetail) {
  const dataLocalStorage = {
    id: foodDetail[0].idMeal,
    type: 'comida',
    area: foodDetail[0].strArea,
    category: foodDetail[0].strCategory,
    alcoholicOrNot: '',
    name: foodDetail[0].strMeal,
    image: foodDetail[0].strMealThumb,
    doneDate: doneDate(),
    tags: foodDetail[0].strTags !== null ? foodDetail[0].strTags.split(', ')
      : [],
  };
  if (localStorage.getItem('doneRecipes') === null) {
    return localStorage.setItem('doneRecipes', JSON.stringify([dataLocalStorage]));
  }
  const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
  doneRecipe.push(dataLocalStorage);
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipe));
}

export function saveDoneRecipeDrinkOnLocalStorage(drinkDetail) {
  const dataLocalStorage = {
    id: drinkDetail[0].idDrink,
    type: 'bebida',
    area: '',
    category: drinkDetail[0].strCategory,
    alcoholicOrNot: drinkDetail[0].strAlcoholic,
    name: drinkDetail[0].strDrink,
    image: drinkDetail[0].strDrinkThumb,
    doneDate: doneDate(),
    tags: drinkDetail[0].strTags !== null ? drinkDetail[0].strTags.split(', ')
      : [],
  };
  if (localStorage.getItem('doneRecipes') === null) {
    return localStorage.setItem('doneRecipes', JSON.stringify([dataLocalStorage]));
  }
  const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
  doneRecipe.push(dataLocalStorage);
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipe));
}
