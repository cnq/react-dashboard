﻿import {ajax} from './constants';


module.exports = {
    getApps() {
        console.log('api module - getApps() called');
        return ajax.get('/api/apps').then(resp => resp.data);
    },

    createApp(app) {
        console.log('api module - createApp() called');
        return ajax.post('/api/apps',app).then(resp => resp.data);
    },

    deleteApp(app) {
        console.log('api module - deleteApp() called');
        return ajax.delete(`/api/apps/${app.appId}`).then(resp => resp.data);
    },

    getConnections(appId) {
        console.log('api module - getConnections() called');
        return ajax.get(`/api/apps/${appId}/routes`).then(resp => resp.data);
    },

    createConnection(connection) {
        console.log('api module - createConnection() called');
        return ajax.post(`/api/apps/${connection.appId}/routes`,connection).then(resp => resp.data);
    },

    deleteConnection(connection) {
        console.log('api module - deleteConnection() called');
        return ajax.delete(`/api/apps/${connection.appId}/routes/${connection.connectionId}`).then(resp => resp.data);
    },

    getUsers() {
        console.log('api module - getUsers() called');
        return ajax.get('/api/users').then(resp => resp.data);
    },

    createUser(user) {
        console.log('api module - createUser() called');
        return ajax.post('/api/users',user).then(resp => resp.data);
    },

    deleteUser(user) {
        console.log('api module - deleteUser() called');
        return ajax.delete(`/api/users/${user.userId}`).then(resp => resp.data);
    }
}