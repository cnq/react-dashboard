import { combineEpics } from 'redux-observable';
import { initiateSigninEpic, signinRequestEpic, initiateCheckSigninEpic, checkSigninRequestEpic } from './SigninEpic';
import { initializeAppListEpic, startAppListFetchEpic, appListFetchEpic } from './AppListEpic';
import { initializeAppCreateEpic, startAppCreateEpic, appCreateRequestEpic, startAppListAddAppEpic, initializeAppDeleteEpic, startAppDeleteEpic, startAppListCreateAppEpic, appDeleteRequestEpic } from './AppEpic';
import { initializeConnectionListEpic, startConnectionListFetchEpic, connectionListFetchEpic } from './ConnectionListEpic';
import { initializeConnectionCreateEpic, startConnectionCreateEpic, startConnectionListAddConnectionEpic, connectionCreateRequestEpic, initializeConnectionDeleteEpic, startConnectionDeleteEpic, startConnectionListCreateConnectionEpic, connectionDeleteRequestEpic } from './ConnectionEpic';
//import { <TYPE> } from './PATH-TO-REDUCER-WITHOUT-EXTENSION';

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
  startConnectionListAddConnectionEpic, 
  connectionCreateRequestEpic, 
  initializeConnectionDeleteEpic, 
  startConnectionDeleteEpic, 
  startConnectionListCreateConnectionEpic, 
  connectionDeleteRequestEpic

  //LIST HERE
);
