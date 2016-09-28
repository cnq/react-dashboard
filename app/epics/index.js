import { combineEpics } from 'redux-observable';
import { initiateSigninEpic, signinRequestEpic, initiateCheckSigninEpic, checkSigninRequestEpic } from './SigninEpic';
import { initializeAppListEpic, startAppListFetchEpic, appListFetchEpic } from './AppListEpic';
import { initializeAppCreateEpic, startAppCreateEpic, appCreateRequestEpic  } from './AppEpic';
//export { <TYPE> } from './PATH-TO-REDUCER-WITHOUT-EXTENSION';

export const combinedEpic = combineEpics(
  initiateSigninEpic,
  signinRequestEpic, 
  initiateCheckSigninEpic, 
  checkSigninRequestEpic,
  initializeAppListEpic,
  startAppListFetchEpic,
  appListFetchEpic,
  initializeAppCreateEpic,
  startAppCreateEpic, 
  appCreateRequestEpic
  //LIST HERE
);
