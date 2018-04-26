import { Map } from 'immutable';

import {
  GET_DISCOVER_START,
  GET_DISCOVER_ERROR,
  GET_DISCOVER_SUCCESS,
  DISMISS_FAVORITE,
} from 'actions/gifs';
import { DISMISS_GIF, FAVORITE_GIF } from '../actions/gifs';

const initialState = Map({
  loading: false,
  error: null,
  gifs: null,
  favorites: [],
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
  [DISMISS_GIF]: (state, action) => {
    const gifsTemp = state.get('gifs').slice();
    const gifIndex = gifsTemp.findIndex((gif) => gif.id === action.gif.id);
    if (gifIndex >= 0) {
      gifsTemp.splice(gifIndex, 1);
    }
    return state.merge(Map({
      gifs: gifsTemp,
    }));
  },
  [DISMISS_FAVORITE]: (state, action) => {
    const favoritesTemp = state.get('favorites').slice();
    const gifIndex = favoritesTemp.findIndex((gif) => gif.id === action.gif.id);
    if (gifIndex >= 0) {
      favoritesTemp.splice(gifIndex, 1);
    }
    return state.merge(Map({
      favorites: favoritesTemp,
    }));
  },
  [FAVORITE_GIF]: (state, action) => {
    const favorites = [...state.get('favorites'), action.gif];
    const gifsTemp = state.get('gifs').slice();
    const gifIndex = gifsTemp.findIndex((gif) => gif.id === action.gif.id);
    gifsTemp.splice(gifIndex, 1);
    return state.merge(Map({
      gifs: gifsTemp,
      favorites,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
