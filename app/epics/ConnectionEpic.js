import Rx from 'rxjs/Rx';
import api from '../api'


// connection create

export const initializeConnectionCreateEpic = action$ =>
    action$.ofType('CONNECTION_CREATE_INITILIZE')
      .map(action => { 
          return { type: 'CONNECTION_CREATE_START', connection: action.connection}
      });

export const startConnectionCreateEpic = action$ =>
    action$.ofType('CONNECTION_CREATE_START')
      .map(action => { 
          return { type: 'CONNECTION_CREATE_REQUEST', connection: action.connection }
      });


export const connectionCreateRequestEpic = action$ =>
    action$.ofType('CONNECTION_CREATE_REQUEST')
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.createConnection(action.connection)
                .then(resp => {
                    const newConnection = resp
                    obs.next({ type: 'CONNECTION_CREATE_SUCCESS', connection: newConnection})
                    obs.complete();
                })
                .catch(err => {
                    obs.next({ type: 'CONNECTION_CREATE_FAIL', error: 'Failed to create connection' , connection: action.connection});
                    obs.complete();
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

export const connectionDeleteRequestEpic = action$ =>
    action$.ofType('CONNECTION_DELETE_REQUEST')
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.deleteConnection(action.connection)
                .then(resp => {
                    obs.next({ type: 'CONNECTION_DELETE_SUCCESS', connection: action.connection })
                })
                .catch(err => {
                    obs.next({ type: 'CONNECTION_DELETE_FAIL', error: 'Failed to delete connection'});
                });
          }));


