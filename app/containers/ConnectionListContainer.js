import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { List } from 'immutable'
import { ConnectionContainer } from 'containers'
import FlatButton from 'material-ui/RaisedButton';
import { Grid, GridItem } from 'components'
import { getConnections } from '../reducers'
import { connectionList as connectionListActions } from 'actions'
import { centeredContainer, addContainer, breathingRoom } from '../styles.css'


class ConnectionListContainer extends Component {

    goToAddAppConnections = (event) => {
        event.stopPropagation()
        this.props.router.push('/dashboard/apps/app/' + this.props.appId + '/connections/add')
    }

    render () {
        return (

             <div>
                    {
                        this.props.connections.length === 0
                            ?   <div className={`${centeredContainer} ${breathingRoom}`}>
                                    <h1>{'Oops!! This is unfortunate.'}</h1>
                                    <h4>{'It appears that you have not connected any content to your website.'}</h4>
                                </div>
                            :   null
                }
                    <div className={`${centeredContainer}  ${this.props.connections.length === 0 ? '' : addContainer}`}>
                        <FlatButton onClick={this.goToAddAppConnections} label="Add Connection" />
                        <p>{`Click the 'Add Connection' button to begin connecting content to your website. It's easy.`}</p>
                    </div>
                    <Grid>
                        {
                            this.props.connections.map( (connection) => (
                                <GridItem key={connection.connectionId}>
                                    <ConnectionContainer connection={connection} />
                                </GridItem>
                            ))
                        }
                    </Grid>
                </div>

        )
    }

}

ConnectionListContainer.propTypes = {
    appId: PropTypes.string.isRequired,
    connections: PropTypes.array
}

const mapStateToProps = (state, {params}) => {
    return {
        appId: params.appId,
        connections: getConnections(state, params.appId)
    }
}

export default withRouter(connect(
    mapStateToProps,
    {...connectionListActions}
)(ConnectionListContainer))
