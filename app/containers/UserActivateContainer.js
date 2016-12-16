import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { LoadingIndicator } from 'components'
import { userActions } from 'actions'
import { errorMsg, centeredContainer } from '../styles.css'


class UserActivateContainer extends Component {

    propTypes : {
        isActivating: PropTypes.bool.isRequired,
        isActivated: PropTypes.bool.isRequired,
        failed: PropTypes.bool.isRequired
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
            <div className={centeredContainer}>
                { this.props.isActivating ? <LoadingIndicator size={2} /> : null }
                { this.props.failed ? 
                    <div>
                        <h2>There is something wrong with that link...</h2>
                        <h2>Go <a href="/forgot">here</a> to request a new one</h2> 
                    </div>
                    : null
                }
            </div> 
        )
    }
}

const mapStateToProps = ({activateUser}) => {
    return {
        isActivating: activateUser.isActivating,
        isActivated: activateUser.isActivated,
        failed: activateUser.failed
    }
}

export default  withRouter(connect( mapStateToProps, {...userActions})(UserActivateContainer))