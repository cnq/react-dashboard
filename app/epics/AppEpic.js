import Rx from 'rxjs/Rx';
import api from '../api'


export const initializeAppCreateEpic = action$ =>
    action$.ofType('APP_CREATE_INITILIZE')
      .map(action => { 
          return { type: 'APP_CREATE_START', backendSiteUri: action.backendSiteUri }
      });

export const startAppCreateEpic = action$ =>
    action$.ofType('APP_CREATE_START')
      .map(action => { 
          return { type: 'APP_CREATE_REQUEST', backendSiteUri: action.backendSiteUri }
      });

export const appCreateRequestEpic = action$ =>
    action$.ofType('APP_CREATE_REQUEST')
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.createApp({backendSiteUri: action.backendSiteUri})
                .then(resp => {
                    const newApp = resp
                    obs.next({ type: 'APP_CREATE_SUCCESS' });
                    obs.complete();
                })
                .catch(err => {
                    obs.next({ type: 'APP_CREATE_FAIL', error: 'Failed to create app'});
                    obs.complete();
                });
          }));
