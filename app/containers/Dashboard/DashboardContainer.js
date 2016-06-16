import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Dashboard } from 'views'

const DashboardContainer = React.createClass({
    render () {
        return (
            <Dashboard props={this.props}>
                {this.props.children}
            </Dashboard>
        )
    }
})

export default connect()(DashboardContainer)
