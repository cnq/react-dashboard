import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Apps } from 'views'

const AppsContainer = React.createClass({
    render () {
        return (
            <Apps props={this.props}>
                {this.props.children}
            </Apps>
        )
    }
})

export default connect()(AppsContainer)
