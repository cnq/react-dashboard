import Rx from 'rxjs/Rx';
import api from '../api'
import { appActions } from 'actions'


// app create

export const initializeAppCreateEpic = action$ =>
    action$.ofType(appActions.APP_CREATE_INITILIZE)
      .map(action => { 
          return appActions.appCreateStart();
      });

export const startAppCreateEpic = action$ =>
    action$.ofType(appActions.APP_CREATE_START)
      .map(action => { 
          return appActions.appCreateRequest();
      });

export const appCreateRequestEpic = (action$, store) =>
    action$.ofType(appActions.APP_CREATE_REQUEST)
      .mergeMap((action) =>
          Rx.Observable.create(obs => {
              api.createApp({backendSiteUri: store.getState().addApp.backendSiteUri})
                .then(resp => {
                    const newApp = resp
                    obs.next(appActions.appCreateSuccess(newApp))
                    obs.complete()
                })
                .catch(err => {
                    const errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message: err.message
                    obs.next(appActions.appCreateFail('Failed to create app: ' + errorMessage))
                    obs.complete()
                });
          }));



// app delete

export const initializeAppDeleteEpic = action$ =>
    action$.ofType(appActions.APP_DELETE_INITILIZE)
      .map(action => { 
          return appActions.appDeleteStart(action.app)
      });

export const startAppDeleteEpic = action$ =>
    action$.ofType(appActions.APP_DELETE_START)
      .map(action => { 
          return appActions.appDeleteRequest()
      });

export const appDeleteRequestEpic = (action$, store) =>
    action$.ofType(appActions.APP_DELETE_REQUEST)
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.deleteApp(store.getState().deleteApp.app)
                .then(resp => {
                    obs.next(appActions.appDeleteSuccess(store.getState().deleteApp.app))
                    obs.complete()
                })
                .catch(err => {
                    const errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message: err.message
                    obs.next(appActions.appDeleteFail(store.getState().deleteApp.app, 'Failed to delete app : ' + errorMessage))
                    obs.complete()
                });
          }));