//STORE SETUP AND CONFIGURATION
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';


const configureStore = (history, reducers, epics, initialState = {}) => {
    const middleware = compose(
      applyMiddleware(thunk),
      applyMiddleware(routerMiddleware(history)),
      applyMiddleware(createEpicMiddleware(epics))
    );
    const store = createStore(reducers, initialState, middleware);
    return store;
};




export default configureStore;