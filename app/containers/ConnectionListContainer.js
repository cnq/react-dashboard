import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { ConnectionContainer } from 'containers'
import FlatButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add'
import { GridList, GridListItem } from 'components'
import { getConnections, getApp } from '../reducers'
import { connectionList as connectionListActions, appList as appListActions } from 'actions'
import { tableHeading, listItem } from './ConnectionListContainer.css'
import { leftContainer, rightContainer, centeredContainer, addContainer, breathingRoom, table, uri } from '../styles.css'


class ConnectionListContainer extends Component {

    goToAddAppConnections = (event) => {
        event.stopPropagation()
        this.props.router.push('/dashboard/apps/app/' + this.props.appId + '/connections/add')
    }

    render () {
        return (

             <div className={centeredContainer}>
                    {
                        this.props.connections.length === 0
                            ?   <div className={`${centeredContainer} ${breathingRoom}`}>
                                    <h1>{'Add Connections'}</h1>
                                    <h4>{`Connect `}<span className={uri}>{this.props.app.backendSiteUri}</span>{` to content on the web.`}</h4>
                                </div>
                            :   null
                    }
                    <div className={breathingRoom} style={{width: '100%'}}>
                        {
                            this.props.connections.length === 0
                                ?   ''
                                :   <div className={leftContainer}>
                                        <h6>CONNECTIONS FOR</h6>
                                        <h2 className={uri}>{this.props.app.backendSiteUri}</h2>
                                    </div>
                        }
                        <div className={`${addContainer} ${this.props.connections.length === 0 ? centeredContainer : rightContainer}`} style={{height: '50px'}}>
                            <FlatButton onClick={this.goToAddAppConnections} labelStyle={{color: '#f2f2f2', fontSize: '15px', letterSpacing: '.5px'}} backgroundColor="#3ED1D6" label="Add Connection" icon={<AddIcon color="#f2f2f2" />} />
                        </div>
                    </div>
                    {
                     this.props.connections.length === 0
                         ?  ''
                         :  <div style={{width: '100%'}}>
                                <ul className={`${table} ${tableHeading}`}>
                                     <li>Type</li>
                                     <li>Name</li>
                                     <li>Target URL</li>
                                     <li>Actions</li>
                                 </ul>
                                 <GridList>
                                 {
                                     this.props.connections.map( (connection) => (
                                         <GridListItem key={connection.connectionId}>
                                             <ConnectionContainer connection={connection} uri={this.props.app.uri} />
                                         </GridListItem>
                                    ))
                                 }
                                 </GridList>
                            </div>
                    }
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
        app: getApp(state, params.appId),
        appId: params.appId,
        connections: getConnections(state, params.appId)
    }
}

export default withRouter(connect(
    mapStateToProps,
    {...connectionListActions, ...appListActions}
)(ConnectionListContainer))
