import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

export default class CardsDoneRecipes extends Component {
  constructor(props) {
    super(props);
    const { done } = this.props;

    this.state = {
      done,
      copyLink: false,
    };

    this.copySuccess = this.copySuccess.bind(this);
    this.setDoneRecipes = this.setDoneRecipes.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { done } = this.props;
    if (done !== prevProps.done) {
      this.setDoneRecipes();
    }
  }

  setDoneRecipes() {
    const { done } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      done,
    }));
  }

  copySuccess() {
    const oneSecond = 1000;
    this.setState({
      copyLink: true,
    });
    setTimeout(() => {
      this.setState({
        copyLink: false,
      });
    }, oneSecond);
  }

  render() {
    const { copyLink, done } = this.state;
    return (
      <div>
        {done.map((recipe, index) => (
          <div key={ index }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                alt="imagem"
                src={ recipe.image }
                width="150px"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <h6
              data-testid={ `${index}-horizontal-top-text` }
            >
              { recipe.area !== ''
                ? `${recipe.area} - ${recipe.category}` : `${recipe.alcoholicOrNot}`}
            </h6>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <h4 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h4>
            </Link>
            <CopyToClipboard
              text={ `${window.location.origin}/${recipe.type}s/${recipe.id}` }
            >
              <button
                style={ { color: 'white',
                  backgroundColor: 'rgb(151, 0, 0)',
                  width: '100%' } }
                type="button"
                data-testid="share-btn"
                onClick={ this.copySuccess }
              >
                <img
                  src={ shareIcon }
                  alt="share"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
            </CopyToClipboard>
            <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
            <div>
              { recipe.tags.map((item, key) => (
                <p
                  key={ key }
                  data-testid={ `${index}-${item}-horizontal-tag` }
                >
                  { item }
                </p>))}
            </div>
          </div>))}
        {copyLink ? <h6>Link copiado!</h6> : null}
      </div>);
  }
}

CardsDoneRecipes.propTypes = {
  done: PropTypes.shape({
    setDoneRecipes: PropTypes.arrayOf(),
  }),
}.isRequired;
