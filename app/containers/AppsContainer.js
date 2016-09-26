import React, { Component } from 'react'
import { connect } from 'react-redux'


const Apps = ({ children }) => {
    return (
        <div>{children}</div>
    )
}

class AppsContainer extends Component {
    render () {
        return (
            <Apps props={this.props}>{this.props.children}</Apps>
        )
    }
}

export default connect()(AppsContainer)
