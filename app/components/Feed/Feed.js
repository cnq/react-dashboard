import React, { PropTypes } from 'react'
import { AddAppContainer, AppContainer } from 'containers'
import { Grid, GridItem } from 'components'
import { newAppContainer, header } from './styles.css'
import { errorMsg } from 'shared/styles.css'
import { List } from 'immutable'

NewAppsAvailable.propTypes = {
    handleClick: PropTypes.func.isRequired
}

function NewAppsAvailable ({handleClick}) {
    return (
        <div className={newAppContainer} onClick={handleClick}>
            {'New Apps Available'}
        </div>
    )
}

Feed.propTypes = {
    appIds: PropTypes.instanceOf(List),
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    newAppsAvailable: PropTypes.bool.isRequired,
    resetNewAppsAvailable: PropTypes.func.isRequired
}

export default function Feed (props) {
    return (

        props.isFetching === true
            ?   <h1 className={header}>{'Fetching'}</h1>
            :   <Grid>
                    {props.newAppsAvailable ? <NewAppsAvailable handleClick={props.resetNewAppsAvailable} /> : null}
                    <GridItem>
                        <AddAppContainer />
                    </GridItem>
                    {
                        /*
                            vanilla JS -> props.appIds.length === 0
                            immutable uses .size instead of .length
                        */
                        props.appIds.size === 0
                            ? <p className={header}>{'This is unfortunate.'} <br /> {'It appears there are no apps yet 😞'}</p>
                            : null
                    }
                    {
                        /* no need to change .map in immutable b/c it has a .map property also */
                        props.appIds.map((id) => (
                            <GridItem key={id}>
                                <AppContainer appId={id} />
                            </GridItem>
                        )
                    )}
                    {props.error ? <p className={errorMsg}>{props.error}</p> : null}
                </Grid>
    )
}