import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { User } from 'components'
import { signin as signinActions} from 'actions'
import s from './UserProfileContainer.css'

class UserProfileContainer extends Component {
    propTypes : {
        user: PropTypes.object
    }
    render () {
        return (
                <div>
                <h1 className={s.text}>{'User Profile'}</h1>
                   {this.props.user? <User user={this.props.user} /> : null}
                </div>
        )
    }
}

const mapStateToProps = ({signin}, {routeParams}) => {
    return{
        user: signin.user
    }
}

export default connect( mapStateToProps, {...signinActions} )(UserProfileContainer)
