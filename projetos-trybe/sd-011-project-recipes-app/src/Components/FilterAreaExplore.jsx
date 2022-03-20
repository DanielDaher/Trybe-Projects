import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function FilterAreaExplore() {
  const [areas, setAreas] = useState([]);
  const [optionValue, setOptionValue] = useState('All');
  const [recipes, setRecipes] = useState([]);
  const twelve = 12;
  const url = optionValue === 'All'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    : `https://www.themealdb.com/api/json/v1/1/filter.php?a=${optionValue}`;

  useEffect(() => {
    const fetchArea = async () => {
      const requisition = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const { meals } = await requisition.json();
      setAreas(meals);
    };

    fetchArea();
  }, []);

  useEffect(() => {
    const fetchArea = async () => {
      const requisition = await fetch(url);
      const { meals } = await requisition.json();
      setRecipes(meals);
    };

    fetchArea();
  }, [url]);

  return (
    <div>
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ ({ target }) => setOptionValue(target.value) }
      >
        <option
          data-testid="All-option"
        >
          All
        </option>
        {areas.map((area, index) => (
          <option
            key={ index }
            data-testid={ `${area.strArea}-option` }
          >
            {area.strArea}
          </option>
        ))}
      </select>
      {recipes && recipes
        .filter((_, index) => index < twelve)
        .map((recipe, index) => (
          <Link to={ `/comidas/${recipe.idMeal}` } key={ index }>
            <div data-testid={ `${index}-recipe-card` } className="cardRecipesContainer">
              <img
                src={ recipe.strMealThumb }
                alt={ recipe.strMealThumb }
                className="recipesImg"
                data-testid={ `${index}-card-img` }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                {recipe.strMeal}
              </p>
            </div>
          </Link>

        ))}
    </div>
  );
}
