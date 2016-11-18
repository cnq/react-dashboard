import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { UserContainer } from 'containers'
import FlatButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add'
import { GridList, GridListItem, DialogConfirm, UserCardAdd  } from 'components'
import { userlist as userListActions, userActions } from 'actions'
import { tableHeading, listItem } from './UserListContainer.css'
import { leftContainer, rightContainer, centeredContainer, addContainer, breathingRoom, table, uri } from '../styles.css'


class UserListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUserCreateDialog: false
        }
    }
    openCreateUserDialog = () => {
        this.setState({
            ... this.state,
                showUserCreateDialog: true
        })
    }
    closeCreateUserDialog = () => {
        this.setState({
            ... this.state,
                showUserCreateDialog: false
        })
    }
    componentWillMount () {
        this.props.userListInitialize()
    }
    createUser = (user) => {
        this.props.userCreateInitialize(user)
    }

    render () {
        const renderCreateUserDialog = () => {
                return ( <UserCardAdd createUser = {(user) => { this.closeCreateUserDialog(); this.createUser(user); } } /> )
        }
        return (
             <div className={centeredContainer}>
                <div className={breathingRoom} style={{width: '100%'}}>
                    {this.props.isAuthenticatedUserAnAdmin ? 
                        <div className={`${addContainer} ${this.props.users.length === 0 ? centeredContainer : rightContainer}`} style={{height: '50px'}}>
                            <FlatButton onClick={this.openCreateUserDialog} labelStyle={{color: '#f2f2f2', fontSize: '15px', letterSpacing: '.5px'}} backgroundColor="#3ED1D6" label="Add User" icon={<AddIcon color="#f2f2f2" />} />
                        </div>    
                    : null}
                </div>
                <DialogConfirm
                    title = "Add User"
                    message = {renderCreateUserDialog()}
                    isOpen = {this.state.showUserCreateDialog}
                    cancelCallback = {this.closeCreateUserDialog} />
                    {
                     this.props.users.length === 0  ?  ''
                         :  <div style={{width: '100%'}}>
                                <ul className={`${table} ${tableHeading}`}>
                                     <li>Name</li>
                                     <li></li>
                                     <li></li>
                                     <li>Actions</li>
                                 </ul>
                                 <GridList>
                                 {
                                    this.props.users.map( (user) => (
                                        <GridListItem key={user.email}>
                                            <UserContainer user={user} isAuthenticatedUserAnAdmin={this.props.isAuthenticatedUserAnAdmin}/>
                                        </GridListItem> ))
                                 }
                                 </GridList>
                            </div>
                    }
                </div>

            )
    }
}

UserListContainer.propTypes = {
        fetchComplete: PropTypes.bool.isRequired,
        isAuthenticatedUserAnAdmin: PropTypes.bool.isRequired,
        users: PropTypes.array
}

const mapStateToProps = ({userlist, signin}) => {
    return {
            fetchComplete: !userlist.isFetching,
            isAuthenticatedUserAnAdmin: (signin.user? signin.user.isAccountAdmin : false),
            users: userlist.users
        }
}

export default withRouter(connect( mapStateToProps, {...userListActions, ...userActions} )(UserListContainer))
