import {ajax} from './constants';


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

    updateUser(user) {
        console.log('api module - updateUser() called');
        return ajax.put(`/api/users/${user.userId}`, user).then(resp => resp.data);
    },

    activateUser(activationCode) {
        console.log('api module - activateUser() called');
        return ajax.get(`/api/users/activate?code=${activationCode}`).then(resp => resp.data);
    },

    setupUser(userSetup) {
        console.log('api module - setupUser() called');
        return ajax.post('/api/users/setup',userSetup).then(resp => resp.data);
    },

    deleteUser(user) {
        console.log('api module - deleteUser() called');
        return ajax.delete(`/api/users/${user.userId}`).then(resp => resp.data);
    },

    userChangePassword(details) {
        console.log('api module - userChangePassword() called');
        return ajax.put(`/api/users/changepassword/${details.user.userId}`, details).then(resp => resp.data);
    },

    userResetPassword(user) {
        console.log('api module - userResetPassword() called');
        return ajax.post(`/api/users/resetpassword`, user).then(resp => resp.data);
    },

    getSubscription() {
        console.log('api module - getSubscription() called');
        return ajax.get(`/api/subscription`).then(resp => resp.data);
    },

    getSubscriptionManagementLink() {
        console.log('api module - getSubscriptionManagementLink() called');
        return ajax.get(`/api/subscription/managementurl`).then(resp => resp.data);
    },

    updateSubscription(subscription) {
        console.log('api module - updateSubscrition() called');
        return ajax.post(`/api/subscription/${subscription.subscriptionId}`, subscription).then(resp => resp.data);
    }
}