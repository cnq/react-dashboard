import { addApp as actions } from 'actions'

const initialState = {
    appDomain: '',
    devDomain: '',
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

        case actions.UPDATE_DEV_DOMAIN:
            return {
                ...state,
                devDomain: action.newDevDomain
            };
        
        default:
            return state

    }

}
