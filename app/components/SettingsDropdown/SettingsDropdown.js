import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router'
import FlatButton from 'material-ui/FlatButton';
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Settings from 'material-ui/svg-icons/action/settings';
import Billing from 'material-ui/svg-icons/editor/attach-money';
import Profile from 'material-ui/svg-icons/social/person';
import Signout from 'material-ui/svg-icons/action/exit-to-app';

const { object } = PropTypes

class SettingsDropdown extends Component {

    propTypes: {
        user: object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget
        })
    }

    handleRequestClose = () => {
        this.setState({
            open: false
        })
    }

    handleChange = (event, value) => {
        const { router } = this.props

        event.stopPropagation()
        this.setState({open: false})
        router.push(value)
    }
    
    render() {

        const { user } = this.props

        return (
            <div>
                <FlatButton
                    label={user.name}
                    icon={<Avatar src={user.avatar} />}
                    onTouchTap={this.handleTouchTap}
                    style={{
                        height: '46px',
                        lineHeight: '46px'
                    }}
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    animation={PopoverAnimationVertical}
                >
                    <Menu onChange={this.handleChange} desktop={true} width={180}>
                        <MenuItem value="/dashboard/profile" primaryText="Profile" rightIcon={<Profile />} />
                        <MenuItem value="/dashboard/settings" primaryText="Settings" rightIcon={<Settings />} />
                        <MenuItem value="/dashboard/billing" primaryText="Billing" rightIcon={<Billing />} />
                        <Divider />
                        <MenuItem value="/signout" primaryText="Sign Out" rightIcon={<Signout />} />
                    </Menu>
                </Popover>
            </div>
        )
    }
}

export default withRouter(SettingsDropdown)