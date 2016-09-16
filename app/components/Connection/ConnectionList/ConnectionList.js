import React, { PropTypes } from 'react'
import { v4 } from 'node-uuid'
import { List } from 'immutable'
import { ConnectionContainer } from 'containers'
import FlatButton from 'material-ui/RaisedButton';
import { Grid, GridItem } from 'components'
import { header } from './styles.css'
import { centeredContainer, addContainer, breathingRoom, errorMsg } from 'shared/styles.css'

const {
    string,
    func,
    bool
} = PropTypes

/**
 * ConnectionList() displays a list of all connections created for an app.
 */
function ConnectionList (props) {
    console.log('---------------------------')
    console.log('Size:', props.connectionIds.size)
    console.log('---------------------------')
    return (

        props.isFetching === true
            ?   <div></div>
            :   <div>
                    {
                        props.connectionIds.size === 0
                            ?   <div className={`${centeredContainer} ${breathingRoom}`}>
                                    <h1>{'Oops!! This is unfortunate.'}</h1>
                                    <h4>{'It appears that you have not connected any content to your website.'}</h4>
                                </div>
                            :   null
                    }
                    <div className={`${centeredContainer}  ${props.connectionIds.size === 0 ? '' : addContainer}`}>
                        <FlatButton onClick={props.goToAddAppConnections} label="Add Connection" />
                        <p>{`Click the 'Add Connection' button to begin connecting content to your website. It's easy.`}</p>
                    </div>
                    <Grid>
                        {
                            props.connectionIds.map( (id) => (
                                <GridItem key={v4()}>
                                    <ConnectionContainer
                                        connectionId={id}
                                        appId={props.appId}
                                        connectionAlreadyFetched={props.connectionAlreadyFetched}
                                    />
                                </GridItem>
                            ))
                        }
                    </Grid>
                    {props.error ? <p className={errorMsg}>{props.error}</p> : null}
                </div>

    )
}

ConnectionList.propTypes = {
    connectionIds: PropTypes.instanceOf(List),
    appId: PropTypes.string.isRequired,
    error: string.isRequired,
    isFetching: bool.isRequired,
    goToAddAppConnections: func.isRequired,
    connectionAlreadyFetched: bool.isRequired
}

export default ConnectionList
