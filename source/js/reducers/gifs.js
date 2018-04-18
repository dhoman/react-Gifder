import { Map } from 'immutable';

import {
  GET_DISCOVER_START,
  GET_DISCOVER_ERROR,
  GET_DISCOVER_SUCCESS,
} from 'actions/gifs';

const initialState = Map({
  loading: false,
  error: null,
  gifs: null,
  favorites: null,
  pagination: null,
});

const actionsMap = {
  // Async action
  [GET_DISCOVER_START]: (state) => {
    return state.merge(Map({
      loading: true,
      error: null,
      gifs: null,
    }));
  },
  [GET_DISCOVER_ERROR]: (state, action) => {
    return state.merge(Map({
      loading: false,
      gifs: action.error.message,
    }));
  },
  [GET_DISCOVER_SUCCESS]: (state, action) => {
    return state.merge(Map({
      loading: false,
      gifs: action.data.data,
      pagination: action.data.pagination,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
