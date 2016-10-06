import {ajax} from './constants';


module.exports = {
    login(authenticationCredentials) {
        console.log('auth module - login() called');
        return ajax.post("/api/auth/signin", { userName: authenticationCredentials.email, password: authenticationCredentials.password } ).then(resp => resp.data);
    },

    logout() {
        console.log('auth module - logout() called');
        return ajax.post("/api/auth/signout").then(resp => resp.data);
    },

    getLoggedInUser() {
        console.log('auth module - getLoggedInUser() called');
        return ajax.get("/api/auth/authenticateduser").then(resp => resp.data);
    }
}