//STORE SETUP AND CONFIGURATION
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { watchForAuthenticateUser } from '../sagas'


const sagaMiddleware = createSagaMiddleware()

const configureStore = (history, reducer, initialState = {}) => {
    const middleware = compose(
      applyMiddleware(thunk),
      applyMiddleware(routerMiddleware(history)),
      applyMiddleware(sagaMiddleware)
    );
    const store = createStore(reducer, initialState, middleware);
    sagaMiddleware.run(watchForAuthenticateUser);
    return store;
};




export default configureStore;