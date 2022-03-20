import { Switch, Route } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Login from './Pages/Login';
import Food from './Pages/Food';
import Drinks from './Pages/Drinks';
import DrinkDetails from './Pages/DrinkDetails';
import FoodDetails from './Pages/FoodDetails';
import Explore from './Pages/Explore';
import ExploreFood from './Pages/ExploreFood';
import ExploreDrink from './Pages/ExploreDrink';
import ExploreFoodIngredients from './Pages/ExploreFoodIngredients';
import ExploreDrinkIngredients from './Pages/ExploreDrinkIngredients';
import ExploreFoodOrigin from './Pages/ExploreFoodOrigin';
import ExploreDrinkOrigin from './Pages/ExploreDrinkOrigin';
import Profile from './Pages/Profile';
import RecipesDone from './Pages/RecipesDone';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import FoodInProgress from './Pages/FoodInProgress';
import DrinkInProgress from './Pages/DrinkInProgress';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/comidas" exact component={ Food } />
      <Route path="/bebidas" exact component={ Drinks } />
      <Route
        path="/comidas/:id"
        exact
        render={ (props) => <FoodDetails { ...props } /> }
      />
      <Route
        path="/bebidas/:id"
        exact
        render={ (props) => <DrinkDetails { ...props } /> }
      />
      <Route
        path="/comidas/:id/in-progress"
        exact
        render={ (props) => <FoodInProgress { ...props } /> }
      />
      <Route
        path="/bebidas/:id/in-progress"
        exact
        render={ (props) => <DrinkInProgress { ...props } /> }
      />
      <Route path="/explorar" exact component={ Explore } />
      <Route path="/explorar/comidas" exact component={ ExploreFood } />
      <Route path="/explorar/bebidas" exact component={ ExploreDrink } />
      <Route path="/explorar/comidas/ingredientes" component={ ExploreFoodIngredients } />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinkIngredients }
      />
      <Route
        path="/explorar/bebidas/area"
        component={ ExploreDrinkOrigin }
      />
      <Route
        path="/explorar/comidas/area"
        component={ ExploreFoodOrigin }
      />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ RecipesDone } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
