import { all } from 'redux-saga/effects';

import gifSagas from 'sagas/gifs';

export default function* rootSaga() {
  yield all([
    ...gifSagas,
  ]);
}
