import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FooterMenu from '../Components/FooterMenu';
import HeaderWithoutSearch from '../Components/HeaderWithoutSearch';

export default class ExploreDrinkIngredients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientsForDrinks: [],
    };

    this.renderIngredientsAPI = this.renderIngredientsAPI.bind(this);
  }

  componentDidMount() {
    this.renderIngredientsAPI();
  }

  renderIngredientsAPI() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
      .then((result) => result.json())
      .then((response) => this.setState({ ingredientsForDrinks: response.drinks }));
  }

  render() {
    const { ingredientsForDrinks } = this.state;
    const magicNUMBER = 12;
    return (
      <div>
        <HeaderWithoutSearch title="Explorar Ingredientes" />
        { ingredientsForDrinks && (
          ingredientsForDrinks.map((item, index) => (
            index < magicNUMBER && (
              <Link
                to={ {
                  pathname: '/bebidas',
                  state: { myIngredient: item.strIngredient1 },
                } }
              >
                <div
                  className="cardRecipesContainer"
                  data-testid={ `${index}-ingredient-card` }
                  key={ index }
                >
                  <img
                    src={ `https://www.thecocktaildb.com/images/ingredients/${item
                      .strIngredient1}-Small.png` }
                    alt={ `${item.strIngredient1}` }
                    data-testid={ `${index}-card-img` }
                  />
                  <p data-testid={ `${index}-card-name` }>
                    { item.strIngredient1 }
                  </p>
                </div>
              </Link>
            )
          ))
        )}
        <FooterMenu />
      </div>
    );
  }
}
