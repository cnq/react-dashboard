import {combineReducers} from 'redux';
import { reducer as form } from 'redux-form';
import {routerReducer} from 'react-router-redux';
import SigninReducer from './SigninReducer';
import AppListReducer from './AppListReducer';
import {addApp} from './AppReducer';
//export <TYPE> from './PATH-TO-REDUCER-WITHOUT-EXTENSION';

const combinedReducer = combineReducers({
    signin: SigninReducer,
    applist: AppListReducer,
    addApp: addApp,
    //LIST OF IMPORTED REDUCERS (FORMAT: actionname: ReducerName)
    form,
    routing: routerReducer
});

export default combinedReducer;
