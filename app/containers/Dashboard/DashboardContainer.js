import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const DashboardContainer = React.createClass({

    render () {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
})

export default connect()(DashboardContainer)
