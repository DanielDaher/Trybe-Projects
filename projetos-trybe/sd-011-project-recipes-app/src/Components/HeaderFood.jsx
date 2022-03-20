import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import searchIcon from '../images/searchIcon.svg';
import profilePicture from '../images/profileIcon.svg';
import fetchReceiveFood from '../Actions/food';

class HeaderFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputLoading: false,
      inputTextValue: '',
      radioInputValue: '',
    };
    this.handleChangeRadioButtonValue = this.handleChangeRadioButtonValue.bind(this);
    this.submitRequest = this.submitRequest.bind(this);
  }

  handleChangeRadioButtonValue({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  submitRequest(e) {
    const { inputTextValue, radioInputValue } = this.state;
    const { fetchRecipes } = this.props;
    e.preventDefault();
    fetchRecipes(inputTextValue, radioInputValue);
  }

  render() {
    const { title, onClick } = this.props;
    const { inputLoading } = this.state;
    return (
      <div>
        <div className="header-container">
          <Link to="/perfil" className="profilePicture">
            <img
              className="profile"
              data-testid="profile-top-btn"
              src={ profilePicture }
              alt="profileIcon"
            />
          </Link>
          <h1 className="title" data-testid="page-title">{ title }</h1>

          <button
            type="button"
            className="searchButton"
            onClick={ () => (!inputLoading ? (this.setState({ inputLoading: true }))
              : (
                this.setState({ inputLoading: false }))) }
          >
            <img
              className="searchLupa"
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="searchIcon"
            />
          </button>
        </div>
        { inputLoading && (
          <Form
            className="text-center lg"
            onSubmit={ this.submitRequest }
          >
            <Form.Control
              className="text-center"
              data-testid="search-input"
              type="text"
              placeholder="Procure Aqui"
              name="inputTextValue"
              onChange={ (e) => this.handleChangeRadioButtonValue(e) }
            />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="labelForFilter" htmlFor="ingredient-search-radio">
                Ingrediente
                <Form.Check
                  type="radio"
                  id="ingredient-search-radio"
                  name="radioInputValue"
                  data-testid="ingredient-search-radio"
                  value="ingrediente"
                  onChange={ (e) => this.handleChangeRadioButtonValue(e) }

                />
              </Form.Label>
              <Form.Label className="labelForFilter" htmlFor="name-search-radio">
                Nome
                <Form.Check
                  type="radio"
                  id="name-search-radio"
                  name="radioInputValue"
                  data-testid="name-search-radio"
                  value="nome"
                  onChange={ (e) => this.handleChangeRadioButtonValue(e) }

                />
              </Form.Label>
              <Form.Label className="labelForFilter" htmlFor="first-letter-search-radio">
                Primeira letra
                <Form.Check
                  type="radio"
                  id="first-letter-search-radio"
                  name="radioInputValue"
                  data-testid="first-letter-search-radio"
                  value="primeira-letra"
                  onChange={ (e) => this.handleChangeRadioButtonValue(e) }

                />
              </Form.Label>
            </Form.Group>
            <Button
              className="submitButton"
              type="submit"
              data-testid="exec-search-btn"
              onClick={ () => onClick(false) }
            >
              Submit
            </Button>
          </Form>
        )}

      </div>
    );
  }
}

HeaderFood.propTypes = {
  title: PropTypes.string.isRequired,
  fetchRecipes: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: (input, radio) => dispatch(fetchReceiveFood(input, radio)),
});

export default connect(null, mapDispatchToProps)(HeaderFood);
