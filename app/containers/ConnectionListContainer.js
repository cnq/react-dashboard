import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { List } from 'immutable'
import { ConnectionContainer } from 'containers'
import FlatButton from 'material-ui/RaisedButton';
import { Grid, GridItem } from 'components'
import { connectionList as connectionListActions } from 'actions'
import { centeredContainer, addContainer, breathingRoom, errorMsg } from '../styles.css'


class ConnectionListContainer extends Component {

    componentWillMount () {
        this.props.initializeConnectionList(this.props.appId)
    }

    goToAddAppConnections = (event) => {
        event.stopPropagation()
        this.props.router.push('/dashboard/apps/app/' + this.props.appId + '/connections/add')
    }

    render () {
        return (

            this.props.isFetching === true
            ?   <div></div>
            :   <div>
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
                                    <ConnectionContainer connectionId={connection.connectionId} appId={this.props.appId} connectionAlreadyFetched={this.props.connectionAlreadyFetched} />
                                </GridItem>
                            ))
                        }
                    </Grid>
                    {this.props.error ? <p className={errorMsg}>{this.props.error}</p> : null}
                </div>

        )
    }

}

ConnectionListContainer.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    appId: PropTypes.string.isRequired,
    connections: PropTypes.array
}

const mapStateToProps = ({connectionList}, {params}) => {
    return {
        isFetching: connectionList.isFetching ? true : false,
        error: connectionList.error ? connectionList.error : '',
        appId: params.appId,
        connections: connectionList.connections
    }}

export default withRouter(connect(
    mapStateToProps,
    {...connectionListActions}
)(ConnectionListContainer))
