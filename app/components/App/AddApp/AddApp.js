import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import { AppCard } from 'components'
import { formatApp, getDevDomain } from 'helpers/utils'
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
    appDomain: string.isRequired,
    devDomain: string.isRequired,
    isActive: bool.isRequired,
    user: object.isRequired,
    isSubmitDisabled: bool.isRequired,
    activateAddApp: func.isRequired,
    deactivateAddApp: func.isRequired,
    updateAppDomain: func.isRequired,
    updateDevDomain: func.isRequired,
    appFanout: func.isRequired
}

function AddApp(props) {

    const onClickCreateApp = ()  => {
        props.appFanout(formatApp(props.appDomain, props.devDomain, props.user))
    }

    const renderActions = ({ isActive, isSubmitDisabled }) => {
        return (
            <RaisedButton
                className={isActive ? `enabled` : `disabled`}
                primary={true}
                disabled={isSubmitDisabled}
                onTouchTap={onClickCreateApp}
            >
                {'Create App'}
            </RaisedButton>
        )
    }

    return (
        <AppCard
            title="Create New App"
            backendSiteUri=""
            devSiteUri=""
            actions={renderActions(props)}
            onClick={props.activateAddApp}
        >
            <div className={newAppInputContainer}>
                <TextField
                    value={props.appDomain}
                    maxLength={140}
                    type="text"
                    floatingLabelText={`Website URL`}
                    hintText={`Please enter your website URL`}
                    onChange={
                        (event) =>  {
                            props.updateAppDomain(event.target.value)
                            props.updateDevDomain(getDevDomain(event.target.value))
                        }
                    }
                />
            </div>
        </AppCard>
    )
}

export default AddApp 
