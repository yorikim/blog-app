import { combineReducers } from 'redux';
import posts from './posts';
import users from './users';
import tokens from './tokens';

export default function () {
  return combineReducers({
    posts,
    users,
    tokens,
  });
}
