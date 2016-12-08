import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { LoadingIndicator } from 'components'
import { userActions } from 'actions'
import { errorMsg } from '../styles.css'


class UserActivateContainer extends Component {

    propTypes : {
        isActivating: PropTypes.bool.isRequired,
        isActivated: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired
    }

    componentDidMount() {
        this.props.userActivateInitialize(this.props.location.query.code)
    }
    componentWillReceiveProps(nextProps) {

        //if the user activation succeeded ...
        if(nextProps.isActivated){
            //forward to set password
            this.props.router.push(`/user-setup?code=${this.props.location.query.code}`)
        } 
    }

    render () {
        return ( 
            <div>
                { this.props.isActivating ? <LoadingIndicator size={2} /> : null }
                { this.props.error ? <p className={errorMsg}>{this.props.error}</p> : null}
            </div> 
        )
    }
}

const mapStateToProps = ({activateUser}) => {
    return {
        isActivating: activateUser.isActivating,
        isActivated: activateUser.isActivated,
        error: activateUser.error
    }
}

export default  withRouter(connect( mapStateToProps, {...userActions})(UserActivateContainer))