import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Dashboard } from 'views'

/**
 * DashboardContainer() wraps everything in the Dashboard view
 * and passes props down to children.
 **/
class DashboardContainer extends Component {
    render () {
        return (
            <Dashboard props={this.props}>
                {this.props.children}
            </Dashboard>
        )
    }
}

export default connect()(DashboardContainer)
