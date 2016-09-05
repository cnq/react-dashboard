import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Apps } from 'views'

/**
 * AppsContainer() wraps everything in the Apps view
 * and passes props down to children.
 **/
class AppsContainer extends Component {
    render () {
        return (
            <Apps props={this.props}>
                {this.props.children}
            </Apps>
        )
    }
}

export default connect()(AppsContainer)
