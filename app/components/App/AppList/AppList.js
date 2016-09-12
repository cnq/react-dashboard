import React, { PropTypes } from 'react'
import { v4 } from 'node-uuid'
import { List } from 'immutable'
import { AddAppCardContainer, AppContainer } from 'containers'
import { Grid, GridItem } from 'components'
import { newAppContainer, header } from './styles.css'
import { errorMsg } from 'shared/styles.css'

const {
    string,
    func,
    bool
} = PropTypes

/**
 * NewAppsAvailable() returns a message component
 * letting the user know whether new apps have been
 * created by other users
 */
NewAppsAvailable.propTypes = {
    handleClick: func.isRequired
}

function NewAppsAvailable ({ handleClick }) {
    return (
        <div className={newAppContainer} onClick={handleClick}>
            {'New Apps Have Been Created'}
        </div>
    )
}

/**
 * AppList() displays a list of all apps created.
 */
AppList.propTypes = {
    appIds: PropTypes.instanceOf(List),
    error: string.isRequired,
    isFetching: bool.isRequired,
    newAppsAvailable: bool.isRequired,
    resetNewAppsAvailable: func.isRequired
}

function AppList (props) {
    return (

        props.isFetching === true
            ?   <div></div>
            :   <Grid>
                    {props.newAppsAvailable ? <NewAppsAvailable handleClick={props.resetNewAppsAvailable} /> : null}
                    <GridItem>
                        <AddAppCardContainer />
                    </GridItem>
                    {
                        //  immutable uses .size instead of .length
                        props.appIds.size === 0
                            ? <p className={header}>{'This is unfortunate.'} <br /> {'It appears there are no apps yet'}</p>
                            : null
                    }
                    {
                        // immutable has a .map property also
                        props.appIds.map( (id) => (
                            <GridItem key={v4()}>
                                <AppContainer appId={id} />
                            </GridItem>
                        ))
                    }
                    {props.error ? <p className={errorMsg}>{props.error}</p> : null}
                </Grid>
    )
}

export default AppList
