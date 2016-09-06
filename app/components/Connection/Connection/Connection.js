import React, { PropTypes } from 'react'
import { Map } from 'immutable'
import FlatButton from 'material-ui/FlatButton';
import { ConnectionCard } from 'components'
import { formatTimestamp } from 'helpers/utils'
import {
    connectionWrapper
} from './styles.css'

const {func, bool} = PropTypes

/**
 * Connection() returns an individual connection component
 * which contains the ConnectionCard.
 */
function Connection(props) {

    const renderCardActions = ({ deleteConnection, goToConnectionDetail }) => {
        const connectionId = props.connection.get('connectionId')
        const appId = props.connection.get('appId')
        return (
            <div>
                <FlatButton onClick={goToConnectionDetail} label="View Details" />
                <FlatButton onClick={(event) => deleteConnection(event, connectionId, appId)} label="Delete Connection" />
            </div>
        )
    }

    const renderDetailActions = ({ deleteConnection, goToConnectionEdit }) => {
        const connectionId = props.connection.get('connectionId')
        const appId = props.connection.get('appId')
        return (
            <div>
                <FlatButton onClick={goToConnectionEdit} label="Edit Connection" />
                <FlatButton onClick={(event) => deleteConnection(event, connectionId, appId)} label="Delete Connection" />
            </div>
        )
    }

    if (!props.connectionAlreadyFetched) {
        return (
            <ConnectionCard
                className={connectionWrapper}
                connectionUri={props.connection.get('connectionUri')}
                connectionType={props.connection.get('connectionType')}
                connectionName={props.connection.get('connectionName')}
                goToConnectionDetail={props.goToConnectionDetail}
                connectionDetails={false}
                actions={renderCardActions(props)}
            />
        )
    } else {
        return (
            <ConnectionCard
                className={connectionWrapper}
                connectionUri={props.connection.get('connectionUri')}
                connectionType={props.connection.get('connectionType')}
                connectionName={props.connection.get('connectionName')}
                connectionDetails={true}
                actions={renderDetailActions(props)}
            />
        )
    }

}

Connection.propTypes = {
    connection: PropTypes.instanceOf(Map),
    goToConnectionDetail: func,
    goToConnectionEdit: func,
    deleteConnection: func,
    connectionAlreadyFetched: bool
}

export default Connection
