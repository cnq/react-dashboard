import Rx from 'rxjs/Rx';
import api from '../api'


export const initializeAppListEpic = action$ =>
    action$.ofType('APPLIST_INITILIZE')
      .map(action => { 
          return { type: 'APPLIST_FETCH_START', isFetching: false, error: '', appIds: {} }
      });

export const startAppListFetchEpic = action$ =>
    action$.ofType('APPLIST_FETCH_START')
      .map(action => { 
          return { type: 'APPLIST_FETCH_REQUEST', isFetching: true, error: action.error, appIds: action.appIds }
      });

export const appListFetchEpic = action$ =>
    action$.ofType('APPLIST_FETCH_REQUEST')
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.getApps()
                .then(resp => {
                    obs.next({ type: 'APPLIST_FETCH_SUCCESS', isFetching: false, error: '', appIds: {} });
                    obs.complete();
                })
                .catch(err => {
                    obs.next({ type: 'APPLIST_FETCH_FAIL', isFetching: false, error: 'Failed to fetch apps', appIds: action.appIds});
                    obs.complete();
                });
          }));

