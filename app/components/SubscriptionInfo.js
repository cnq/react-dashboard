import React, { PropTypes, Component } from 'react'
import {Card, CardText, } from 'material-ui/Card'
import { cardContainer } from '../styles-card.css'
import { table, dataTable } from '../styles.css'
import FlatButton from 'material-ui/RaisedButton';


class SubscriptionInfo extends Component {
    handleManageClick = () => {
        this.props.handleManageSubscription()
    }
    render () {
        return (
                <Card style={{boxShadow: "none", border: "solid rgba(0, 0, 0, 0.117647)", borderWidth: "0 1px 1px 1px", borderRadius: "0"}} containerStyle={{padding: "0"}}>
                {this.props.subscription ?
                    <CardText className={cardContainer} style={{padding: "0"}}>
                            <ul className={`${table} ${dataTable}`}>
                                 <li>{`Plan`}</li>
                                 <li>{this.props.subscription.plan}</li>
                            </ul>
                            {this.props.subscription.inTrial? 
                            <ul className={`${table} ${dataTable}`}>
                                 <li>{`Your trial ends in ${this.props.subscription.trialDays} days`}</li>
                            </ul>
                            : null
                            }
                            <ul className={`${table} ${dataTable}`}>
                                 <li>
                                    <FlatButton onClick={this.handleManageClick} labelStyle={{color: '#f2f2f2', fontSize: '15px', letterSpacing: '.5px'}} backgroundColor="#3ED1D6" label="Manage" />
                                 </li>
                            </ul>
                    </CardText>
                    : null
                }
                </Card>  
            )
                }
                }

SubscriptionInfo.propTypes = {
                    handleManageSubscription: PropTypes.func.isRequired,
                    subscription: PropTypes.object
                }

export default SubscriptionInfo
