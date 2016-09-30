import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { List } from 'immutable'
import { AppCardAddContainer } from 'containers'
import { Grid, GridItem, App } from 'components'
import { applist as appListActions, appActions } from 'actions'
import s from './AppListContainer.css'
import { errorMsg } from '../styles.css'


class AppListContainer extends Component {

    componentWillMount () {
        this.props.initializeAppList()
    }

    goToAppConnections = (event, appId) => {
        console.log("AppListContainer - goToAppConnections() called")
        event.stopPropagation()
        this.props.router.push('/dashboard/apps/app/' + appId + '/connections')
    }

    deleteApp = (event, app) => {
        console.log("AppListContainer - deleteApp() called")
        event.stopPropagation()
        this.props.deleteApp(app)
    }



    render () {
        return (
                   this.props.isFetching === true
            ?   <div></div>
            :   <Grid>
                    <GridItem>
                       <AppCardAddContainer />
                    </GridItem>
        { this.props.initialFetchComplete && this.props.apps.length === 0 ? <p className={s.header}>{'This is unfortunate.'}<br />{'It appears there are no apps yet'}</p> : null }
            { this.props.apps.length > 0 ? this.props.apps.map( (app) => ( <GridItem key={app.appId}>
                                                                                <App error={this.props.error}
                                                                                    app={app}
                                                                                    goToAppConnections={this.goToAppConnections}
                                                                                    deleteApp={this.deleteApp} />
                                                                            </GridItem> )) : null}
        { this.props.error ? <p className={errorMsg}>{this.props.error}</p> : null}
    </Grid>
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
