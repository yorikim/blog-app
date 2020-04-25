import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import createReducers from '../reducers';

const configureStore = (initialState = {}) => {
  const middlewares = [
    thunk,
    // process.env.NODE_ENV !== 'production' && logger,
  ].filter(Boolean)

  const enhancer = compose(applyMiddleware(...middlewares));
  return createStore(createReducers(), initialState, enhancer);
}

export default configureStore();
