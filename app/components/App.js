import React, { Component, PropTypes } from 'react'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import AlertError from 'material-ui/svg-icons/alert/error'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import IconView from 'material-ui/svg-icons/navigation/arrow-forward'
import MenuItem from 'material-ui/MenuItem'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import ActionDownload from 'material-ui/svg-icons/file/file-download'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import { AppCard, DialogConfirm } from 'components'
import { errorMsg, leftContainer, rightContainer } from '../styles.css'
import s from './App.css'

const styles = {
    iconStyle : { height: '20px', width:'20px' },
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

        const renderConnectionCount = () => {
            return (
                <FlatButton onClick={(event) => this.props.goToAppConnections(event, this.props.app.appId)} style={{height: 'auto'}} hoverColor="none" rippleColor="none">
                    <div className={s.connectionCount}>
                        <h4>{ this.props.app.connections.length }</h4>
                        <div>{ this.props.app.connections.length === 1 ? 'connection' : 'connections'}</div>
                    </div>
                </FlatButton>
            )
        }

        const renderCardTitle = () => {
            const { menuItemStyle, iconStyle, innerDivStyle } = styles
            return (
                <div>
                    <IconMenu iconButtonElement={<IconButton><MenuIcon color="#383838" /></IconButton>} onChange={this.handleChangeSingle} value={this.state.valueSingle}>
                        <MenuItem style={menuItemStyle} innerDivStyle={innerDivStyle} value="1" primaryText="Site Settings" leftIcon={<ActionSettings style={iconStyle} />} />
                        <MenuItem style={menuItemStyle} innerDivStyle={innerDivStyle} value="2" primaryText="Download Config Files" leftIcon={<ActionDownload style={iconStyle} />} />
                        <MenuItem style={menuItemStyle} innerDivStyle={innerDivStyle} value="3" primaryText="Delete Site" leftIcon={<ActionDelete style={iconStyle} />} onClick={(event) => {event.stopPropagation(); this.openDeleteConfirmation()}} />
                    </IconMenu>
                    <div style={{color: '#383838', display: 'inline-block', position: 'relative', top: '-7px'}}>
                        <a className={s.uri} href={this.props.app.uri} target="_blank">{this.props.app.backendSiteUri}</a>
                    </div>
                    <div style={{display: 'inline-block', position: 'relative', float: 'right'}}>
                    {this.props.app.isDnsLive ? 
                        <IconButton tooltip={`The DNS for ${this.props.app.domain} has been configured to point to IP address ${this.props.app.ipAddress}`}>
                            <ActionCheckCircle color="rgb(62, 209, 217)"></ActionCheckCircle>
                        </IconButton>
                        :
                        <IconButton tooltip={`DNS not yet configured.  The A record for domain ${this.props.app.domain} must be configured to point to IP address ${this.props.app.ipAddress} in order to complete setup.`}>
                            <AlertError color="#FBC02D"></AlertError>
                        </IconButton>
                    }

                    </div>
                </div>
            )
                    }

        const renderMessage = () => {
            return (
                <div style={{fontSize: '1.5em', lineHeight: '1.5em'}}>
                    {this.props.app.isDnsLive ? 
                    <div className={errorMsg}>{`As a result of deleting this site,`} <span className={s.uri}>{this.props.app.backendSiteUri}</span> {`will be down.`}</div> 
                    : 
                    <div>{`You are about to delete the site `}<span className={s.uri}> {this.props.app.backendSiteUri}</span></div>
                    }
                    <div>{`This cannot be undone. Are you sure you want to delete?`}</div>
                </div>
            )
                    }

        return (
              this.props.isFetching === true ?   <div></div>
                :   <div>
                        <AppCard className={s.appContainer} isCreating={this.props.app.isCreating} isDeleting={this.props.app.isDeleting}
                            cardTitle={renderCardTitle()}
                            connectionCount={renderConnectionCount()}
                            uri={this.props.app.uri}
                         />
                        <DialogConfirm
                            title = "Delete Site"
                            message = {renderMessage()}
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
