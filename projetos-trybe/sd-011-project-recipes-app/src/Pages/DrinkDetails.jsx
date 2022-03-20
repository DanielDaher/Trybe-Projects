import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import favoriteImg from '../images/blackHeartIcon.svg';
import home from '../images/Home.svg';
import fullHearth from '../images/whiteHeartIcon.svg';
import saveRecipesOnLocalStorage from '../Services/saveFavoriteRecipesOnLocalStorage';

class DrinkDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinkDetail: [],
      ingredient: [],
      measure: [],
      recomandation: [],
      copyToClipboard: false,
      favoriteFood: false,
    };
    this.fetchDetail = this.fetchDetail.bind(this);
    this.renderRecomendations = this.renderRecomendations.bind(this);
    this.saveOnLocalStorage = this.saveOnLocalStorage.bind(this);
    this.saveOnLocalStorage = this.saveOnLocalStorage.bind(this);
    this.checkRecipeInProgress = this.checkRecipeInProgress.bind(this);
    this.verifyRecipeIsDone = this.verifyRecipeIsDone.bind(this);
    this.saveFavoriteRecipes = this.saveFavoriteRecipes.bind(this);
    this.addMealInProgress = this.addMealInProgress.bind(this);
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

  verifyRecipeIsDone() {
    const { match: { params: { id } } } = this.props;
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    if (doneRecipes.length > 0) {
      return doneRecipes.some((recipe) => recipe.id === id);
    }
    return false;
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

  saveOnLocalStorage() {
    const { drinkDetail } = this.state;
    const doneRecipes = [{ id: drinkDetail[0].idDrink,
      type: drinkDetail[0].strDrink,
      area: drinkDetail[0].strArea,
      category: drinkDetail[0].strCategory,
      alcoholicOrNot: drinkDetail[0].strAlcoholic,
      name: drinkDetail[0].strDrink,
      image: drinkDetail[0].strSource,
      doneDate: new Date(),
      tags: drinkDetail[0].strTags }];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }

  async fetchDetail() {
    const { match: { params: { id } } } = this.props;

    const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const json = await result.json();

    this.setState({
      drinkDetail: json.drinks,
    });

    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((item) => item.json())
      .then((mewResult) => this.setState({ recomandation: mewResult.meals }));

    const filteredIngredients = Object.entries(json.drinks[0]).filter(
      (arr) => arr[0].includes('Ingredient', 'measure') && arr[1],
    );
    const ingredients = filteredIngredients.map((ing) => ({ ingredient: ing[1] }));
    this.setState({ ingredient: ingredients });
    const filteredMeasure = Object.entries(json.drinks[0]).filter(
      (arr) => arr[0].includes('Measure') && arr[1],
    );
    const measure = filteredMeasure.map((eachIngredient) => eachIngredient[1]);
    this.setState({ measure });
  }

  renderRecomendations() {
    const { recomandation } = this.state;
    const number6 = 6;
    const sliceOfRecomandation = recomandation.slice(0, number6);
    return (
      <Carousel className="rec-carousel" variant="dark">
        { sliceOfRecomandation.map((item, index) => (
          <Carousel.Item
            key={ `rec-${index}` }
            data-testid={ `${index}-recomendation-card` }
          >
            <img className="detailImg" src={ item.strMealThumb } alt="imagem" />
            <Carousel.Caption>
              <h5 data-testid={ `${index}-recomendation-title` }>{ item.strMeal }</h5>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }

  render() {
    const { drinkDetail, ingredient, measure,
      recomandation, copyToClipboard, favoriteFood } = this.state;
    const { match: { params: { id } } } = this.props;
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
              src={ result.strDrinkThumb }
            />
            <CopyToClipboard text={ window.location.href }>
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
            { recomandation && this.renderRecomendations() }
            { ingredient && ingredient.map((item, ingredientIndex) => (
              <ul className="instructions" key={ ingredientIndex }>
                <li data-testid={ `${ingredientIndex}-ingredient-name-and-measure` }>
                  { `${item.ingredient} - ${measure[ingredientIndex]}` }
                </li>
              </ul>
            )) }
            <p className="instructions" data-testid="instructions">
              { result.strInstructions }
            </p>
            <Link to={ `/bebidas/${id}/in-progress` }>
              <button
                id="initRecipe"
                type="button"
                style={ { display: this.verifyRecipeIsDone() ? 'none' : 'initial' } }
                data-testid="start-recipe-btn"
                onClick={ () => this.addMealInProgress() }
              >
                { this.checkRecipeInProgress() ? 'Continuar Receita' : 'Iniciar Receita' }
              </button>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  drinkAPIResponse: state.recipeReducer.drinkRecipes,
});

DrinkDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.objectOf(),
  }),
}.isRequired;

export default connect(mapStateToProps)(DrinkDetails);
