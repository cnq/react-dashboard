import Rx from 'rxjs/Rx';
import api from '../api'


// connection create

export const initializeConnectionCreateEpic = action$ =>
    action$.ofType('CONNECTION_CREATE_INITILIZE')
      .map(action => { 
          return { type: 'CONNECTION_CREATE_START', backendSiteUri: action.backendSiteUri }
      });

export const startConnectionCreateEpic = action$ =>
    action$.ofType('CONNECTION_CREATE_START')
      .map(action => { 
          return { type: 'CONNECTION_CREATE_REQUEST', backendSiteUri: action.backendSiteUri }
      });

export const startConnectionListAddConnectionEpic = action$ =>
    action$.ofType('CONNECTION_CREATE_START')
      .map(action => { 
          return { type: 'CONNECTIONLIST_CONNECTION_CREATE_START' }
      });

export const connectionCreateRequestEpic = action$ =>
    action$.ofType('CONNECTION_CREATE_REQUEST')
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.createConnection({backendSiteUri: action.backendSiteUri})
                .then(resp => {
                    const newConnection = resp
                    obs.next({ type: 'CONNECTION_CREATE_SUCCESS' })
                    obs.next({ type: 'CONNECTIONLIST_CONNECTION_CREATE_SUCCESS', connection: newConnection });
                })
                .catch(err => {
                    obs.next({ type: 'CONNECTION_CREATE_FAIL', error: 'Failed to create connection'});
                    obs.next({ type: 'CONNECTIONLIST_CONNECTION_CREATE_FAIL' });
                });
          }));



// connection delete


export const initializeConnectionDeleteEpic = action$ =>
    action$.ofType('CONNECTION_DELETE_INITILIZE')
      .map(action => { 
          return { type: 'CONNECTION_DELETE_START', connection: action.connection }
      });

export const startConnectionDeleteEpic = action$ =>
    action$.ofType('CONNECTION_DELETE_START')
      .map(action => { 
          return { type: 'CONNECTION_DELETE_REQUEST', connection: action.connection  }
      });

export const startConnectionListCreateConnectionEpic = action$ =>
    action$.ofType('CONNECTION_DELETE_START')
      .map(action => { 
          return { type: 'CONNECTIONLIST_CONNECTION_DELETE_START' }
      });

export const connectionDeleteRequestEpic = action$ =>
    action$.ofType('CONNECTION_DELETE_REQUEST')
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.deleteConnection(action.connection)
                .then(resp => {
                    obs.next({ type: 'CONNECTION_DELETE_SUCCESS' })
                    obs.next({ type: 'CONNECTIONLIST_CONNECTION_DELETE_SUCCESS', connection: action.connection });
                })
                .catch(err => {
                    obs.next({ type: 'CONNECTION_DELETE_FAIL', error: 'Failed to delete connection'});
                    obs.next({ type: 'CONNECTIONLIST_CONNECTION_DELETE_FAIL' });
                });
          }));


