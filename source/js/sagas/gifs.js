import { takeLatest, call, put } from 'redux-saga/effects';

import {
  GET_DISCOVER_START,
  GET_DISCOVER_ERROR,
  GET_DISCOVER_SUCCESS,
} from 'actions/gifs';
import api from 'api';

function getTrending(isServer = false) {
  return function* (options) { // eslint-disable-line consistent-return
    try {
      const data = yield call(() => api.getTrending());
      const action = { type: GET_DISCOVER_SUCCESS, data };

      if (isServer) {
        return action;
      }

      yield put(action);
    } catch (error) {
      const action = { type: GET_DISCOVER_ERROR, error };

      if (isServer) {
        return action;
      }

      yield put(action);
    }
  };
}

export const getGifs = getTrending();
export const getGifsServer = getTrending(true);


export function* getGifsWatcher() {
  yield takeLatest(GET_DISCOVER_START, getGifs);
}


export default [
  getGifsWatcher(),
];
