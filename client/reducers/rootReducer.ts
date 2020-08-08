import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import streamReducer from './streamReducer';

export = combineReducers({
  player: playerReducer,
  stream: streamReducer,
});
