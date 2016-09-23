import {combineReducers} from 'redux';
import { reducer as form } from 'redux-form';
import {routerReducer} from 'react-router-redux';
import UsersReducer from './UsersReducer';
import SigninReducer from './SigninReducer';
//export <TYPE> from './PATH-TO-REDUCER-WITHOUT-EXTENSION';

const combinedReducer = combineReducers({
    users: UsersReducer,
    signin: SigninReducer,
    //LIST OF IMPORTED REDUCERS (FORMAT: actionname: ReducerName)
    form,
    routing: routerReducer
});

export default combinedReducer;
