import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';
import { AppCard } from 'components'
import { formatApp, getUri } from 'helpers/utils'
import {
    newAppTop,
    pointer,
    newAppInputContainer,
    enabled,
    disabled
} from './styles.css'

const {
    object,
    string,
    func,
    bool
} = PropTypes

/**
 * AddApp() returns component that displays necessary
 * input fields for adding new apps.
 */
AddApp.propTypes = {
    backendSiteUri: string.isRequired,
    uri: string.isRequired,
    isActive: bool.isRequired,
    user: object.isRequired,
    isSubmitDisabled: bool.isRequired,
    activateAddApp: func.isRequired,
    deactivateAddApp: func.isRequired,
    updateBackendSiteUri: func.isRequired,
    updateUri: func.isRequired,
    appFanout: func.isRequired
}

function AddApp(props) {

    const onClickCreateApp = ()  => {
        props.appFanout(formatApp(props.backendSiteUri, props.uri, props.user))
    }

    const renderActions = ({ isActive, isSubmitDisabled }) => {
        return (
            <FlatButton
                className={isActive ? `enabled` : `disabled`}
                primary={true}
                disabled={isSubmitDisabled}
                onTouchTap={onClickCreateApp}
            >
                {'Create New Site'}
            </FlatButton>
        )
    }

return (
    <AppCard
        title="Create New App"
        backendSiteUri=""
        uri=""
        actions={renderActions(props)}
        onClick={props.activateAddApp}
    >
        <div className={newAppInputContainer}>
                <TextField
                    value={props.backendSiteUri}
                    maxLength={140}
                    type="text"
                    floatingLabelText={`Website URL`}
                    hintText={`Please enter your website URL`}
                    onChange={
                        (event) =>  {
                            props.updateBackendSiteUri(event.target.value)
                            props.updateUri(getUri(event.target.value))
                        }
                    }
                />
            </div>
        </AppCard>
    )
}

export default AddApp 
