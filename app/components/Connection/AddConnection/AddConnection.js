import React, { PropTypes } from 'react'
import { Map } from 'immutable'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import { ConnectionCard } from 'components'
import { formatConnection } from 'helpers/utils'
import {
    newConnectionInputWrapper
} from './styles.css'

const {
    object,
    string,
    func
} = PropTypes

/**
 * AddConnection() returns component that displays necessary
 * input fields for adding new connections.
 */
AddConnection.propTypes = {
    connectionUri: string.isRequired,
    connectionType: string.isRequired,
    connectionName: string.isRequired,
    app: PropTypes.instanceOf(Map),
    updateConnectionUri: func.isRequired,
    updateConnectionType: func.isRequired,
    updateConnectionName: func.isRequired,
    connectionFanout: func.isRequired
}

function AddConnection(props) {

    const onClickCreateConnection = ()  => {
        props.connectionFanout(
            formatConnection(
                 props.connectionUri,
                 props.connectionType,
                 props.connectionName,
                 props.app.get('appId'),
                 props.app.get('backendSiteUri')
            )
        )
    }

    const renderActions = ({ isActive, isSubmitDisabled }) => {
        return (
            <RaisedButton
                primary={true}
                onTouchTap={onClickCreateConnection}
            >
                {'Connect'}
            </RaisedButton>
        )
    }

    const connectionType = props.connectionType;

    //TODO: Set this up so that it is leading text of connectionUri with ${backendSiteUri}

    return (
        <ConnectionCard
            title={`Connect content to ${props.app.get('backendSiteUri')}`}
            connectionUri=""
            connectionType=""
            connectionName=""
            actions={renderActions(props)}
        >
            <div className={newConnectionInputWrapper}>
                <TextField
                    value={props.connectionType}
                    maxLength={40}
                    type="text"
                    floatingLabelText={`Content type`}
                    hintText={`Please enter blog, wiki, page, etc.`}
                    onChange={
                        (event) =>  {
                            props.updateConnectionType(event.target.value)
                        }
                    }
                />
            </div>
            <div className={newConnectionInputWrapper}>
                <TextField
                    value={props.connectionName}
                    maxLength={140}
                    type="text"
                    floatingLabelText={`Content name`}
                    hintText={`Enter '/blog', '/page-name', etc.`}
                    onChange={
                        (event) =>  {
                            props.updateConnectionName(event.target.value)
                        }
                    }
                />
            </div>
            <div className={newConnectionInputWrapper}>
                <TextField
                    value={props.connectionUri}
                    maxLength={140}
                    type="text"
                    floatingLabelText={`Content location`}
                    hintText={`Please enter your blog's URL`}
                    onChange={
                        (event) =>  {
                            props.updateConnectionUri(event.target.value)
                        }
                    }
                />
            </div>
        </ConnectionCard>
    )
}

export default AddConnection
