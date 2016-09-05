import React, { Component, PropTypes } from 'react'
import { Signout } from 'views'
import { signout } from 'actions'
import { connect } from 'react-redux'

const { func } = PropTypes

/**
 * SignoutContainer() passes the props to
 * the Signout component.
 **/
class SignoutContainer extends Component {

    componentDidMount () {
        this.props.dispatch(signout())
    }

    render () {
        return (
            <Signout props={this.props} />
        )
    }

}

SignoutContainer.propTypes = {
    dispatch: func.isRequired
}

export default connect()(SignoutContainer)
