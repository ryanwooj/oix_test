import { combineReducers } from 'redux';
import sorts from './sorts';
import favorites from './favorites';
export default combineReducers({
  sorts,
  favorites
});
