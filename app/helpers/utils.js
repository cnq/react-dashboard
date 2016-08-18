import {
    usersAppsExpirationLength,
    userExpirationLength,
    appExpirationLength,
    appsConnectionsExpirationLength,
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

export function formatApp (backendSiteUri, uri, {name, avatar, uid}) {
    return {
        backendSiteUri,
        uri,
        name,
        avatar,
        uid,
        timestamp: Date.now()
    }
}

export function formatConnection (connectionUri, connectionType, connectionName, appId, backendSiteUri) {
    return {
        connectionUri,
        connectionType,
        connectionName,
        appId,
        backendSiteUri,
        timestamp: Date.now()
    }
}


export function formatAuthData (provider = undefined, email = undefined, password = undefined, accessToken = undefined, idToken =undefined, secret = undefined) {
    return {
        credential: {
            provider,
            email,
            password,
            accessToken,
            idToken,
            secret,
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
    return getMilliseconds(timestamp) > userExpirationLength
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
                icon: 'envelope-o',
                color: '#444444'
            }
        default:
            return null
    }
}

//TODO: Build this into the cnq call and firebase call
export function asyncValidate (values) {

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    return sleep(1000) // simulate server latency
        .then(() => {
            if ([ 'foo@foo.com', 'bar@bar.com' ].includes(values.email)) {
                throw { email: 'Email already Exists' }
            }
        })
}

export function getUri (uri) {
    return `${(uri.split('.').join(''))}.tailspin.paperhook.com`
}