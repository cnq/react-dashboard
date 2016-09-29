﻿import axios from 'axios';


const ajax = axios.create({
    baseURL: 'http://tailspin.demo.ncnq.io',
    timeout: 6000,
    withCredentials: true
})

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

    createConnection(appId, connection) {
        console.log('api module - createConnection() called');
        return ajax.post(`/api/apps/${appId}/routes`,connection).then(resp => resp.data);
    },

    deleteConnection(appId, connection) {
        console.log('api module - deleteConnection() called');
        return ajax.delete(`/api/apps/${appId}/routes/${connectionId}`).then(resp => resp.data);
    }
}