import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Connections } from 'views'

const ConnectionsContainer = React.createClass({
    render () {
        return (
            <Connections props={this.props}>
                {this.props.children}
            </Connections>
        )
    }
})

export default connect()(ConnectionsContainer)
