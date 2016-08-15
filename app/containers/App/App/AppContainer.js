import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { App } from 'components'
import { removeApp as actions } from 'actions'

const { object, func } = PropTypes

//TODO: convert from using contextTypes router to wrapping component in withRouter hoc
const AppContainer = React.createClass({
    propTypes: {
        app: object.isRequired,
        deleteAndHandleApp: func.isRequired
    },
    contextTypes: {
        router: PropTypes.object.isRequired
    },
    goToAppDetail (event) {
        event.stopPropagation()
        this.context.router.push('/dashboard/app/' + this.props.app.get('appId'))
    },
    goToAppConnections (event) {
        event.stopPropagation()
        this.context.router.push('/dashboard/app/' + this.props.app.get('appId') + '/connections')
    },
    deleteApp (event, appId, uid) {
        event.stopPropagation()
        this.props.deleteAndHandleApp(appId, uid)
    },
    render () {
        return (
            <App
                goToAppDetail={this.goToAppDetail}
                goToAppConnections={this.goToAppConnections}
                deleteApp={this.deleteApp}
                {...this.props}
            />
        )
    }
})

function mapStateToProps ({apps}, props) {
    return {
        app: apps.get(props.appId)
    }
}

export default connect(
    mapStateToProps, actions
)(AppContainer)
