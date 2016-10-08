import Rx from 'rxjs/Rx';
import auth from '../auth'
import { signout as signoutActions } from 'actions'

export const initiateSignoutEpic = action$ =>
    action$.ofType(signoutActions.SIGNOUT_START)
      .map(action => { 
          return signoutActions.signoutRequest()
      });

export const signoutRequestEpic = action$ =>
    action$.ofType(signoutActions.SIGNOUT_REQUEST)
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              auth.logout()
                .then(resp => {
                    obs.next(signoutActions.signoutSuccess());
                    obs.complete();
                })
                .catch(err => {
                    obs.next({ type: 'SIGNOUT_FAIL', isAuthenticating: false,  isAuthenticated: false, password: '', error: 'An error occurred while signing you out.'});
                    obs.complete();
                });
          }));
