import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../Styles/FooterMenu.css';

class FooterMenu extends React.Component {
  render() {
    return (
      <footer data-testid="footer" className="footer">
        <Link to="/bebidas">
          <img src={ drinkIcon } alt="" data-testid="drinks-bottom-btn" />
        </Link>
        <Link to="/explorar">
          <img src={ exploreIcon } alt="" data-testid="explore-bottom-btn" />
        </Link>
        <Link to="/comidas">
          <img src={ mealIcon } alt="" data-testid="food-bottom-btn" />
        </Link>
      </footer>
    );
  }
}

export default FooterMenu;
