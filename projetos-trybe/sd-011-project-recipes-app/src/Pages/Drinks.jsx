import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import HeaderDrink from '../Components/HeaderDrink';
import RecipesList from '../Components/RecipesList';
import FooterMenu from '../Components/FooterMenu';
import fetchReceiveDrink from '../Actions/drink';

class Drinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonClicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { history: { location: { state } } } = this.props;
    const { fetchRecipes } = this.props;
    return state ? fetchRecipes(state.myIngredient, 'ingrediente') : fetchRecipes();
  }

  handleClick(bool) {
    this.setState({
      buttonClicked: bool,
    });
  }

  render() {
    const { drinkAPIResponse: { drinks } } = this.props;
    const { history: { location: { pathname } } } = this.props;
    const { buttonClicked } = this.state;
    return (
      <div className="background">
        <HeaderDrink onClick={ this.handleClick } title="Bebidas" />
        { drinks.length === 1 && !buttonClicked
          ? <Redirect to={ `/bebidas/${drinks[0].idDrink}` } />
          : <RecipesList onClick={ this.handleClick } pathName={ pathname } />}
        <FooterMenu />
      </div>
    );
  }
}

Drinks.propTypes = {
  drinkAPIResponse: PropTypes.shape({
    drinks: PropTypes.arrayOf(),
  }),
  fetchRecipes: PropTypes.func.isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  drinkAPIResponse: state.recipeReducer.drinksRecipes,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: (input, radio) => dispatch(fetchReceiveDrink(input, radio)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
