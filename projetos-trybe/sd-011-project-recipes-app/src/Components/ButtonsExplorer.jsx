import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ButtonsExplorer extends Component {
  constructor() {
    super();
    this.state = {
      randomRecipe: {},
      link: {},
    };
    this.fetchRandom = this.fetchRandom.bind(this);
    this.updateLink = this.updateLink.bind(this);
  }

  componentDidMount() {
    this.fetchRandom();
  }

  fetchRandom() {
    const { type } = this.props;
    const URLFetch = type === 'comidas'
      ? 'https://www.themealdb.com/api/json/v1/1/random.php'
      : 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    fetch(URLFetch)
      .then((response) => response.json())
      .then((response) => this.setState({ randomRecipe: response }))
      .then(() => this.updateLink());
  }

  updateLink() {
    const { randomRecipe } = this.state;
    const { type } = this.props;
    let screenSurprise = '';
    switch (type) {
    case 'comidas':
      screenSurprise = `/comidas/${randomRecipe.meals[0].idMeal}`;
      break;
    case 'bebidas':
      screenSurprise = `/bebidas/${randomRecipe.drinks[0].idDrink}`;
      break;
    default:
      break;
    }
    this.setState({ link: screenSurprise });
  }

  render() {
    const { link } = this.state;
    const { type } = this.props;
    const links = {
      screenIngredients: '',
      screenOrigin: '',
    };
    switch (type) {
    case 'comidas':
      links.screenIngredients = '/explorar/comidas/ingredientes';
      links.screenOrigin = '/explorar/comidas/area';
      break;
    case 'bebidas':
      links.screenIngredients = '/explorar/bebidas/ingredientes';
      break;
    default:
      break;
    }
    return (
      <div>
        <Link
          to={ links.screenIngredients }
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </Link>
        {type === 'comidas'
          && (
            <Link
              to={ links.screenOrigin }
              data-testid="explore-by-area"
            >
              Por Local de Origem
            </Link>)}
        <Link
          to={ link }
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </Link>
      </div>
    );
  }
}

ButtonsExplorer.propTypes = {
  type: PropTypes.string,
}.isRequired;
