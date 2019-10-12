import {
  SET_LOADING,
  SORT_OVER,
  SORT_LESS,
  SORT_HIGH,
  SORT_LOW
} from '../actions/types';

const initialState = {
  result: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: false
      };
    case SORT_OVER:
      return {
        result: payload.result
      };
    case SORT_LESS:
      return {
        result: payload.result
      };
    case SORT_HIGH:
      return {
        result: payload.result
      };
    case SORT_LOW:
      return {
        result: payload.result
      };
    default:
      return state;
  }
}
