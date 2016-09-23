import { takeEvery, delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import auth from './auth';

function* doLogin(action){
    console.log('SAGA - doLogin called')
    var result = false;
    auth.login(action.email, action.password, (loggedIn) => {
        result = loggedIn;
    });
    console.log('SAGA - auth.login finished')
    return result;
}

export function* authenticateUser(action) {
    yield console.log('SAGA - authenticateUser Called')
    yield delay(1000)
    yield console.log('SAGA - triggering action')

    try{
        const result = yield call(doLogin, action)
        if(result){
            yield console.log('SAGA - signin succeeded')
            yield put({ type: 'SIGN_IN_SUCCESS', isAuthenticated : true })
        }
        else{
            yield console.log('SAGA - signin failed')
            yield put({ type: 'SIGN_IN_FAIL', isAuthenticated : false })
        }

    }catch(error){
        yield console.log('Exception thrown')
        yield put({ type: 'SIGN_IN_FAIL', isAuthenticated : false })
    
    }
}

export function* watchForAuthenticateUser() {
    yield* takeEvery('SIGN_IN_INITIATED', authenticateUser)
}