import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Connections } from 'views'

/**
 * ConnectionsContainer() wraps everything in the Connections view.
 */
class ConnectionsContainer extends Component {
    render () {
        return (
            <Connections props={this.props}>
                {this.props.children}
            </Connections>
        )
    }
}

export default connect()(ConnectionsContainer)
