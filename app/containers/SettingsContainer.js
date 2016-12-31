import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { UserListContainer, SubscriptionInfoContainer} from 'containers';


class SettingsContainer extends Component {
    render () {
        return (
            <div>
                <UserListContainer props={this.props}>
                    {this.props.children}
                </UserListContainer>
                <SubscriptionInfoContainer props={this.props}>
                    {this.props.children}
                </SubscriptionInfoContainer>
            </div>
            )
    }
}

export default connect()(SettingsContainer)