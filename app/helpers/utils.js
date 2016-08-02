import {
    usersAppsExpirationLength,
    userExpirationLength,
    repliesExpirationLength,
    FACEBOOK,
    GOOGLE,
    GITHUB,
    TWITTER,
    EMAIL
} from 'config/constants'

export function formatUserData (name, avatar, uid) {
    return {
        name,
        avatar,
        uid
    }
}

export function formatApp (text, {name, avatar, uid}) {
    return {
        text,
        name,
        avatar,
        uid,
        timestamp: Date.now()
    }
}

export function formatAuthData (authData = {provider: null, accessToken: null, idToken: null, secret: null, email: null, password: null}) {
    return {
        credential: {
            provider: authData.provider,
            accessToken: authData.accessToken,
            idToken: authData.idToken,
            secret: authData.secret,
            email: authData.email ? authData.email.value : null, // passed in as object from redux-form. grabbing value
            password: authData.password ? authData.password.value : null, // passed in as object from redux-form. grabbing value
            timestamp: Date.now()
        }
    }
}

export function formatTimestamp (timestamp) {
    const date = new Date(timestamp)
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

function getMilliseconds(timestamp) {
    return new Date().getTime() - new Date(timestamp).getTime()
}

export function staleUser (timestamp) {
    return getMilliseconds(timestamp) > userExpirationLength;
}

export function staleApps (timestamp) {
    return getMilliseconds(timestamp) > usersAppsExpirationLength
}

export function getProviderInfo (authProvider) {
    switch (authProvider) {
        case FACEBOOK:
            return {
                name: 'facebook',
                icon: 'facebook',
                color: '#3b5999'
            }
        case GOOGLE:
            return {
                name: 'google',
                icon: 'google',
                color: '#dd4b39'
            }
        case GITHUB:
            return {
                name: 'github',
                icon: 'github',
                color: '#000000'
            }
        case TWITTER:
            return {
                name: 'twitter',
                icon: 'twitter',
                color: '#00aced'
            }
        case EMAIL:
            return {
                name: 'email',
                icon: 'email',
                color: '#444444'
            }
        default:
            return null
    }
}