import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
//import <TYPE> from './PATH-TO-REDUCER-WITHOUT-EXTENSION';

const combinedReducer = combineReducers({
    routing: routerReducer
    //LIST OF IMPORTED REDUCERS
});

export default combinedReducer;
