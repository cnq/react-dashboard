import Rx from 'rxjs/Rx';
import auth from '../auth'

export const initiateSignoutEpic = action$ =>
    action$.ofType('SIGN_OUT_START')
      .map(action => { 
          return { type: 'SIGN_OUT_REQUEST' }
      });



export const signoutRequestEpic = action$ =>
    action$.ofType('SIGN_OUT_REQUEST')
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              auth.logout()
                .then(resp => {
                    obs.next({ type: 'SIGN_OUT_SUCCESS' });
                    obs.complete();
                })
                .catch(err => {
                    obs.next({ type: 'SIGN_OUT_FAIL', isAuthenticating: false,  isAuthenticated: false, password: '', error: 'An error occurred while signing you out.'});
                    obs.complete();
                });
          }));

export const signoutClearSigninEpic = action$ =>
    action$.ofType('SIGN_OUT_SUCCESS')
      .delay(2000)
      .map(action => { 
          return { type: 'SIGN_IN_CLEAR' }
      });