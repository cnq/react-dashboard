import axios from 'axios'
import firebase from 'firebase/firebase-browser'
import {
    apiKey,
    authDomain,
    databaseURL,
    storageBucket,
    apiBaseUrl
} from '../../config.js'

// Paperhook Config Data
export const ajax = axios.create({
    baseURL: apiBaseUrl,
    timeout: 6000,
    withCredentials: true
})

// Firebase Config Data
const config = {
    apiKey: apiKey,
    authDomain: authDomain,
    databaseURL: databaseURL,
    storageBucket: storageBucket
};

// Initialize Firebase

export const fireApp = firebase.initializeApp(config);
export const fireDb = fireApp.database();
export const fireAuth = fireApp.auth();

export const usersAppsExpirationLength = 100000
export const userExpirationLength = 100000

export const FACEBOOK= 'facebook.com'
export const GOOGLE= 'google.com'
export const GITHUB = 'github.com'
export const TWITTER = 'twitter.com'
export const EMAIL = 'email'