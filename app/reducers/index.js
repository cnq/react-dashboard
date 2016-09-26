import {combineReducers} from 'redux';
import { reducer as form } from 'redux-form';
import {routerReducer} from 'react-router-redux';
import SigninReducer from './SigninReducer';
import AppListReducer from './AppListReducer';
//export <TYPE> from './PATH-TO-REDUCER-WITHOUT-EXTENSION';

const combinedReducer = combineReducers({
    signin: SigninReducer,
    applist: AppListReducer,
    //LIST OF IMPORTED REDUCERS (FORMAT: actionname: ReducerName)
    form,
    routing: routerReducer
});

export default combinedReducer;
