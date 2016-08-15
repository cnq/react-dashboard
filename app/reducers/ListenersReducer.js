import { listeners as actions } from 'actions'

export default function listeners ( state = {}, action ) {
    switch ( action.type ) {
        case actions.ADD_LISTENER:
            return {
                ...state,
                [action.listenerId]: true
            }
        default:
            return state
    }
}
