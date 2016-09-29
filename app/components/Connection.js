import React, { PropTypes } from 'react'
import { Map } from 'immutable'
import FlatButton from 'material-ui/FlatButton';
import { ConnectionCard } from 'components'
import s from './Connection.css'

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
                className={s.connectionWrapper}
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
                className={s.connectionWrapper}
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
    goToConnectionDetail: PropTypes.func,
    goToConnectionEdit: PropTypes.func,
    deleteConnection: PropTypes.func,
    connectionAlreadyFetched: PropTypes.bool
}

export default Connection
