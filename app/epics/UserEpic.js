import Rx from 'rxjs/Rx';
import api from '../api'
import { userActions, signin as signinActions } from 'actions'


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


// user activate

export const initializeUserActivateEpic = action$ =>
    action$.ofType(userActions.USER_ACTIVATE_INITILIZE)
      .map(action => { 
          return userActions.userActivateStart(action.code)
      });

export const startUserActivateEpic = action$ =>
    action$.ofType(userActions.USER_ACTIVATE_START)
      .map(action => { 
          return userActions.userActivateRequest(action.code)
      });

export const userActivateRequestEpic = (action$, store) =>
    action$.ofType(userActions.USER_ACTIVATE_REQUEST)
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.activateUser(action.code)
                .then(resp => {
                    const activatedUser = resp
                    obs.next(userActions.userActivateSuccess(activatedUser))
                    obs.complete()
                })
                .catch(err => {
                    const errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message: err.message
                    obs.next(userActions.userActivateFail('Failed to activate your account : ' + errorMessage));
                    obs.complete()
                });
          }));

// user setup

export const initializeUserSetupEpic = action$ =>
    action$.ofType(userActions.USER_SETUP_INITILIZE)
      .map(action => { 
          return userActions.userSetupStart(action.userSetup)
      });

export const startUserSetupEpic = action$ =>
    action$.ofType(userActions.USER_SETUP_START)
      .map(action => { 
          return userActions.userSetupRequest(action.userSetup)
      });

export const userSetupRequestEpic = (action$, store) =>
    action$.ofType(userActions.USER_SETUP_REQUEST)
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.setupUser(action.userSetup)
                .then(resp => {
                    const setupUser = resp
                    obs.next(userActions.userSetupSuccess(setupUser, action.userSetup))
                    obs.complete()
                })
                .catch(err => {
                    const errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message: err.message
                    obs.next(userActions.userSetupFail('Failed to activate your account : ' + errorMessage));
                    obs.complete()
                });
          }));


export const userSetupSuccessEpic = (action$, store) =>
    action$.ofType(userActions.USER_SETUP_SUCCESS)
      .map(action => { 
          return signinActions.signinRequest({email: action.user.email, password: action.userSetup.password})
      });


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


// user change password

export const initializeUserChangePasswordEpic = action$ =>
    action$.ofType(userActions.USER_CHANGEPASSWORD_INITILIZE)
      .map(action => { 
          return userActions.userChangePasswordStart(action.details)
      });

export const startUserChangePasswordEpic = action$ =>
    action$.ofType(userActions.USER_CHANGEPASSWORD_START)
      .map(action => { 
          return userActions.userChangePasswordRequest(action.details)
      });

export const userChangePasswordRequestEpic = (action$, store) =>
    action$.ofType(userActions.USER_CHANGEPASSWORD_REQUEST)
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.userChangePassword(action.details)
                .then(resp => {
                    obs.next(userActions.userChangePasswordSuccess(action.details.user))
                    obs.complete()
                })
                .catch(err => {
                    const errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message: err.message
                    obs.next(userActions.userChangePasswordFail(action.details.user, 'Failed to change your password : ' + errorMessage));
                    obs.complete()
                });
          }));

// user reset password

export const initializeUserResetPasswordEpic = action$ =>
    action$.ofType(userActions.USER_RESETPASSWORD_INITILIZE)
      .map(action => { 
          return userActions.userResetPasswordStart(action.user)
      });

export const startUserResetPasswordEpic = action$ =>
    action$.ofType(userActions.USER_RESETPASSWORD_START)
      .map(action => { 
          return userActions.userResetPasswordRequest(action.user)
      });

export const userResetPasswordRequestEpic = (action$, store) =>
    action$.ofType(userActions.USER_RESETPASSWORD_REQUEST)
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.userResetPassword(action.user)
                .then(resp => {
                    obs.next(userActions.userResetPasswordSuccess(action.user))
                    obs.complete()
                })
                .catch(err => {
                    const errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message: err.message
                    obs.next(userActions.userResetPasswordFail(action.user, 'Failed to reset password : ' + errorMessage));
                    obs.complete()
                });
          }));


// user change roles

export const initializeUserChangeRolesEpic = action$ =>
    action$.ofType(userActions.USER_CHANGEROLES_INITILIZE)
      .map(action => { 
          return userActions.userChangeRolesStart(action.user)
      });

export const startUserChangeRolesEpic = action$ =>
    action$.ofType(userActions.USER_CHANGEROLES_START)
      .map(action => { 
          return userActions.userChangeRolesRequest(action.user)
      });

export const userChangeRolesRequestEpic = (action$, store) =>
    action$.ofType(userActions.USER_CHANGEROLES_REQUEST)
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.updateUser(action.user)
                .then(resp => {
                    obs.next(userActions.userChangeRolesSuccess(action.user))
                    obs.complete()
                })
                .catch(err => {
                    const errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message: err.message
                    obs.next(userActions.userChangeRolesFail(action.user, 'Failed to change user roles : ' + errorMessage));
                    obs.complete()
                });
          }));