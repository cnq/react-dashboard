
//Fetch Subscription
export const SUBSCRIPTION_FETCH_INITILIZE = 'SUBSCRIPTION_FETCH_INITILIZE'
export const SUBSCRIPTION_FETCH_START = 'SUBSCRIPTION_FETCH_START'
export const SUBSCRIPTION_FETCH_REQUEST = 'SUBSCRIPTION_FETCH_REQUEST'
export const SUBSCRIPTION_FETCH_SUCCESS = 'SUBSCRIPTION_FETCH_SUCCESS'
export const SUBSCRIPTION_FETCH_FAIL = 'SUBSCRIPTION_FETCH_FAIL'

export const subscriptionFetchInitialize = () => ({ type: SUBSCRIPTION_FETCH_INITILIZE })
export const subscriptionFetchStart = () => ({ type: SUBSCRIPTION_FETCH_START })
export const subscriptionFetchRequest = () => ({ type: SUBSCRIPTION_FETCH_REQUEST })
export const subscriptionFetchSuccess = (subscription) => ({ type: SUBSCRIPTION_FETCH_SUCCESS, subscription: subscription })
export const subscriptionFetchFail = (errorMessage) => ({ type: SUBSCRIPTION_FETCH_FAIL, error: errorMessage })

// Subscription Manage Actions
export const SUBSCRIPTION_MANAGE_INITILIZE = 'SUBSCRIPTION_MANAGE_INITILIZE'
export const SUBSCRIPTION_MANAGE_START = 'SUBSCRIPTION_MANAGE_START'
export const SUBSCRIPTION_MANAGE_REQUEST = 'SUBSCRIPTION_MANAGE_REQUEST'
export const SUBSCRIPTION_MANAGE_SUCCESS = 'SUBSCRIPTION_MANAGE_SUCCESS'
export const SUBSCRIPTION_MANAGE_FAIL = 'SUBSCRIPTION_MANAGE_FAIL'

export const subscriptionManageInitialize = () => ({ type: SUBSCRIPTION_MANAGE_INITILIZE})
export const subscriptionManageStart = () => ({ type: SUBSCRIPTION_MANAGE_START})
export const subscriptionManageRequest = () => ({ type: SUBSCRIPTION_MANAGE_REQUEST})
export const subscriptionManageSuccess = (subscriptionManagementUrl) => ({ type: SUBSCRIPTION_MANAGE_SUCCESS, subscriptionManagementUrl: subscriptionManagementUrl})
export const subscriptionManageFail = (errorMessage) => ({ type: SUBSCRIPTION_MANAGE_FAIL, error: errorMessage })

// Subscription Update Actions
export const SUBSCRIPTION_UPDATE_INITILIZE = 'SUBSCRIPTION_UPDATE_INITILIZE'
export const SUBSCRIPTION_UPDATE_START = 'SUBSCRIPTION_UPDATE_START'
export const SUBSCRIPTION_UPDATE_REQUEST = 'SUBSCRIPTION_UPDATE_REQUEST'
export const SUBSCRIPTION_UPDATE_SUCCESS = 'SUBSCRIPTION_UPDATE_SUCCESS'
export const SUBSCRIPTION_UPDATE_FAIL = 'SUBSCRIPTION_UPDATE_FAIL'

export const subscriptionUpdateInitialize = (subscriptionToUpdate) => ({ type: SUBSCRIPTION_UPDATE_INITILIZE, subscription: subscriptionToUpdate})
export const subscriptionUpdateStart = (subscriptionToUpdate) => ({ type: SUBSCRIPTION_UPDATE_START, subscription: subscriptionToUpdate})
export const subscriptionUpdateRequest = () => ({ type: SUBSCRIPTION_UPDATE_REQUEST})
export const subscriptionUpdateSuccess = (updatedSubscription) => ({ type: SUBSCRIPTION_UPDATE_SUCCESS, subscription: updatedSubscription})
export const subscriptionUpdateFail = (subscriptionToUpdate, errorMessage) => ({ type: SUBSCRIPTION_UPDATE_FAIL, subscription: subscriptionToUpdate, error: errorMessage })
