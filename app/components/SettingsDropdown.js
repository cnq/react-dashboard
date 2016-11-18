import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router'
import FlatButton from 'material-ui/FlatButton';
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Settings from 'material-ui/svg-icons/action/settings';
import Profile from 'material-ui/svg-icons/social/person';
import Signout from 'material-ui/svg-icons/action/exit-to-app';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import s from './Navigation.css'

class SettingsDropdown extends Component {

    propTypes: {
        user: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = { open: false }
    }

    handleTouchTap = (event) => {
        event.preventDefault();
        this.setState({ open: true, anchorEl: event.currentTarget })
    }

    handleRequestClose = () => {
        this.setState({ open: false })
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
                <FlatButton className={s.link} icon={<MenuIcon color={'#F2F2F2'} hoverColor={'#3ED1D6'} />} onTouchTap={this.handleTouchTap} hoverColor={'none'} rippleColor={'none'} style={{ height: '65px', lineHeight: '65px' }} />
                <Popover open={this.state.open} anchorEl={this.state.anchorEl} anchorOrigin={{horizontal: 'left', vertical: 'bottom'}} targetOrigin={{horizontal: 'left', vertical: 'top'}} onRequestClose={this.handleRequestClose} animation={PopoverAnimationVertical}>
                    <Menu onChange={this.handleChange} desktop={true} width={180}>
                        <MenuItem value={"/profile"} primaryText="Profile" rightIcon={<Profile />} />
                        <MenuItem value="/dashboard/users" primaryText="Settings" rightIcon={<Settings />} />
                        <Divider />
                        <MenuItem value="/signout" primaryText="Sign Out" rightIcon={<Signout />} />
                    </Menu>
                </Popover>
            </div>
         )
    }
}

export default withRouter(SettingsDropdown)