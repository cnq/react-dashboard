import Rx from 'rxjs/Rx';
import api from '../api'
import { subscriptionActions } from 'actions'


// subscription fetch

export const initializeSubscriptionFetchEpic = action$ =>
    action$.ofType(subscriptionActions.SUBSCRIPTION_FETCH_INITILIZE)
      .map(action => { 
          return subscriptionActions.subscriptionFetchStart()
      });

export const startSubscriptionFetchEpic = action$ =>
    action$.ofType(subscriptionActions.SUBSCRIPTION_FETCH_START)
      .map(action => { 
          return subscriptionActions.subscriptionFetchRequest()
      });

export const subscriptionFetchRequestEpic = (action$, store) =>
    action$.ofType(subscriptionActions.SUBSCRIPTION_FETCH_REQUEST)
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.getSubscription()
                .then(resp => {
                    const subscription = resp
                    obs.next(subscriptionActions.subscriptionFetchSuccess(subscription))
                    obs.complete()
                })
                .catch(err => {
                    const errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message: err.message
                    obs.next(subscriptionActions.subscriptionFetchFail('Failed to fetch subscription : ' + errorMessage));
                    obs.complete()
                });
          }));

// subscription manage

export const initializeSubscriptionManageEpic = action$ =>
    action$.ofType(subscriptionActions.SUBSCRIPTION_MANAGE_INITILIZE)
      .map(action => { 
          return subscriptionActions.subscriptionManageStart()
      });

export const startSubscriptionManageEpic = action$ =>
    action$.ofType(subscriptionActions.SUBSCRIPTION_MANAGE_START)
      .map(action => { 
          return subscriptionActions.subscriptionManageRequest()
      });

export const subscriptionManageRequestEpic = (action$, store) =>
    action$.ofType(subscriptionActions.SUBSCRIPTION_MANAGE_REQUEST)
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.getSubscriptionManagementLink()
                .then(resp => {
                    const subscriptionManageResponse = resp
                    obs.next(subscriptionActions.subscriptionManageSuccess(subscriptionManageResponse.url))
                    obs.complete()
                })
                .catch(err => {
                    const errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message: err.message
                    obs.next(subscriptionActions.subscriptionManageFail('Failed to manage subscription : ' + errorMessage));
                    obs.complete()
                });
          }));


// subscription update

export const initializeSubscriptionUpdateEpic = action$ =>
    action$.ofType(subscriptionActions.SUBSCRIPTION_UPDATE_INITILIZE)
      .map(action => { 
          return subscriptionActions.subscriptionUpdateStart(action.subscription)
      });

export const startSubscriptionUpdateEpic = action$ =>
    action$.ofType(subscriptionActions.SUBSCRIPTION_UPDATE_START)
      .map(action => { 
          return subscriptionActions.subscriptionUpdateRequest()
      });

export const subscriptionUpdateRequestEpic = (action$, store) =>
    action$.ofType(subscriptionActions.SUBSCRIPTION_UPDATE_REQUEST)
      .mergeMap(action =>
          Rx.Observable.create(obs => {
              api.updateSubscription(store.getState().updateSubscription.subscription)
                .then(resp => {
                    obs.next(subscriptionActions.subscriptionUpdateSuccess(store.getState().updateSubscription.subscription))
                    obs.complete()
                })
                .catch(err => {
                    const errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message: err.message
                    obs.next(subscriptionActions.subscriptionUpdateFail(store.getState().updateSubscription.subscription, 'Failed to update subscription : ' + errorMessage));
                    obs.complete()
                });
          }));
