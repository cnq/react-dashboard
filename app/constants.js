import axios from 'axios';

export const ajax = axios.create({
    baseURL: '',
    timeout: 300000,
    withCredentials: true
})