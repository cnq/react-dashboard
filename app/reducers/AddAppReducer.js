import { addApp as actions } from 'actions'

const initialState = {
    appDomain: '',
    isActive: false
};

export default function addApp ( state = initialState, action ) {

    switch ( action.type ) {

        case actions.ACTIVATE_ADD_APP:
            return {
                ...state,
                isActive: true
            };

        case actions.DEACTIVATE_ADD_APP:
            return {
                ...state,
                isActive: false
            };

        case actions.UPDATE_APP_DOMAIN:
            return {
                ...state,
                appDomain: action.newAppDomain
            };

        default:
            return state

    }

}
