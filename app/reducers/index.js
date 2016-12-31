import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import SigninReducer from './SigninReducer';
import SignoutReducer from './SignoutReducer';
import AppListReducer from './AppListReducer';
import UserListReducer from './UserListReducer';
import { addUser, activateUser, setupUser, deleteUser, userChangePassword, userResetPassword, userChangeRoles } from './UserReducer';
import { addApp, deleteApp } from './AppReducer';
import { addConnection, deleteConnection } from './ConnectionReducer';
import { fetchSubscription, manageSubscription } from './SubscriptionReducer';
import ConnectionStepperReducer from './ConnectionStepperReducer';
//export <TYPE> from './PATH-TO-REDUCER-WITHOUT-EXTENSION';



export default combineReducers({
    signin: SigninReducer,
    signout: SignoutReducer,
    applist: AppListReducer,
    userlist: UserListReducer,
    addUser: addUser,
    activateUser: activateUser,
    setupUser: setupUser,
    deleteUser: deleteUser,
    userChangePassword: userChangePassword, 
    userResetPassword: userResetPassword, 
    userChangeRoles: userChangeRoles,
    addApp: addApp,
    deleteApp: deleteApp,
    addConnection: addConnection,
    deleteConnection: deleteConnection,
    fetchSubscription: fetchSubscription,
    manageSubscription: manageSubscription,
    connectionStepper: ConnectionStepperReducer,
    //LIST OF IMPORTED REDUCERS (FORMAT: actionname: ReducerName)
    form,
    routing: routerReducer
});


export const fetchComplete = (state) => {
    return state.applist.initialFetchComplete;
}

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
