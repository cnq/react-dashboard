import { subscriptionActions } from 'actions'

const subscriptionFetchInitialState = {
    fetchComplete: false,
    isFetching: false,
    subscription : null,
    error: ''
}

export function fetchSubscription ( state = subscriptionFetchInitialState, action ) {
    switch ( action.type ) {
        case subscriptionActions.SUBSCRIPTION_FETCH_INITILIZE:
            return {
                ... state,
                isFetching: true
            }
        case subscriptionActions.SUBSCRIPTION_FETCH_START:
            return {
                ... state
            }
        case subscriptionActions.SUBSCRIPTION_FETCH_REQUEST:
            return {
                ... state
            }
        case subscriptionActions.SUBSCRIPTION_FETCH_SUCCESS:
            return {
                ... state,
                isFetching: false,
                fetchComplete: true,
                subscription: action.subscription
            }
        case subscriptionActions.SUBSCRIPTION_FETCH_FAIL:
            return {
                ... state,
                isFetching: false,
                fetchComplete: true,
                error: action.error
            }
        default:
            return state
    }
}

const subscriptionManageInitialState = {
    subscriptionManagementUrl: '',
    error: ''
}

export function manageSubscription ( state = subscriptionManageInitialState, action ) {
    switch ( action.type ) {
        case subscriptionActions.SUBSCRIPTION_MANAGE_INITILIZE:
            return {
                ... state
            }
        case subscriptionActions.SUBSCRIPTION_MANAGE_START:
            return {
                ... state
            }
        case subscriptionActions.SUBSCRIPTION_MANAGE_REQUEST:
            return {
                ... state
            }
        case subscriptionActions.SUBSCRIPTION_MANAGE_SUCCESS:
            return {
                ... state,
                subscriptionManagementUrl: action.subscriptionManagementUrl
            }
        case subscriptionActions.SUBSCRIPTION_MANAGE_FAIL:
            return {
                ... state,
                error: action.error
            }
        default:
            return state
    }
}
