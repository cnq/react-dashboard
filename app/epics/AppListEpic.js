import Rx from 'rxjs/Rx';
import api from '../api'
import { applist, signin as signinActions } from 'actions'


export const loadAppListOnCheckSigninSuccessfulEpic = (action$, store) =>
    action$.ofType(signinActions.CHECK_SIGNIN_SUCCESS)
      .map(action => { 
          return applist.appListFetchStart()
      });

export const initializeAppListEpic = (action$, store) =>
    action$.ofType(applist.APPLIST_INITILIZE)
      // only catch APPLIST_INITILIZE actions if the user is signed in
      .filter(() => { 
          return store.getState().signin.isAuthenticated; 
      })
      .map(action => { 
          return applist.appListFetchStart()
      });

export const startAppListFetchEpic = action$ =>
    action$.ofType(applist.APPLIST_FETCH_START)
      .map(action => { 
          return applist.appListFetchRequest()
      });

export const appListFetchEpic = action$ =>
    action$.ofType(applist.APPLIST_FETCH_REQUEST)
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.getApps()
                .then(resp => {
                    const appArray = Object.keys(resp).map(function(key) { return resp[key] });
                    obs.next(applist.appListFetchSuccess(appArray));
                    obs.complete();
                })
                .catch(err => {
                    const errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message: err.message
                    obs.next(applist.appListFetchFail(errorMessage));
                    obs.complete();
                });
          }));

export const appListRefreshEpic = action$ =>
    action$.ofType(applist.APPLIST_REFRESH_REQUEST)
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.getApps()
                .then(resp => {
                    const appArray = Object.keys(resp).map(function(key) { return resp[key] });
                    obs.next(applist.appListRefreshSuccess(appArray));
                    obs.complete();
                })
                .catch(err => {
                    const errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message: err.message
                    obs.next(applist.appListRefreshFail(errorMessage));
                    obs.complete();
                });
          }));

export const appListRefreshStartConstantEpic = action$ =>
    action$.ofType(applist.APPLIST_REFRESH_START_CONSTANT)
      .delay(5000)
      .map(action => { 
          return applist.appListRefreshRequest()
      });

export const appListRefreshSuccessEpic = (action$, store) =>
    action$.ofType(applist.APPLIST_REFRESH_SUCCESS)
      .filter(() => { 
          return store.getState().applist.constantFetch; 
      })
      .delay(5000)
      .map(action => { 
          return applist.appListRefreshRequest()
      });