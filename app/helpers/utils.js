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

export function formatAuthData (provider = null, accessToken = null, idToken = null, secret = null, password = null) {
    return {
        credential: {
            provider,
            accessToken,
            idToken,
            secret,
            password,
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