import { combineEpics } from 'redux-observable';
import { initiateSigninEpic, signinRequestEpic, initiateCheckSigninEpic, checkSigninRequestEpic } from './SigninEpic';
import { initiateSignoutEpic, signoutRequestEpic, signoutClearSigninEpic } from './SignoutEpic';
import { initializeAppListEpic, startAppListFetchEpic, appListFetchEpic } from './AppListEpic';
import { initializeAppCreateEpic, startAppCreateEpic, appCreateRequestEpic, startAppListAddAppEpic, initializeAppDeleteEpic, startAppDeleteEpic, startAppListCreateAppEpic, appDeleteRequestEpic } from './AppEpic';
import { initializeConnectionListEpic, startConnectionListFetchEpic, connectionListFetchEpic } from './ConnectionListEpic';
import { initializeConnectionCreateEpic, startConnectionCreateEpic, connectionCreateRequestEpic, initializeConnectionDeleteEpic, startConnectionDeleteEpic, connectionDeleteRequestEpic } from './ConnectionEpic';
//import { <TYPE> } from './PATH-TO-REDUCER-WITHOUT-EXTENSION';

export const combinedEpic = combineEpics(
  initiateSigninEpic,
  signinRequestEpic, 
  initiateCheckSigninEpic, 
  checkSigninRequestEpic,
  initiateSignoutEpic, 
  signoutRequestEpic, 
  signoutClearSigninEpic,
  initializeAppListEpic,
  startAppListFetchEpic,
  appListFetchEpic,
  initializeAppCreateEpic,
  startAppCreateEpic, 
  appCreateRequestEpic,
  startAppListAddAppEpic, 
  initializeAppDeleteEpic, 
  startAppDeleteEpic, 
  startAppListCreateAppEpic, 
  appDeleteRequestEpic,
  initializeConnectionListEpic, 
  startConnectionListFetchEpic, 
  connectionListFetchEpic,
  initializeConnectionCreateEpic, 
  startConnectionCreateEpic,  
  connectionCreateRequestEpic, 
  initializeConnectionDeleteEpic, 
  startConnectionDeleteEpic,  
  connectionDeleteRequestEpic

  //LIST HERE
);
