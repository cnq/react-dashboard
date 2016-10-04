import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { LoadingIndicator } from 'components'
import { signout as signoutActions } from 'actions'



class SignoutContainer extends Component {

    propTypes : {
        isSignoutComplete: PropTypes.bool.isRequired,
        isSigningOut: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired
    }

    componentDidMount() {
        this.props.signout()
    }

    render () {
        return (
            <div>
                  {
                      this.props.isSignoutComplete
                          ?  <p>You are now logged out</p> 
                          :   <LoadingIndicator size={2} />
                          }
            </div>
        )
            }
            }

const mapStateToProps = ({signout}) => {
    return {
        isSignoutComplete: signout.isSignoutComplete,
        isSigningOut: signout.isSigningOut,
        error: signout.error
    }
}

export default connect( mapStateToProps, {...signoutActions})(SignoutContainer)