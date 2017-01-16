import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { List } from 'immutable'
import { AppCardAddContainer } from 'containers'
import { GridCard, GridCardItem, App } from 'components'
import { applist as appListActions, appActions } from 'actions'
import s from './AppListContainer.css'
import { errorMsg, centeredContainer, breathingRoom } from '../styles.css'


class AppListContainer extends Component {

    componentDidMount () {
            this.props.appListRefreshStartConstant()
    }

    componentWillUnmount(){
        this.props.appListRefreshStopConstant()
    }

    goToAppConnections = (event, appId) => {
        console.log("AppListContainer - goToAppConnections() called")
        event.stopPropagation()
        this.props.router.push('/dashboard/apps/app/' + appId + '/connections')
    }

    deleteApp = (app) => {
        console.log("AppListContainer - deleteApp() called")
        this.props.appDeleteInitialize(app)
    }

    render () {
        return (
            <div className={`${centeredContainer} ${breathingRoom}`}>
                {
                    this.props.isFetching === true
                        ? <div></div>
                        : <GridCard>
                        <GridCardItem>
                            <AppCardAddContainer />
                        </GridCardItem>
                        { this.props.initialFetchComplete && this.props.apps.length === 0 ? <p className={s.header}>{'There are currently no website\'s setup in your account.'}</p> : null }
                        { this.props.apps.length > 0 ? this.props.apps.map((app) => ( <GridCardItem key={app.appId}>
                                                                                            <App app={app}
                                                                                                 goToAppConnections={this.goToAppConnections}
                                                                                                 deleteApp={this.deleteApp}/>
                                                                                        </GridCardItem> )) : null}
                        { this.props.error ? <p className={errorMsg}>{this.props.error}</p> : null}
                    </GridCard>
                }
            </div>
        )
}
}

AppListContainer.propTypes = {
    initialFetchComplete: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    apps: PropTypes.array.isRequired
}


const mapStateToProps = ({applist}) => {
    return {
        initialFetchComplete: applist.isFetching,
        isFetching: applist.isFetching,
        error: applist.error,
        apps: applist.apps
    }
}

export default withRouter(connect( mapStateToProps, {...appListActions,...appActions})(AppListContainer))
