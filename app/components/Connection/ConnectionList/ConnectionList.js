import React, { PropTypes } from 'react'
import { AddConnectionContainer, ConnectionContainer } from 'containers'
import FlatButton from 'material-ui/RaisedButton';
import { Grid, GridItem } from 'components'
import { List } from 'immutable'
import { newConnectionWrapper, header } from './styles.css'
import { centeredContainer, breathingRoom, errorMsg } from 'shared/styles.css'

const {
    string,
    func,
    bool
} = PropTypes

/**
 * NewConnectionsAvailable() returns a message component
 * letting the user know whether new connections have been
 * created by other users
 */
NewConnectionsAvailable.propTypes = {
    handleClick: func.isRequired
}

function NewConnectionsAvailable ({ handleClick }) {
    return (
        <div className={newConnectionWrapper} onClick={handleClick}>
            {'New Connections Have Been Created'}
        </div>
    )
}

/**
 * ConnectionList() displays a list of all connections created for an app.
 */
ConnectionList.propTypes = {
    connectionIds: PropTypes.instanceOf(List),
    appId: PropTypes.string.isRequired,
    error: string.isRequired,
    isFetching: bool.isRequired,
    goToAddAppConnections: func.isRequired,
    newConnectionsAvailable: bool.isRequired,
    resetNewConnectionsAvailable: func.isRequired
}

function ConnectionList (props) {
    return (
        props.isFetching === true
            ?   <h1 className={header}>{'Fetching'}</h1>
            :   <div>
                    {props.newConnectionsAvailable ? <newConnectionsAvailable handleClick={props.resetNewConnectionsAvailable} /> : null}
                    {
                        //  immutable uses .size instead of .length
                        props.connectionIds.size === 0
                            ?   <div className={`${centeredContainer} ${breathingRoom}`}>
                                    <h1>{'Oops!! This is unfortunate.'}</h1>
                                    <h4>{'It appears that you have not connected any content to your website.'}</h4>
                                </div>
                            :   null
                    }
                    <div className={centeredContainer}>
                        <FlatButton onClick={props.goToAddAppConnections} label="Connect" />
                        <p>{`Click the 'Connect' button to begin connecting content to your website. It's easy.`}</p>
                    </div>
                    <Grid>
                        {
                            // immutable has a .map property also
                            props.connectionIds.map( (id) => (
                                    <GridItem key={id}>
                                        <ConnectionContainer
                                            connectionId={id}
                                            appId={props.appId}
                                        />
                                    </GridItem>
                            ))
                        }
                    </Grid>
                    {props.error ? <p className={errorMsg}>{props.error}</p> : null}
                </div>

    )
}

export default ConnectionList
