import Rx from 'rxjs/Rx';
import api from '../api'


export const initializeAppCreateEpic = action$ =>
    action$.ofType('APP_CREATE_INITILIZE')
      .map(action => { 
          return { type: 'APP_CREATE_START' }
      });


