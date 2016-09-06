import { listeners as actions } from 'actions'

export default function listeners ( state = {}, action ) {
    switch ( action.type ) {
        case actions.ADD_LISTENER:
            return {
                ...state,
                [action.listenerId]: true
            }
        case actions.REMOVE_LISTENER:
            return {
                ...state,
                [action.listenerId]: false
            }
        default:
            return state
    }
}
