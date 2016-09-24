import axios from 'axios';


const ajax = axios.create({
    baseURL: 'http://tailspin.demo.ncnq.io',
    timeout: 6000,
    withCredentials: true
})

module.exports = {
    login(authenticationCredentials) {
        console.log('auth module - login() called');
        return ajax.post("/api/auth/signin", { userName: authenticationCredentials.email, password: authenticationCredentials.password } ).then(resp => resp.data);
    },

    logout() {
        console.log('auth module - logout() called');
        return ajax.post("/api/auth/signin");
    },

    getLoggedInUser() {
        console.log('auth module - getLoggedInUser() called');
        return ajax.get("/api/auth/authenticateduser").then(resp => resp.data);
    }
}