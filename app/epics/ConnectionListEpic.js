import Rx from 'rxjs/Rx';
import api from '../api'


export const initializeConnectionListEpic = action$ =>
    action$.ofType('CONNECTIONLIST_INITILIZE')
      .map(action => { 
          return { type: 'CONNECTIONLIST_FETCH_START', isFetching: false, error: '', appId: action.appId }
      });

export const startConnectionListFetchEpic = action$ =>
    action$.ofType('CONNECTIONLIST_FETCH_START')
      .map(action => { 
          return { type: 'CONNECTIONLIST_FETCH_REQUEST', isFetching: true, error: action.error, appId: action.appId }
      });

export const connectionListFetchEpic = action$ =>
    action$.ofType('CONNECTIONLIST_FETCH_REQUEST')
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.getConnections(action.appId)
                .then(resp => {
                    const connectionArray = Object.keys(resp).map(function(key) { return resp[key] });
                    obs.next({ type: 'CONNECTIONLIST_FETCH_SUCCESS', isFetching: false, error: '', connections: connectionArray });
                    obs.complete();
                })
                .catch(err => {
                    obs.next({ type: 'CONNECTIONLIST_FETCH_FAIL', isFetching: false, error: 'Failed to fetch connections', connections: action.connections});
                    obs.complete();
                });
          }));

