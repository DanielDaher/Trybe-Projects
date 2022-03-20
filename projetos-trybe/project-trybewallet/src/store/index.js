import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import combineReducer from '../reducers';

const store = createStore(
  combineReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
