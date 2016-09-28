import Rx from 'rxjs/Rx';
import api from '../api'


// app create

export const initializeAppCreateEpic = action$ =>
    action$.ofType('APP_CREATE_INITILIZE')
      .map(action => { 
          return { type: 'APP_CREATE_START', backendSiteUri: action.backendSiteUri }
      });

export const startAppCreateEpic = action$ =>
    action$.ofType('APP_CREATE_START')
      .map(action => { 
          return { type: 'APP_CREATE_REQUEST', backendSiteUri: action.backendSiteUri }
      });

export const startAppListAddAppEpic = action$ =>
    action$.ofType('APP_CREATE_START')
      .map(action => { 
          return { type: 'APPLIST_APP_CREATE_START' }
      });

export const appCreateRequestEpic = action$ =>
    action$.ofType('APP_CREATE_REQUEST')
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.createApp({backendSiteUri: action.backendSiteUri})
                .then(resp => {
                    const newApp = resp
                    obs.next({ type: 'APP_CREATE_SUCCESS' })
                    obs.next({ type: 'APPLIST_APP_CREATE_SUCCESS', app: newApp });
                })
                .catch(err => {
                    obs.next({ type: 'APP_CREATE_FAIL', error: 'Failed to create app'});
                    obs.next({ type: 'APPLIST_APP_CREATE_FAIL' });
                });
          }));



// app delete


export const initializeAppDeleteEpic = action$ =>
    action$.ofType('APP_DELETE_INITILIZE')
      .map(action => { 
          return { type: 'APP_DELETE_START', app: action.app }
      });

export const startAppDeleteEpic = action$ =>
    action$.ofType('APP_DELETE_START')
      .map(action => { 
          return { type: 'APP_DELETE_REQUEST', app: action.app  }
      });

export const startAppListCreateAppEpic = action$ =>
    action$.ofType('APP_DELETE_START')
      .map(action => { 
          return { type: 'APPLIST_APP_DELETE_START' }
      });

export const appDeleteRequestEpic = action$ =>
    action$.ofType('APP_DELETE_REQUEST')
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.deleteApp(action.app)
                .then(resp => {
                    obs.next({ type: 'APP_DELETE_SUCCESS' })
                    obs.next({ type: 'APPLIST_APP_DELETE_SUCCESS', app: action.app });
                })
                .catch(err => {
                    obs.next({ type: 'APP_DELETE_FAIL', error: 'Failed to delete app'});
                    obs.next({ type: 'APPLIST_APP_DELETE_FAIL' });
                });
          }));


