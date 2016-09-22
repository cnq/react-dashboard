//STORE SETUP AND CONFIGURATION
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

const configureStore = (history, reducer, initialState = {}) => {
    const middleware = compose(
      applyMiddleware(thunk),
      applyMiddleware(routerMiddleware(history))
    );
    return createStore(reducer, initialState, middleware);
};

export default configureStore;