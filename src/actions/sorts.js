import { SORT_OVER, SORT_LESS, SORT_HIGH, SORT_LOW } from './types';

export const sortOver = planets => async dispatch => {
  const newResult = planets.filter(planet => planet.population > 10000);
  dispatch({
    type: SORT_OVER,
    payload: {
      result: newResult
    }
  });
};

export const sortLess = planets => dispatch => {
  const newResult = planets.filter(planet => planet.population < 10000);
  dispatch({
    type: SORT_LESS,
    payload: {
      result: newResult
    }
  });
};

export const sortHigh = planets => dispatch => {
  const newResult = planets.sort(function(a, b) {
    return a.population - b.population;
  });
  dispatch({
    type: SORT_HIGH,
    payload: {
      result: newResult
    }
  });
};
export const sortLow = planets => dispatch => {
  const newResult = planets.sort(function(a, b) {
    return b.population - a.population;
  });
  dispatch({
    type: SORT_LOW,
    payload: {
      result: newResult
    }
  });
};
