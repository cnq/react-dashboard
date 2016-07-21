import axios from 'axios';

// TODO: update all references to this file in the app, export these functions from a common index file in this directory.



export function saveApp (app) {
    
    console.debug("saveApp...")

    return axios({
        method: 'post',
        url: '/api/apps',
        data:  {
            backendSiteUri: app.text
        },
        timeout: 60000
    }).then(function(response) {
        return response.data;
    }).catch(function(response){
        errorCallback();
    })

}

export function deleteApp (appId) {
    
    console.debug("deleteApp...")

    return axios({
            method: 'delete',
            url: `/api/apps/${appId}`,
            timeout: 60000
            }).then(function(response) {
            return response.data;
        }).catch(function(response){
            errorCallback();
        })

}

export function listenToFeed (callback, errorCallback) {

    return axios.get("/api/apps").then(function(response) {
        const feed = response.data || {}
        const sortedIds = Object.keys(feed).sort((a,b) => {
            return feed[b].timestamp - feed[a].timestamp
        })
        callback({feed, sortedIds});
    }).catch(function(response){
        errorCallback();
    })

}

export function fetchUser (uid) {
    return axios.get("/api/auth/authenticateduser").then(function(response) {
        return response.data;
    })
}

export function fetchUsersApps (uid) {
    console.debug("fetchUsersApps...")

}

export function fetchApp (appId) {
    console.debug("fetchApp...")
    return axios.get(`/api/apps/${appId}`).then(function(response) {
        return response.data;
    })
}