import axios from 'axios';
import { fireDb } from 'config/constants'

function saveToApps (app) {
    //Firebase
    const appId = fireDb.ref().child('apps').push().key
    const appPromise = fireDb.ref().child(`apps/${appId}`).set({...app, appId})

    return {
        appId,
        appPromise
    }
}

function saveToUsersApps (app, appId) {
    //Firebase
    return fireDb.ref().child(`usersApps/${app.uid}/${appId}`)
        .set({...app, appId})
}


export function saveApp (app) {

    console.debug("saveApp...")

    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        const { appId, appPromise } = saveToApps(app)

        return Promise.all([
            appPromise,
            saveToUsersApps(app, appId)
        ]).then(() => ({...app, appId}))
    } else {
        //Paperhook
        return axios({
            method: 'post',
            url: '/api/apps',
            data: {
                backendSiteUri: app.text
            },
            timeout: 60000
        }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            errorCallback();
        })
    }

}

export function deleteApp (appId) {

    console.debug("deleteApp...")

    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        console.log('useFirebase')
    } else {
        return axios({
            method: 'delete',
            url: `/api/apps/${appId}`,
            timeout: 60000
        }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            errorCallback();
        })
    }

}

export function listenToFeed (callback, errorCallback) {

    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        fireDb.ref().child('apps').on('value', (snapshot) => {

            const feed = snapshot.val() || {}

            const sortedIds = Object.keys(feed).sort((a,b) => {
                return feed[b].timestamp - feed[a].timestamp
            })

            callback({feed, sortedIds})
        }, errorCallback)
    } else {
        //Paperhook
        return axios.get("/api/apps").then(function (response) {
            const feed = response.data || {}
            const sortedIds = Object.keys(feed).sort((a, b) => {
                return feed[b].timestamp - feed[a].timestamp
            })
            callback({feed, sortedIds});
        }).catch(function (response) {
            errorCallback();
        })
    }

}

export function fetchUser (uid) {
    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        return fireDb.ref().child(`users/${uid}`).once('value')
            .then((snapshot) => (
                snapshot.val()
            ))
    } else {
        //Paperhook
        return axios.get("/api/auth/authenticateduser").then(function (response) {
            return response.data;
        })
    }
}

export function fetchUsersApps (uid) {
    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        return fireDb.ref().child(`usersApps/${uid}`).once('value')
            .then((snapshot) => (
                snapshot.val() || {}
            ))
    } else {
        //Paperhook
        console.debug("fetchUsersApps...")
    }

}

export function fetchApp (appId) {

    console.debug("fetchApp...")

    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        return fireDb.ref().child(`apps/${appId}`).once('value')
            .then((snapshot) => (
                snapshot.val()
            ))
    } else {
        //Paperhook
        return axios.get(`/api/apps/${appId}`).then(function (response) {
            return response.data;
        })
    }

}