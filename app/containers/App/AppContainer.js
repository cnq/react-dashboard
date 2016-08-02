import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { App } from 'components'
import { removeApp as actions } from 'actions'

const { object, func } = PropTypes

const AppContainer = React.createClass({
    propTypes: {
        app: object.isRequired,
        deleteAndHandleApp: func.isRequired
    },
    contextTypes: {
        router: PropTypes.object.isRequired
    },
    goToProfile (event) {
        event.stopPropagation()
        this.context.router.push('/dashboard/user/' + this.props.app.get('uid'))
    },
    goToAppDetail (event) {
        event.stopPropagation()
        this.context.router.push('/dashboard/app/' + this.props.app.get('appId'))
    },
    deleteApp (event, appId) {
        //event.stopPropagation()
        this.props.deleteAndHandleApp(appId)
    },
    render () {
        return (
            <App
                goToProfile={this.goToProfile}
                goToAppDetail={this.goToAppDetail}
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