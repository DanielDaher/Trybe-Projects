import React, { Component } from 'react';
import HeaderWithoutSearch from '../Components/HeaderWithoutSearch';
import CardsDoneRecipes from '../Components/CardsDoneRecipes';

export default class RecipesDone extends Component {
  constructor() {
    super();
    this.state = {
      recipesDone: JSON.parse(localStorage.getItem('doneRecipes')) || [],
    };
    this.filterRecipesOnScreen = this.filterRecipesOnScreen.bind(this);
  }

  filterRecipesOnScreen(type) {
    switch (type) {
    case 'Food':
      this.setState({
        recipesDone: JSON.parse(localStorage
          .getItem('doneRecipes'))
          .filter((eachRecipe) => eachRecipe.type === 'comida'),
      });
      break;
    case 'Drinks':
      this.setState({
        recipesDone: JSON.parse(localStorage
          .getItem('doneRecipes'))
          .filter((eachRecipe) => eachRecipe.type === 'bebida'),
      });
      break;
    default:
      this.setState({
        recipesDone: JSON.parse(localStorage.getItem('doneRecipes')),
      });
      break;
    }
  }

  render() {
    const { recipesDone } = this.state;
    return (
      <div className="explore-container">
        <header style={ ({ backgroundColor: 'gray' }) }>
          <HeaderWithoutSearch title="Receitas Feitas" />
        </header>

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
        <CardsDoneRecipes done={ recipesDone } />
      </div>
    );
  }
}
