import { combineReducers } from 'redux';
import app from 'reducers/app';
import gifs from 'reducers/gifs';

export default combineReducers({
  app,
  gifs,
});
