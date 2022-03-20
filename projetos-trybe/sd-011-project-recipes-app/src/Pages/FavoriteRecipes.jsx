import React, { Component } from 'react';
import HeaderWithoutSearch from '../Components/HeaderWithoutSearch';
import CardsFavoriteRecipes from '../Components/CardsFavoriteRecipes';

export default class FavoriteRecipes extends Component {
  constructor() {
    super();
    this.state = {
      myFavoriteRecipes: JSON.parse(localStorage.getItem('favoriteRecipes')) || [],
    };
    this.filterRecipesOnScreen = this.filterRecipesOnScreen.bind(this);
  }

  filterRecipesOnScreen(type) {
    switch (type) {
    case 'Food':
      this.setState({
        myFavoriteRecipes: JSON.parse(localStorage
          .getItem('favoriteRecipes'))
          .filter((eachRecipe) => eachRecipe.type === 'comida'),
      });
      break;
    case 'Drinks':
      this.setState({
        myFavoriteRecipes: JSON.parse(localStorage
          .getItem('favoriteRecipes'))
          .filter((eachRecipe) => eachRecipe.type === 'bebida'),
      });
      break;
    default:
      this.setState({
        myFavoriteRecipes: JSON.parse(localStorage.getItem('favoriteRecipes')),
      });
      break;
    }
  }

  render() {
    const { myFavoriteRecipes } = this.state;
    return (
      <div className="explore-container">
        <header style={ ({ backgroundColor: 'gray' }) }>
          <HeaderWithoutSearch title="Receitas Favoritas" />
        </header>
        {console.log(myFavoriteRecipes)}
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => this.filterRecipesOnScreen('All') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => this.filterRecipesOnScreen('Food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => this.filterRecipesOnScreen('Drinks') }
        >
          Drinks
        </button>
        <CardsFavoriteRecipes favorites={ myFavoriteRecipes } />
      </div>
    );
  }
}
