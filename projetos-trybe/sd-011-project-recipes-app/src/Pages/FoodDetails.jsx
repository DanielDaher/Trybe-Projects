import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import Carousel from 'react-bootstrap/Carousel';
import favoriteImg from '../images/blackHeartIcon.svg';
import fullHearth from '../images/whiteHeartIcon.svg';
import home from '../images/Home.svg';
import saveRecipesOnLocalStorage from '../Services/saveFavoriteRecipesOnLocalStorage';

class FoodDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodDetail: [],
      ingredient: [],
      measure: [],
      recomandation: [],
      copyToClipboard: false,
      favoriteFood: false,
    };
    this.fetchDetail = this.fetchDetail.bind(this);
    this.renderRecomendations = this.renderRecomendations.bind(this);
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
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipe));
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
      image: foodDetail[0].strMealThumb,
    };
    saveRecipesOnLocalStorage(favoriteRecipes);
  }

  saveOnLocalStorage() {
    const { foodDetail } = this.state;
    const doneRecipes = [{ id: foodDetail[0].idMeal,
      type: foodDetail[0].strMeal,
      area: foodDetail[0].strArea,
      category: foodDetail[0].strCategory,
      alcoholicOrNot: '',
      name: foodDetail[0].strMeal,
      image: foodDetail[0].strSource,
      doneDate: new Date(),
      tags: foodDetail[0].strTags }];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }

  async fetchDetail() {
    const { match: { params: { id } } } = this.props;
    const result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const json = await result.json();
    this.setState({ foodDetail: json.meals });
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((item) => item.json())
      .then((mewResult) => this.setState({ recomandation: mewResult.drinks }));
    const filteredIngredients = Object.entries(json.meals[0]).filter(
      (arr) => arr[0].includes('Ingredient') && arr[1],
    );
    const ingredients = filteredIngredients.map((ing) => ({ ingredient: ing[1] }));
    this.setState({ ingredient: ingredients });
    const filteredMeasure = Object.entries(json.meals[0]).filter(
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
            <img className="detailImg" src={ item.strDrinkThumb } alt="imagem" />
            <Carousel.Caption>
              <h5 data-testid={ `${index}-recomendation-title` }>{ item.strDrink }</h5>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }

  render() {
    const { foodDetail, ingredient, measure,
      recomandation, copyToClipboard, favoriteFood } = this.state;
    const { match: { params: { id } } } = this.props;
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
                <p data-testid="recipe-category">
                  { result.strCategory }
                </p>
              </div>
              <button
                className="hearth"
                id="hearth"
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
            <div className="wrapper">
              <ReactPlayer
                className="player"
                width="100%"
                height="100%"
                url={ result.strYoutube }
                data-testid="video"
              />
            </div>
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
            <Link to={ `/comidas/${id}/in-progress` }>
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
  foodAPIResponse: state.recipeReducer.foodRecipes,
});
FoodDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.objectOf(),
  }),
}.isRequired;
export default connect(mapStateToProps)(FoodDetails);
