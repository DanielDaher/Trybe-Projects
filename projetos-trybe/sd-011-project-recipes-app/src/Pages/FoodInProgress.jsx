import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import favoriteImg from '../images/blackHeartIcon.svg';
import home from '../images/Home.svg';
import fullHearth from '../images/whiteHeartIcon.svg';
import saveRecipesOnLocalStorage from '../Services/saveFavoriteRecipesOnLocalStorage';
import {
  saveDoneRecipeFoodOnLocalStorage } from '../Services/saveDoneRecipeOnLocalStorage';

export default class FoodInProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodDetail: [],
      ingredient: [],
      measure: [],
      copyToClipboard: false,
      favoriteFood: false,
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
        this.setState({ favoriteFood: true });
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
      previewStorage.meals[id].push(Number(target.id));
      localStorage.setItem('inProgressRecipes', JSON.stringify(previewStorage));
      label.className = 'instructions-input-checked';
    } else {
      const updateStorage = previewStorage.meals[id]
        .filter((item) => item !== Number(target.id));
      previewStorage.meals[id] = updateStorage;
      localStorage.setItem('inProgressRecipes', JSON.stringify(previewStorage));
      label.className = 'instructions-input';
    }
  }

  setCheckedStorage(ingredientIndex) {
    const { match: { params: { id } } } = this.props;
    const previewStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (previewStorage !== null) {
      const valueLocalStorage = previewStorage.meals[id];
      const teste = valueLocalStorage.find((item) => item === Number(ingredientIndex));
      if (teste !== undefined) {
        return true;
      }
    }
  }

  setDoneRecipe() {
    const { foodDetail } = this.state;
    saveDoneRecipeFoodOnLocalStorage(foodDetail);
  }

  async fetchDetail() {
    const { match: { params: { id } } } = this.props;
    const result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const json = await result.json();
    this.setState({ foodDetail: json.meals });
    const filteredIngredients = Object.entries(json.meals[0]).filter(
      (arr) => arr[0].includes('Ingredient') && arr[1],
    );
    const ingredients = filteredIngredients.map((ing) => ({
      ingredient: ing[1],
    }));
    this.setState({ ingredient: ingredients });
    const filteredMeasure = Object.entries(json.meals[0]).filter(
      (arr) => arr[0].includes('Measure') && arr[1],
    );
    const measure = filteredMeasure.map((eachIngredient) => eachIngredient[1]);
    this.setState({ measure });
  }

  checkRecipeInProgress() {
    const { match: { params: { id } } } = this.props;
    const recipeInProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    if (Object.keys(recipeInProgress).length > 0) {
      return Object.keys(recipeInProgress.meals)
        .some((recipeId) => recipeId === id);
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
      recipe.meals = { ...recipe.meals, [id]: [] };
      localStorage.setItem('inProgressRecipes',
        JSON.stringify(recipe));
    }
  }

  saveFavoriteRecipes() {
    const { foodDetail } = this.state;
    const favoriteRecipes = { id: foodDetail[0].idMeal,
      type: 'comida',
      area: foodDetail[0].strArea || '',
      category: foodDetail[0].strCategory || '',
      alcoholicOrNot: foodDetail[0].strAlcoholic || '',
      name: foodDetail[0].strMeal,
      image: foodDetail[0].strMealThumb };
    saveRecipesOnLocalStorage(favoriteRecipes);
  }

  enableButton() {
    const { match: { params: { id } } } = this.props;
    const { getLocalStorage, ingredient } = this.state;
    if (getLocalStorage.meals !== undefined
      && getLocalStorage.meals[id].length === ingredient.length) {
      return false;
    }
    return true;
  }

  render() {
    const { foodDetail, ingredient, measure, favoriteFood, copyToClipboard } = this.state;
    const lastIndexOfHrefLocattion = 5;
    const hrefLocationSplit = window.location.href.split('/');
    const hrefLocation = hrefLocationSplit
      .filter((_, index) => index !== lastIndexOfHrefLocattion);
    return (
      <div className="detailContainer">
        {foodDetail && foodDetail.map((result, index) => (
          <div key={ index }>
            <div className="header-detail-recipe">
              <Link to="/comidas">
                <img className="homeImg" src={ home } alt="home" />
              </Link>
              <div className="containerForTitle">
                <h1 data-testid="recipe-title">
                  { result.strMeal }
                </h1>
                <hr id="seraquevai" />
                <p data-testid="recipe-category">
                  { result.strCategory }
                </p>
              </div>
              <button
                className="hearth"
                type="button"
                onClick={ () => {
                  this.setState({ favoriteFood: !favoriteFood });
                  this.saveFavoriteRecipes();
                } }
              >
                <img
                  data-testid="favorite-btn"
                  src={ favoriteFood ? favoriteImg : fullHearth }
                  alt="favorite-img"
                />
              </button>
            </div>
            <img
              className="detailImg"
              data-testid="recipe-photo"
              alt="product-detail-img"
              src={ result.strMealThumb }
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

FoodInProgress.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.objectOf(),
  }),
}.isRequired;
