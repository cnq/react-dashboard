import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { subscriptionActions } from 'actions'
import FlatButton from 'material-ui/RaisedButton';
import { SubscriptionInfo } from 'components'
import { centeredContainer, breathingRoom, center, subHeader } from '../styles.css'

class SubscriptionInfoContainer extends Component {

    propTypes : {
        managementUrl: PropTypes.string.isRequired,
        subscription: PropTypes.object
    }

    componentWillMount () {
        this.props.subscriptionFetchInitialize()
    }
 
    manageSubscription = () => {
        this.props.subscriptionManageInitialize()
    }
    updateSubscription = (subscription) => {
        this.props.subscriptionUpdateInitialize(subscription)
    }
    componentDidUpdate() {
        if(this.props.managementUrl){
            window.location = this.props.managementUrl;
        }
     }

    render () {
        return (
                <div className={centeredContainer}>
                    <div className={breathingRoom} style={{width: '100%'}}>
                        <h1 className={center + ' ' + subHeader}>{'Subscription & Billing'}</h1>
                        <div>
                            <SubscriptionInfo handleManageSubscription={this.manageSubscription} handleUpgradeSubscription={this.updateSubscription} subscription={this.props.subscription}/>
                        </div>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = ({fetchSubscription, manageSubscription}) => {
    return{
        subscription: fetchSubscription.subscription,
        error: fetchSubscription.error,
        managementUrl: manageSubscription.subscriptionManagementUrl
    }
}

export default connect( mapStateToProps, {...subscriptionActions} )(SubscriptionInfoContainer)
