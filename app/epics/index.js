import { combineEpics } from 'redux-observable';
import { initiateSigninEpic, signinRequestEpic, initiateCheckSigninEpic, checkSigninRequestEpic } from './SigninEpic';
import { initiateSignoutEpic, signoutRequestEpic } from './SignoutEpic';
import { loadAppListOnCheckSigninSuccessfulEpic, initializeAppListEpic, startAppListFetchEpic, appListFetchEpic } from './AppListEpic';
import { initializeAppCreateEpic, startAppCreateEpic, appCreateRequestEpic, initializeAppDeleteEpic, startAppDeleteEpic, appDeleteRequestEpic } from './AppEpic';
import { initializeConnectionCreateEpic, startConnectionCreateEpic, connectionCreateRequestEpic, initializeConnectionDeleteEpic, startConnectionDeleteEpic, connectionDeleteRequestEpic } from './ConnectionEpic';
//import { <TYPE> } from './PATH-TO-REDUCER-WITHOUT-EXTENSION';

export const combinedEpic = combineEpics(
  initiateSigninEpic,
  signinRequestEpic, 
  initiateCheckSigninEpic, 
  checkSigninRequestEpic,
  initiateSignoutEpic, 
  signoutRequestEpic, 
  loadAppListOnCheckSigninSuccessfulEpic,
  initializeAppListEpic,
  startAppListFetchEpic,
  appListFetchEpic,
  initializeAppCreateEpic,
  startAppCreateEpic, 
  appCreateRequestEpic, 
  initializeAppDeleteEpic, 
  startAppDeleteEpic,  
  appDeleteRequestEpic,
  initializeConnectionCreateEpic, 
  startConnectionCreateEpic,  
  connectionCreateRequestEpic, 
  initializeConnectionDeleteEpic, 
  startConnectionDeleteEpic,  
  connectionDeleteRequestEpic

  //LIST HERE
);
