import { FAVORITE_CHANGE, FAVORITE_REMOVE } from './types';

export const changeFav = id => async dispatch => {
  dispatch({
    type: FAVORITE_CHANGE,
    payload: {
      newItem: {
        id: id,
        status: true
      }
    }
  });
};
export const removeFav = id => async dispatch => {
  dispatch({
    type: FAVORITE_REMOVE,
    payload: {
      id: id,
      status: false
    }
  });
};
