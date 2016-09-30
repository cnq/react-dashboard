import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const Connections = React.createClass({
    
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
})

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
