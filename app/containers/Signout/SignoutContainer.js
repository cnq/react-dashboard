import React, { PropTypes } from 'react'
import { Signout } from 'views'
import { signout } from 'actions'
import { connect } from 'react-redux'

const SignoutContainer = React.createClass({
    propTypes: {
        dispatch: PropTypes.func.isRequired
    },
    componentDidMount () {
        this.props.dispatch(signout())
    },
    render () {
        return (
            <Signout props={this.props} />
        )
    }
})

export default connect()(SignoutContainer)
