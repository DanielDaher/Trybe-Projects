import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import HeaderFood from '../Components/HeaderFood';
import RecipesList from '../Components/RecipesList';
import FooterMenu from '../Components/FooterMenu';
import fetchReceiveFood from '../Actions/food';

class Food extends Component {
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
    const { history: { location: { pathname } } } = this.props;
    const { foodAPIResponse: { meals } } = this.props;
    const { buttonClicked } = this.state;
    return (
      <div className="background">
        <HeaderFood onClick={ this.handleClick } title="Comidas" />
        { meals.length === 1 && !buttonClicked
          ? <Redirect to={ { pathname: `/comidas/${meals[0].idMeal}`, state: meals } } />
          : <RecipesList onClick={ this.handleClick } pathName={ pathname } />}
        <FooterMenu />
      </div>
    );
  }
}

Food.propTypes = {
  foodAPIResponse: PropTypes.shape({
    meals: PropTypes.arrayOf(),
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  foodAPIResponse: state.recipeReducer.foodRecipes,
  fetchRecipes: PropTypes.func.isRequired,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: (input, radio) => dispatch(fetchReceiveFood(input, radio)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Food);
