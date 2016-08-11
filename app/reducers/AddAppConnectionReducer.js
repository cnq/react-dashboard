import { addAppConnection as actions } from 'actions'

const initialState = {
    appConnection: '',
    isActive: false
};

export default function addAppConnection ( state = initialState, action ) {

    switch ( action.type ) {

        case actions.UPDATE_APP_CONNECTION:
            return {
                ...state,
                appConnection: action.newAppConnection
            };
        
        default:
            return state

    }

}
