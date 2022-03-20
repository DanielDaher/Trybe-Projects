export default function saveFavoriteRecipesOnLocalStorage(favoriteRecipes) {
  const storageFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  if (storageFavoriteRecipes === null) {
    return localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipes]));
  }

  if (storageFavoriteRecipes.find(({ id }) => id === favoriteRecipes.id)) {
    const filterFavoriteRecipes = storageFavoriteRecipes
      .filter(({ id }) => id !== favoriteRecipes.id);
    return localStorage.setItem('favoriteRecipes', JSON.stringify(filterFavoriteRecipes));
  }

  return localStorage.setItem('favoriteRecipes',
    JSON.stringify([...storageFavoriteRecipes, favoriteRecipes]));
}
