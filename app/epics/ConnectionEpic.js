import Rx from 'rxjs/Rx';
import api from '../api'
import { connectionActions } from 'actions'


// connection create

export const initializeConnectionCreateEpic = action$ =>
    action$.ofType(connectionActions.CONNECTION_CREATE_INITILIZE)
      .map(action => { 
          return connectionActions.connectionCreateStart(action.connection)
      });

export const startConnectionCreateEpic = action$ =>
    action$.ofType(connectionActions.CONNECTION_CREATE_START)
      .map(action => { 
          return connectionActions.connectionCreateRequest()
      });

export const connectionCreateRequestEpic = (action$, store) =>
    action$.ofType(connectionActions.CONNECTION_CREATE_REQUEST)
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.createConnection(store.getState().addConnection.connection)
                .then(resp => {
                    const newConnection = resp
                    obs.next(connectionActions.connectionCreateSuccess(newConnection))
                    obs.complete()
                })
                .catch(err => {
                    const errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message: err.message
                    obs.next(connectionActions.connectionCreateFail('Failed to create connection : ' + errorMessage));
                    obs.complete()
                });
          }));



// connection delete

export const initializeConnectionDeleteEpic = action$ =>
    action$.ofType(connectionActions.CONNECTION_DELETE_INITILIZE)
      .map(action => { 
          return connectionActions.connectionDeleteStart(action.connection)
      });

export const startConnectionDeleteEpic = action$ =>
    action$.ofType(connectionActions.CONNECTION_DELETE_START)
      .map(action => { 
          return connectionActions.connectionDeleteRequest()
      });

export const connectionDeleteRequestEpic = (action$, store) =>
    action$.ofType(connectionActions.CONNECTION_DELETE_REQUEST)
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.deleteConnection(store.getState().deleteConnection.connection)
                .then(resp => {
                    obs.next(connectionActions.connectionDeleteSuccess(store.getState().deleteConnection.connection))
                    obs.complete()
                })
                .catch(err => {
                    const errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message: err.message
                    obs.next(connectionActions.connectionDeleteFail(store.getState().deleteConnection.connection, 'Failed to delete connection : ' + errorMessage));
                    obs.complete()
                });
          }));


