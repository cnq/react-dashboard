import React, { PropTypes } from 'react'
import { v4 } from 'node-uuid'
import { List } from 'immutable'
import { AppCardAddContainer, AppContainer } from 'containers'
import { Grid, GridItem } from 'components'
import s from './AppList.css'
import { errorMsg } from '../styles.css'

AppList.propTypes = {
    appIds: PropTypes.instanceOf(List),
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired
}

function AppList (props) {
    return (
        props.isFetching === true
            ?   <div><AppCardAddContainer /></div>
            :   <Grid>
                    <GridItem>
                        <div>Add App</div>
                    </GridItem>
                    { props.appIds.size === 0 ? <p className={s.header}>{'This is unfortunate.'}<br />{'It appears there are no apps yet'}</p> : null }
                    { props.appIds.size > 0 ? props.appIds.map( (id) => ( <GridItem key={v4()}> <div><AppContainer appId={id} /></div> </GridItem> )) : null}
                    { props.error ? <p className={errorMsg}>{props.error}</p> : null}
                </Grid>
    )
}

export default AppList
