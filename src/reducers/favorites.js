import { FAVORITE_CHANGE, FAVORITE_REMOVE } from '../actions/types';

const initialState = {
  collections: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FAVORITE_CHANGE:
      return {
        ...state,
        collections: state.collections.concat(payload.newItem)
      };

    case FAVORITE_REMOVE:
      return {
        ...state,
        collections: payload
      };
    default:
      return state;
  }
}
