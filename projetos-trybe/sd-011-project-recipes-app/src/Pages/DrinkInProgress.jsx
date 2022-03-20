import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import favoriteImg from '../images/blackHeartIcon.svg';
import home from '../images/Home.svg';
import fullHearth from '../images/whiteHeartIcon.svg';
import saveRecipesOnLocalStorage from '../Services/saveFavoriteRecipesOnLocalStorage';
import {
  saveDoneRecipeDrinkOnLocalStorage } from '../Services/saveDoneRecipeOnLocalStorage';

export default class DrinkInProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinkDetail: [],
      ingredient: [],
      measure: [],
      copyToClipboard: false,
      favoriteDrink: false,
      getLocalStorage: {},
    };
    this.fetchDetail = this.fetchDetail.bind(this);
    this.setClassBox = this.setClassBox.bind(this);
    this.saveFavoriteRecipes = this.saveFavoriteRecipes.bind(this);
    this.setCheckedStorage = this.setCheckedStorage.bind(this);
    this.addMealInProgress = this.addMealInProgress.bind(this);
    this.checkRecipeInProgress = this.checkRecipeInProgress.bind(this);
    this.setDoneRecipe = this.setDoneRecipe.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }

  componentDidMount() {
    this.fetchDetail();
    const { match: { params: { id } } } = this.props;
    this.newFunction = () => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      let favRecipeLocalStorage;
      if (favoriteRecipes !== null && favoriteRecipes[0]) {
        const favRecipenew = favoriteRecipes[0].id;
        favRecipeLocalStorage = favRecipenew;
      }
      if (favRecipeLocalStorage === id) {
        this.setState({ favoriteDrink: true });
      }
    };
    this.newFunction();
  }

  setClassBox({ target }) {
    this.addMealInProgress();
    const { match: { params: { id } } } = this.props;
    const label = target.parentElement;
    const previewStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    this.setState({ getLocalStorage: previewStorage });
    if (target.checked) {
      previewStorage.cocktails[id].push(Number(target.id));
      localStorage.setItem('inProgressRecipes', JSON.stringify(previewStorage));
      label.className = 'instructions-input-checked';
    } else {
      const updateStorage = previewStorage.cocktails[id]
        .filter((item) => item !== Number(target.id));
      previewStorage.cocktails[id] = updateStorage;
      localStorage.setItem('inProgressRecipes', JSON.stringify(previewStorage));
      label.className = 'instructions-input';
    }
  }

  setCheckedStorage(ingredientIndex) {
    const { match: { params: { id } } } = this.props;
    const previewStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (previewStorage !== null) {
      const valueLocalStorage = previewStorage.cocktails[id];
      const teste = valueLocalStorage.find((item) => item === Number(ingredientIndex));
      if (teste !== undefined) return true;
    }
  }

  setDoneRecipe() {
    const { drinkDetail } = this.state;
    saveDoneRecipeDrinkOnLocalStorage(drinkDetail);
  }

  saveFavoriteRecipes() {
    const { drinkDetail } = this.state;
    const favoriteRecipes = { id: drinkDetail[0].idDrink,
      type: 'bebida',
      area: drinkDetail[0].strArea || '',
      category: drinkDetail[0].strCategory || '',
      alcoholicOrNot: drinkDetail[0].strAlcoholic || '',
      name: drinkDetail[0].strDrink,
      image: drinkDetail[0].strDrinkThumb };
    saveRecipesOnLocalStorage(favoriteRecipes);
  }

  async fetchDetail() {
    const { match: { params: { id } } } = this.props;
    const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const json = await result.json();
    this.setState({ drinkDetail: json.drinks });
    const filteredIngredients = Object.entries(json.drinks[0]).filter(
      (arr) => arr[0].includes('Ingredient', 'measure') && arr[1],
    );
    const ingredients = filteredIngredients.map((ing) => ({
      ingredient: ing[1],
    }));
    this.setState({ ingredient: ingredients });
    const filteredMeasure = Object.entries(json.drinks[0]).filter(
      (arr) => arr[0].includes('Measure') && arr[1],
    );
    const measure = filteredMeasure.map((eachIngredient) => eachIngredient[1]);
    this.setState({
      measure,
    });
  }

  checkRecipeInProgress() {
    const { match: { params: { id } } } = this.props;
    const recipeInProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    if (Object.keys(recipeInProgress).length > 0) {
      return Object.keys(recipeInProgress.cocktails).some((recipeId) => recipeId === id);
    }
    return false;
  }

  addMealInProgress() {
    const { match: { params: { id } } } = this.props;
    const inProgress = { cocktails: {}, meals: {} };
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    }
    if (!this.checkRecipeInProgress()) {
      const recipe = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
      recipe.cocktails = { ...recipe.cocktails, [id]: [] };
      localStorage.setItem('inProgressRecipes',
        JSON.stringify(recipe));
    }
  }

  enableButton() {
    const { match: { params: { id } } } = this.props;
    const { getLocalStorage, ingredient } = this.state;
    if (getLocalStorage.cocktails !== undefined
      && getLocalStorage.cocktails[id].length === ingredient.length) {
      return false;
    }
    return true;
  }

  render() {
    const {
      drinkDetail, ingredient, measure, favoriteDrink, copyToClipboard } = this.state;
    const lastIndexOfHrefLocattion = 5;
    const hrefLocationSplit = window.location.href.split('/');
    const hrefLocation = hrefLocationSplit
      .filter((_, index) => index !== lastIndexOfHrefLocattion);
    return (
      <div className="detailContainer">
        {drinkDetail && drinkDetail.map((result, index) => (
          <div key={ index }>
            <div className="header-detail-recipe">
              <Link to="/comidas">
                <img className="homeImg" src={ home } alt="home" />
              </Link>
              <div className="containerForTitle">
                <h1 data-testid="recipe-title">
                  { result.strDrink }
                </h1>
                <hr id="seraquevai" />
                <p data-testid="recipe-category">
                  { result.strAlcoholic }
                </p>
              </div>
              <button
                className="hearth"
                type="button"
                onClick={ () => {
                  this.setState({ favoriteDrink: !favoriteDrink });
                  this.saveFavoriteRecipes();
                } }
              >
                <img
                  data-testid="favorite-btn"
                  src={ favoriteDrink ? favoriteImg : fullHearth }
                  alt="favorite-img"
                />
              </button>
            </div>
            <img
              className="detailImg"
              data-testid="recipe-photo"
              alt="product-detail-img"
              src={ result.strDrinkThumb }
            />
            <CopyToClipboard text={ hrefLocation.join('/') }>
              <button
                style={ { color: 'white',
                  backgroundColor: 'rgb(151, 0, 0)',
                  width: '100%' } }
                type="button"
                data-testid="share-btn"
                onClick={ () => this.setState({ copyToClipboard: true }) }
              >
                { copyToClipboard ? 'Link copiado!' : 'Compartilhar' }
              </button>
            </CopyToClipboard>
            { ingredient && ingredient.map((item, ingredientIndex) => (
              <label
                htmlFor={ ingredientIndex }
                className="instructions-input"
                key={ ingredientIndex }
                data-testid={ `${ingredientIndex}-ingredient-step` }
              >
                <input
                  id={ ingredientIndex }
                  type="checkbox"
                  checked={ this.setCheckedStorage(ingredientIndex) }
                  onClick={ (event) => this.setClassBox(event) }
                />
                { ` ${item.ingredient} - ${measure[ingredientIndex]}` }
              </label>
            )) }
            <p className="instructions" data-testid="instructions">
              { result.strInstructions }
            </p>
            <Link to="/receitas-feitas">
              <button
                id="initRecipe"
                type="button"
                data-testid="finish-recipe-btn"
                onClick={ () => this.setDoneRecipe() }
                disabled={ this.enableButton() }
              >
                Finalizar Receita
              </button>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

DrinkInProgress.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.objectOf(),
  }),
}.isRequired;
