import axios from 'axios';

export const ajax = axios.create({
    baseURL: 'http://tailspin.demo.ncnq.io',
    timeout: 300000,
    withCredentials: true
})