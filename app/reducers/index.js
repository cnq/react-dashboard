import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import SigninReducer from './SigninReducer';
import AppListReducer from './AppListReducer';
import { addApp, deleteApp } from './AppReducer';
import ConnectionListReducer from './ConnectionListReducer';
import { addConnection, deleteConnection } from './ConnectionReducer';
import ConnectionStepperReducer from './ConnectionStepperReducer';
//export <TYPE> from './PATH-TO-REDUCER-WITHOUT-EXTENSION';

const combinedReducer = combineReducers({
    signin: SigninReducer,
    applist: AppListReducer,
    addApp: addApp,
    deleteApp: deleteApp,
    connectionList: ConnectionListReducer,
    addConnection: addConnection,
    deleteConnection: deleteConnection,
    connectionStepper: ConnectionStepperReducer,
    //LIST OF IMPORTED REDUCERS (FORMAT: actionname: ReducerName)
    form,
    routing: routerReducer
});

export default combinedReducer;
