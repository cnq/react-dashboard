import Rx from 'rxjs/Rx';
import api from '../api'
import { userlist } from 'actions'



export const initializeUserListEpic = (action$, store) =>
    action$.ofType(userlist.USERLIST_INITILIZE)
      .map(action => { 
          return userlist.userListFetchStart()
      });

export const startUserListFetchEpic = action$ =>
    action$.ofType(userlist.USERLIST_FETCH_START)
      .map(action => { 
          return userlist.userListFetchRequest()
      });

export const userListFetchEpic = action$ =>
    action$.ofType(userlist.USERLIST_FETCH_REQUEST)
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.getUsers()
                .then(resp => {
                    const userArray = Object.keys(resp).map(function(key) { return resp[key] });
                    obs.next(userlist.userListFetchSuccess(userArray));
                    obs.complete();
                })
                .catch(err => {
                    const errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message: err.message
                    obs.next(userlist.userListFetchFail(errorMessage));
                    obs.complete();
                });
          }));