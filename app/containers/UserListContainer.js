import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { UserContainer } from 'containers'
import FlatButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add'
import { GridList, GridListItem, DialogForm, DialogAlert, UserCardAdd  } from 'components'
import { userlist as userListActions, userActions, subscriptionActions } from 'actions'
import { tableHeading, listItem } from './UserListContainer.css'
import { leftContainer, rightContainer, centeredContainer, addContainer, breathingRoom, table, uri , center, subHeader } from '../styles.css'


class UserListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUserCreateDialog: false,
            showUpgradeDialog: false
        }
    }
    openCreateUserDialog = (subscription, currentUserCount) => {
        //is user count has reached the limit defined for the subscription, then launch the upgrade dialog
        if(currentUserCount >= subscription.plan.maxUsers){
            this.setState({ ... this.state, showUpgradeDialog: true })
        }else{
            this.setState({ ... this.state, showUserCreateDialog: true })
        }
    }
    closeCreateUserDialog = () => {
        this.setState({
            ... this.state,
                showUserCreateDialog: false,
                showUpgradeDialog: false
        })
    }
    componentWillMount () {
        this.props.userListInitialize()
    }
    createUser = (user) => {
        this.props.userCreateInitialize(user)
    }
    upgradeSubscription = (subscription) => {
        if(subscription.plan.upgradeToPlan){
            subscription.plan = {id: subscription.plan.upgradeToPlan}
            this.props.subscriptionUpdateInitialize(subscription)
        }
        this.closeCreateUserDialog()
    }

    render () {
        const renderCreateUserDialog = () => {
                return ( <UserCardAdd createUser = {(user) => { this.closeCreateUserDialog(); this.createUser(user); } } /> )
        }

    return (
         <div className={centeredContainer}>
            <div className={breathingRoom} style={{width: '100%'}}>
                <h1 className={center + ' ' + subHeader}>{'Users'}</h1>
    {
                 this.props.users.length === 0  ?  '' :  
                 <div style={{width: '100%'}}>
                     <ul className={`${table} ${tableHeading}`}>
                          <li>Name</li>
                          <li></li>
                          <li></li>
                          <li>Actions</li>
                      </ul>
                      <GridList>
    {
                         this.props.users.map( (user) => (
                             <GridListItem key={user.userName}>
                                 <UserContainer user={user} isAuthenticatedUserAnAdmin={this.props.isAuthenticatedUserAnAdmin} isUserTheAuthenticatedUser={this.props.authenticatedUser == user.userName}/>
                             </GridListItem> ))
    }
                      </GridList>
                  </div>
    }
    {this.props.isAuthenticatedUserAnAdmin ? 
                        <div className={`${addContainer} ${this.props.users.length === 0 ? centeredContainer : rightContainer}`} style={{height: '50px'}}>
                            <FlatButton onClick={() => this.openCreateUserDialog(this.props.subscription, this.props.users.length)} labelStyle={{color: '#f2f2f2', fontSize: '15px', letterSpacing: '.5px'}} backgroundColor="#3ED1D6" label="Add User" icon={<AddIcon color="#f2f2f2" />} />
                        </div>    
                    : null
    }
    {this.props.isAuthenticatedUserAnAdmin  ?  
                            <div>
                                <DialogForm title = "Add User" message = {renderCreateUserDialog()} isOpen = {this.state.showUserCreateDialog} cancelCallback = {this.closeCreateUserDialog} />
                                <DialogAlert message = {"Upgrade?"} confirmButtonText={"Yes, Upgrade"} isOpen = {this.state.showUpgradeDialog} cancelCallback = {this.closeCreateUserDialog} confirmCallback = {() => this.upgradeSubscription(this.props.subscription)}/>
                            </div>
                            : null
    }
            </div>
         </div>
    )
    }
    }

UserListContainer.propTypes = {
        fetchComplete: PropTypes.bool.isRequired,
        authenticatedUser: PropTypes.string.isRequired,
        isAuthenticatedUserAnAdmin: PropTypes.bool.isRequired,
        users: PropTypes.array,
        subscription: PropTypes.object
    }

const mapStateToProps = ({userlist, signin, fetchSubscription}) => {
return {
        fetchComplete: !userlist.isFetching,
        authenticatedUser: (signin.user? signin.user.userName : ""),
        isAuthenticatedUserAnAdmin: (signin.user? signin.user.isAccountAdmin : false),
        users: userlist.users,
        subscription: fetchSubscription.subscription
    }
}

export default withRouter(connect( mapStateToProps, {...userListActions, ...userActions, ...subscriptionActions} )(UserListContainer))
