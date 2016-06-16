import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { App } from 'components'

const { object } = PropTypes

const AppContainer = React.createClass({
    propTypes: {
        app: object.isRequired
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
    render () {
        return (
            <App
                goToProfile={this.goToProfile}
                goToAppDetail={this.goToAppDetail}
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
    mapStateToProps
)(AppContainer)