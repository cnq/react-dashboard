import React, { PropTypes } from 'react'
import { ConnectionContainer } from 'containers'
import FlatButton from 'material-ui/RaisedButton';
import { Grid, GridItem } from 'components'
import { header } from './styles.css'
import { centeredContainer, breathingRoom, errorMsg } from 'shared/styles.css'

const {
    string,
    func,
    bool,
    array,
} = PropTypes

/**
 * ConnectionList() displays a list of all connections created for an app.
 */
ConnectionList.propTypes = {
    connectionIds: array.isRequired,
    appId: PropTypes.string.isRequired,
    error: string.isRequired,
    isFetching: bool.isRequired,
    goToAddAppConnections: func.isRequired
}

function ConnectionList (props) {

    return (

        props.isFetching === true
            ?   <div></div>
            :   <div>
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
                            // using immutable .map property
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
