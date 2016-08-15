import React, { PropTypes } from 'react'
import { Map } from 'immutable'
import FlatButton from 'material-ui/FlatButton';
import { ConnectionCard } from 'components'
import { formatTimestamp } from 'helpers/utils'
import {
    connectionWrapper
} from './styles.css'

const {func} = PropTypes

/**
 * Connection() returns an individual connection component
 * which contains the ConnectionCard.
 */
Connection.propTypes = {
    connection: PropTypes.instanceOf(Map),
    goToConnectionDetail: func,
    deleteConnection: func
}

// TODO: Refer to App component for guidance.
function Connection(props) {

    const renderActions = ({ deleteConnection }) => {
        const connectionId = props.connection.get('connectionId')
        const appId = props.connection.get('appId')
        return (
            <div>
                <FlatButton label="Add Connection" />
                <FlatButton onClick={(event) => deleteConnection(event, connectionId, appId)} label="Delete" />
            </div>
        )
    }

    return (
        <ConnectionCard
            className={connectionWrapper}
            connectionUri={props.connection.get('connectionUri')}
            connectionType={props.connection.get('connectionType')}
            connectionName={props.connection.get('connectionName')}
            goToConnectionDetail={props.goToConnectionDetail}
            actions={renderActions(props)}
        />
    )

}

export default Connection
