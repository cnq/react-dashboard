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

export const appListFetchStartConstantEpic = action$ =>
    action$.ofType(applist.APPLIST_FETCH_START_CONSTANT)
      .map(action => { 
          return applist.appListInitialize()
      });

export const appListFetchSuccessEpic = (action$, store) =>
    action$.ofType(applist.APPLIST_FETCH_SUCCESS)
      .filter(() => { 
          return store.getState().applist.constantFetch; 
      })
      .delay(5000)
      .map(action => { 
          return applist.appListFetchRequest()
      });