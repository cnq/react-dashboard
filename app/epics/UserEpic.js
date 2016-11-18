import Rx from 'rxjs/Rx';
import api from '../api'
import { userActions } from 'actions'


// user create

export const initializeUserCreateEpic = action$ =>
    action$.ofType(userActions.USER_CREATE_INITILIZE)
      .map(action => { 
          return userActions.userCreateStart(action.user)
      });

export const startUserCreateEpic = action$ =>
    action$.ofType(userActions.USER_CREATE_START)
      .map(action => { 
          return userActions.userCreateRequest()
      });

export const userCreateRequestEpic = (action$, store) =>
    action$.ofType(userActions.USER_CREATE_REQUEST)
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.createUser(store.getState().addUser.user)
                .then(resp => {
                    const newUser = resp
                    obs.next(userActions.userCreateSuccess(newUser))
                    obs.complete()
                })
                .catch(err => {
                    const errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message: err.message
                    obs.next(userActions.userCreateFail('Failed to create user : ' + errorMessage));
                    obs.complete()
                });
          }));



// user delete

export const initializeUserDeleteEpic = action$ =>
    action$.ofType(userActions.USER_DELETE_INITILIZE)
      .map(action => { 
          return userActions.userDeleteStart(action.user)
      });

export const startUserDeleteEpic = action$ =>
    action$.ofType(userActions.USER_DELETE_START)
      .map(action => { 
          return userActions.userDeleteRequest()
      });

export const userDeleteRequestEpic = (action$, store) =>
    action$.ofType(userActions.USER_DELETE_REQUEST)
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.deleteUser(store.getState().deleteUser.user)
                .then(resp => {
                    obs.next(userActions.userDeleteSuccess(store.getState().deleteUser.user))
                    obs.complete()
                })
                .catch(err => {
                    const errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message: err.message
                    obs.next(userActions.userDeleteFail(store.getState().deleteUser.user, 'Failed to delete user : ' + errorMessage));
                    obs.complete()
                });
          }));


