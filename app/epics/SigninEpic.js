import Rx from 'rxjs/Rx';
import auth from '../auth'


export const initiateCheckSigninEpic = action$ =>
    action$.ofType('CHECK_SIGN_IN_START')
      .map(action => { 
          return { type: 'CHECK_SIGN_IN_REQUEST', isAuthenticated: action.isAuthenticated }
      });

export const checkSigninRequestEpic = action$ =>
    action$.ofType('CHECK_SIGN_IN_REQUEST')
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              auth.getLoggedInUser()
                .then(resp => {
                    obs.next({ type: 'CHECK_SIGN_IN_SUCCESS', isAuthenticated: true });
                    obs.complete();
                })
                .catch(err => {
                    obs.next({ type: 'CHECK_SIGN_IN_FAIL', isAuthenticated: false});
                    obs.complete();
                });
          }));

export const initiateSigninEpic = action$ =>
    action$.ofType('SIGN_IN_START')
      .map(action => { 
          return { type: 'SIGN_IN_REQUEST', isAuthenticating: true, isAuthenticated: false, error: '', email :action.email, password: action.password }
      });



export const signinRequestEpic = action$ =>
    action$.ofType('SIGN_IN_REQUEST')
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              auth.login({ email: action.email, password: action.password } )
                .then(resp => {
                    obs.next({ type: 'SIGN_IN_SUCCESS', isAuthenticating: false, isAuthenticated: true, error:'', email :'', password: ''  });
                    obs.complete();
                })
                .catch(err => {
                    obs.next({ type: 'SIGN_IN_FAIL', isAuthenticating: false,  isAuthenticated: false, password: '', error: 'We had an issue getting you logged in. We think you may have mistyped either your email address or password.'});
                    obs.complete();
                });
          }));