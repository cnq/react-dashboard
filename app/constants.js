import axios from 'axios';

export const SUBSCRIPTION_PLAN_LEVEL1 = {name: 'basic'}
export const SUBSCRIPTION_PLAN_LEVEL2 = {name: 'professional'}

export const ajax = axios.create({
    baseURL: '',
    timeout: 300000,
    withCredentials: true
})