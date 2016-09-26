import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { App } from 'components'
import { app as appActions} from 'actions'


class AppContainer extends Component {

        render () {
            return ( <App app={this.props.app} /> )
        }
}

AppContainer.propTypes = {
    app: PropTypes.object.isRequired
}

const mapStateToProps = ({app}, props) => ({
    app: app.get(props.appId)
})

export default withRouter(connect(
    mapStateToProps,
    {...appActions}
)(AppContainer))
