import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import SigninReducer from './SigninReducer';
import SignoutReducer from './SignoutReducer';
import AppListReducer from './AppListReducer';
import { addApp, deleteApp } from './AppReducer';
import { addConnection, deleteConnection } from './ConnectionReducer';
import ConnectionStepperReducer from './ConnectionStepperReducer';
//export <TYPE> from './PATH-TO-REDUCER-WITHOUT-EXTENSION';



export default combineReducers({
    signin: SigninReducer,
    signout: SignoutReducer,
    applist: AppListReducer,
    addApp: addApp,
    deleteApp: deleteApp,
    addConnection: addConnection,
    deleteConnection: deleteConnection,
    connectionStepper: ConnectionStepperReducer,
    //LIST OF IMPORTED REDUCERS (FORMAT: actionname: ReducerName)
    form,
    routing: routerReducer
});



export const getApp = (state, appId) => {
    return state.applist.apps.find(app => app.appId == appId);
}
export const getConnections = (state, appId) => {
    const app = getApp(state, appId);
    if(app) return app.connections
    return [];
}
export const getConnection = (state, appId, connectionId) => {
    return getConnections(state, appId).find(connection => connection.connectionId == connectionId);
}
