import axios from 'axios';


const ajax = axios.create({
    baseURL: 'http://tailspin.demo.ncnq.io',
    timeout: 6000,
    withCredentials: true
})

module.exports = {
    getApps() {
        console.log('api module - getApps() called');
        return ajax.get('/api/apps').then(resp => resp.data);
    }
}