import Rx from 'rxjs/Rx';
import auth from '../auth'
import { signin as signinActions } from 'actions'


export const initiateCheckSigninEpic = action$ =>
    action$.ofType(signinActions.CHECK_SIGNIN_START)
      .map(action => { 
          return signinActions.checkSigninRequest()
      });

export const checkSigninRequestEpic = action$ =>
    action$.ofType(signinActions.CHECK_SIGNIN_REQUEST)
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              auth.getLoggedInUser()
                .then(resp => {
                    const signedInUser = resp
                    obs.next(signinActions.checkSigninSuccess(signedInUser));
                    obs.complete();
                })
                .catch(err => {
                    obs.next(signinActions.checkSigninFail());
                    obs.complete();
                });
          }));

export const initiateSigninEpic = action$ =>
    action$.ofType(signinActions.SIGNIN_START)
      .map(action => { 
          return signinActions.signinRequest(action.authenticationCredentials)
      });



export const signinRequestEpic = action$ =>
    action$.ofType(signinActions.SIGNIN_REQUEST)
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              auth.login({ email: action.authenticationCredentials.email, password: action.authenticationCredentials.password } )
                .then(resp => {
                    const signedInUser = resp
                    obs.next(signinActions.signinSuccess(signedInUser));
                    obs.complete();
                })
                .catch(err => {
                    const errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message: err.message
                    obs.next(signinActions.signinFail('We had an issue getting you logged in. We think you may have mistyped either your email address or password.'));
                    obs.complete();
                });
          }));