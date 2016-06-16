import React, { PropTypes } from 'react'
import { Signout } from 'components'
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
            <Signout />
        )
    }
})

export default connect()(SignoutContainer)