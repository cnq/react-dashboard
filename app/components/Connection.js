import React, { PropTypes } from 'react'
import { Map } from 'immutable'
import FlatButton from 'material-ui/FlatButton';
import { ConnectionCard } from 'components'
import s from './Connection.css'

function Connection(props) {

    const renderCardActions = ({ deleteConnection, connection }) => {
        return (
            <div>
                <FlatButton onClick={(event) => deleteConnection(event, connection)} label="Delete Connection" />
            </div>
        )
    }

    return (
        <ConnectionCard
            className={s.connectionWrapper}
            connectionUri={props.connection.connectionUri}
            connectionType={props.connection.connectionType}
            connectionName={props.connection.connectionName}
            isCreating={props.connection.isCreating}
            isDeleting={props.connection.isDeleting}
            actions={renderCardActions(props)}
        />
    )

}

Connection.propTypes = {
    connection: PropTypes.object.isRequired,
    deleteConnection: PropTypes.func
}

export default Connection
