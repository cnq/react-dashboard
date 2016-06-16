import { fireDb } from 'config/constants'

function saveToApps (app) {
    const appId = fireDb.ref().child('apps').push().key
    const appPromise = fireDb.ref().child(`apps/${appId}`).set({...app, appId})

    return {
        appId,
        appPromise
    }

}

function saveToUsersApps (app, appId) {
    return fireDb.ref().child(`usersApps/${app.uid}/${appId}`)
        .set({...app, appId})
}

export function saveApp (app) {

    const { appId, appPromise } = saveToApps(app)

    return Promise.all([
        appPromise,
        saveToUsersApps(app, appId)
    ]).then(() => ({...app, appId}))

}

export function listenToFeed (callback, errorCallback) {

    fireDb.ref().child('apps').on('value', (snapshot) => {

        const feed = snapshot.val() || {}

        const sortedIds = Object.keys(feed).sort((a,b) => {
            return feed[b].timestamp - feed[a].timestamp
        })

        callback({feed, sortedIds})
    }, errorCallback)

}

export function fetchUser (uid) {
    return fireDb.ref().child(`users/${uid}`).once('value')
        .then((snapshot) => (
            snapshot.val()
        ))
}

export function fetchUsersApps (uid) {
    return fireDb.ref().child(`usersApps/${uid}`).once('value')
        .then((snapshot) => (
            snapshot.val() || {}
        ))
}

export function fetchApp (appId) {
    return fireDb.ref().child(`apps/${appId}`).once('value')
        .then((snapshot) => (
            snapshot.val()
        ))
}