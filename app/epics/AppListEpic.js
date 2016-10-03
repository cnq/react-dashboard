import Rx from 'rxjs/Rx';
import api from '../api'


export const initializeAppListEpic = (action$,store) =>
    action$.ofType('APPLIST_INITILIZE')
      .filter(() => {
          return store.getState().signin.isAuthenticated;
      })
      .map(action => { 
          return { type: 'APPLIST_FETCH_START', isFetching: false, error: '', apps: action.apps }
      });

export const startAppListFetchEpic = action$ =>
    action$.ofType('APPLIST_FETCH_START')
      .map(action => { 
          return { type: 'APPLIST_FETCH_REQUEST', isFetching: true, error: action.error, apps: action.apps }
      });

export const appListFetchEpic = action$ =>
    action$.ofType('APPLIST_FETCH_REQUEST')
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.getApps()
                .then(resp => {
                    const appArray = Object.keys(resp).map(function(key) { return resp[key] });
                    obs.next({ type: 'APPLIST_FETCH_SUCCESS', isFetching: false, error: '', apps: appArray });
                    obs.complete();
                })
                .catch(err => {
                    obs.next({ type: 'APPLIST_FETCH_FAIL', isFetching: false, error: 'Failed to fetch apps', apps: action.apps});
                    obs.complete();
                });
          }));

