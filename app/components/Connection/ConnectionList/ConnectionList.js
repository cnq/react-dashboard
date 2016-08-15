import React, { PropTypes } from 'react'
import { AddConnectionContainer, ConnectionContainer } from 'containers'
import { Grid, GridItem } from 'components'
import { List } from 'immutable'
import { newConnectionWrapper, header } from './styles.css'
import { errorMsg } from 'shared/styles.css'

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
    newConnectionsAvailable: bool.isRequired,
    resetNewConnectionsAvailable: func.isRequired
}

function ConnectionList (props) {
    return (
        props.isFetching === true
            ?   <h1 className={header}>{'Fetching'}</h1>
            :   <Grid>
                    {props.newConnectionsAvailable ? <newConnectionsAvailable handleClick={props.resetNewConnectionsAvailable} /> : null}
                    <GridItem>
                        <AddConnectionContainer
                            appId={props.appId}
                        />
                    </GridItem>
                    {
                        //  immutable uses .size instead of .length
                        props.connectionIds.size === 0
                            ? <p className={header}>{'This is unfortunate.'} <br /> {'It appears that you have not connected your website to any content yet'}</p>
                            : null
                    }
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
                    {props.error ? <p className={errorMsg}>{props.error}</p> : null}
                </Grid>
    )
}

export default ConnectionList
