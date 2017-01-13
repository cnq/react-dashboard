import React, { PropTypes, Component } from 'react'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/content/create'
import PowerIcon from 'material-ui/svg-icons/action/power-settings-new'
import ReactTooltip from 'react-tooltip'
import { UserCard, DialogConfirm } from 'components'
import s from './User.css'

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDeleteConfirmation: false
        }
    }
    openDeleteConfirmation = () => {
        this.setState({
            ... this.state,
            showDeleteConfirmation: true
        })
    }
    closeDeleteConfirmation = () => {
        this.setState({
            ... this.state,
            showDeleteConfirmation: false
        })
    }
    roleChange = (value) => {
        this.props.user.isAccountAdmin = value;
        this.props.handleRoleChange(this.props.user);
    }

    render () {
        const renderCardActions = (props) => {
            return (
                    props.isAuthenticatedUserAnAdmin ? 
                        <div>
                            <DeleteIcon data-tip data-for='delete' onClick={(event) => {event.stopPropagation(); this.openDeleteConfirmation();}} color={'#D4D4D4'} hoverColor={'#ff4242'} style={{width: '32px', cursor: 'pointer'}}  />
                            <ReactTooltip id='delete' type='error' effect='solid'>
                                <span>Delete</span>
                            </ReactTooltip>
                        </div>
                    : <div/>
            )
        }
        const renderMessage = () => {
            return (
                <div style={{fontSize: '1.5em', lineHeight: '1.5em'}}>
                    {`You are about to delete this user.`}
                    <div>{`This cannot be undone. Are you sure you want to delete?`}</div>
                </div>
            )
        }
        return (
                <div>
                    <UserCard
                        className={s.userWrapper}
                        userName={this.props.user.userName}
                        isAccountAdmin={this.props.user.isAccountAdmin}
                        isCreating={this.props.user.isCreating}
                        isDeleting={this.props.user.isDeleting}
                        actions={renderCardActions(this.props)}
                        handleRoleChange={this.roleChange}
                        allowRoleSelection={this.props.isAuthenticatedUserAnAdmin && !this.props.isUserTheAuthenticatedUser}
                    />
                    {this.props.deleteUser ?
                        <DialogConfirm
                            title = "Delete User"
                            message = {renderMessage()}
                            isOpen = {this.state.showDeleteConfirmation}
                            confirmButtonText = "Yes, Delete"
                            confirmCallback = {() => { this.closeDeleteConfirmation(); this.props.deleteUser(this.props.user); } }
                            cancelCallback = {this.closeDeleteConfirmation}     
                            /> 
                          : null
                     }
                </div>
            )
     }

}

User.propTypes = {
    user: PropTypes.object.isRequired,
    isUserTheAuthenticatedUser: PropTypes.bool,
    isAuthenticatedUserAnAdmin: PropTypes.bool,
    deleteUser: PropTypes.func.isRequired,
    handleRoleChange: PropTypes.func.isRequired,
}

export default User
