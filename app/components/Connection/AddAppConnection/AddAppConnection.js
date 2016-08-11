import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import { ConnectionCard } from 'components'

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
    appConnectionUri: string.isRequired,
    appConnectionType: string.isRequired,
    appConnectionName: string.isRequired,
    updateAppConnectionUri: func.isRequired,
    updateAppConnectionType: func.isRequired,
    updateAppConnectionName: func.isRequired,
    appConnectionFanout: func.isRequired
}

function AddAppConnection(props) {

    const onClickCreateAppConnection = ()  => {
        props.appConnectionFanout(formatAppConnection(props.appConnectionUri, props.appConnectionType, props.appConnectionType, props.appConnectionName, props.appId))
    }

    const renderActions = ({ isActive, isSubmitDisabled }) => {
        return (
            <RaisedButton
                primary={true}
                onTouchTap={onClickCreateAppConnection}
            >
                {'Create Connection'}
            </RaisedButton>
        )
    }

    const appConnectionType = props.appConnectionType;

    return (
        <AppConnectionCard
            title="Create New App Connection"
            backendSiteUri=""
            devSiteUri=""
            actions={renderActions(props)}
        >
            <div className={newAppConnectionInputContainer}>
                <TextField
                    value={props.appConnectionUri}
                    maxLength={140}
                    type="text"
                    floatingLabelText={`Enter the location of your ${appConnectionType}`}
                    hintText={`Please enter your ${appConnectionType}'s URL`}
                    onChange={
                        (event) =>  {
                            props.updateAppConnectionType(event.target.value)
                        }
                    }
                />
            </div>
            <div className={newAppConnectionInputContainer}>
                <TextField
                    value={props.updateAppConnectionName}
                    maxLength={140}
                    type="text"
                    floatingLabelText={`Enter the name of your ${appConnectionType}`}
                    hintText={`${appDomain}/`} //TODO: Set this up so that it is leading text not a hint.
                    onChange={
                        (event) =>  {
                            props.updateAppConnectionName(event.target.value)
                        }
                    }
                />
            </div>
        </AppConnectionCard>
    )
}

export default AddAppConnection
