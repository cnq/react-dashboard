import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionDownload from 'material-ui/svg-icons/file/file-download';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import NavMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import Badge from 'material-ui/Badge';
import { AppCard, DialogConfirm } from 'components';
import { errorMsg } from '../styles.css';
import s from './App.css';

const styles = {
    iconStyle : { height: '20px', width:'20px' },
    iconColor: { color: '#ffffff' },
    menuItemStyle : { fontSize: '14px' },
    innerDivStyle : { paddingLeft: '52px'}
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valueSingle: '',
            showDeleteConfirmation: false
        }
    }

    handleChangeSingle = (event, value) => {
        this.setState({
            ... this.state,
            valueSingle: value
        })
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

    render () {

        const renderActions = () => {
            return (
                <div>
                    <FlatButton onClick={(event) => this.props.goToAppConnections(event, this.props.app.appId)} label="View Connections" />
                    <Badge badgeContent={this.props.app.connections.length} primary={true} />
                </div>
            )
    }

    const renderMenu = ({deleteApp}) => {
        const { menuItemStyle, iconStyle, innerDivStyle } = styles
        return (
            <IconMenu iconButtonElement={<IconButton><NavMoreVert color={'#ffffff'} /></IconButton>} onChange={this.handleChangeSingle} value={this.state.valueSingle}>
                <MenuItem style={menuItemStyle} innerDivStyle={innerDivStyle} value="1" primaryText="Site Settings" leftIcon={<ActionSettings style={iconStyle} />} />
                <MenuItem style={menuItemStyle} innerDivStyle={innerDivStyle} value="2" primaryText="Download Config Files" leftIcon={<ActionDownload style={iconStyle} />} />
                <MenuItem style={menuItemStyle} innerDivStyle={innerDivStyle} value="3" primaryText="Delete Site" leftIcon={<ActionDelete style={iconStyle} />} onClick={(event) => {event.stopPropagation(); this.openDeleteConfirmation()}} />
            </IconMenu>
            )
                }

    const renderSiteUri = (backendSiteUri) => {
        return (
            <div style={{color: '#fff', display: 'inline-block', position: 'relative', top: '-7px'}}>{backendSiteUri}</div>
        )
            }

    return (
              this.props.isFetching === true ?   <div></div>
                :   <div>
                        <AppCard className={s.appContainer} isCreating={this.props.app.isCreating} isDeleting={this.props.app.isDeleting}
                            backendSiteUri={renderSiteUri(this.props.app.backendSiteUri)}
                            uri={this.props.app.uri}
                            actions={renderActions(this.props)}
                            menu={renderMenu(this.props)} />
                        <DialogConfirm
                            title = "Delete Site"
                            message = {"You are about to delete the site " + this.props.app.backendSiteUri + " .  This cannot be undone.  Are you sure?"}
                            isOpen = {this.state.showDeleteConfirmation}
                            confirmButtonText = "Yes, Delete"
                            confirmCallback = {() => { this.closeDeleteConfirmation(); this.props.deleteApp(this.props.app)} }
                            cancelCallback = {this.closeDeleteConfirmation}
                            
                            />
                    </div>         
                        
     )
                        }
   
                        }

                            App.propTypes = {
                            app: PropTypes.object.isRequired,
                            goToAppConnections: PropTypes.func.isRequired,
                            deleteApp: PropTypes.func.isRequired
                        }

export default App
