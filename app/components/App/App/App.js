import React, { Component, PropTypes } from 'react'
import { Map, List } from 'immutable'
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionDownload from 'material-ui/svg-icons/file/file-download';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import NavMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import Badge from 'material-ui/Badge';
import { AppCard } from 'components'
import { formatTimestamp } from 'helpers/utils'
import {
    appContainer,
    contentContainer,
    avatar,
    actionContainer,
    header,
    text,
    icon,
    uri
} from './styles.css'

const styles = {
    iconStyle : {
        height: '20px',
        width:'20px'
    },
    iconColor: {
        color: '#ffffff'
    },
    menuItemStyle : {
        fontSize: '14'
    },
    innerDivStyle : {
        paddingLeft: '52px'
    },
    toggleStyle: {
        marginBottom: '0',
        display: 'inline-block',
        position: 'relative',
        width: '58px',
        top: '-4px',
        right: '-180px',
        trackOnColor: {
            backgroundColor: '#00000'
        }
    }
}

const {func, array, string, bool} = PropTypes

/**
 * App() returns an individual app component
 * which contains the AppCard.
 */
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valueSingle: ''
        }
    }

    handleChangeSingle = (event, value) => {
        this.setState({
            valueSingle: value
        })
    }

    render () {
        const { props } = this

        const renderActions = () => {
            const appId = props.app.get('appId')
            const uid = props.app.get('uid')
            const connectionCount = List(props.connectionIds).size
            return (
                <div>
                    <FlatButton onClick={props.goToAppDetail} label="Edit App" />
                    <FlatButton onClick={props.goToAppConnections} label="View Connections" />

                    <Badge
                        badgeContent={connectionCount}
                        primary={true}
                    />
                </div>
            )
        }

        const renderMenu = ({deleteApp}) => {
            const appId = props.app.get('appId')
            const uid = props.app.get('uid')
            const { menuItemStyle, iconStyle, innerDivStyle } = styles
            return (
                <IconMenu
                    iconButtonElement={<IconButton><NavMoreVert color={'#ffffff'} /></IconButton>}
                    onChange={this.handleChangeSingle}
                    value={this.state.valueSingle}
                >
                    <MenuItem style={menuItemStyle} innerDivStyle={innerDivStyle} value="1" primaryText="Site Settings" leftIcon={<ActionSettings style={iconStyle} />} />
                    <MenuItem style={menuItemStyle} innerDivStyle={innerDivStyle} value="2" primaryText="Download Config Files" leftIcon={<ActionDownload style={iconStyle} />} />
                    <MenuItem style={menuItemStyle} innerDivStyle={innerDivStyle} value="3" primaryText="Delete Site" leftIcon={<ActionDelete style={iconStyle} />} onClick={(event) => deleteApp(event, appId, uid)} />
                </IconMenu>
            )
        }

        const renderSiteUri = (backendSiteUri) => {
            return (
                <div style={{color: '#fff', display: 'inline-block', position: 'relative', top: '-7px'}}>{backendSiteUri}</div>
            )
        }

        const renderToggle = () => (
            <Toggle
                label=""
                defaultToggled={true}
                style={styles.toggleStyle}
            />
        )

        return (
            props.isFetching === true
                ?   <div></div>
                :   <div>
                        <AppCard
                            className={appContainer}
                            backendSiteUri={renderSiteUri(props.app.get('backendSiteUri'))}
                            uri={props.app.get('uri')}
                            goToAppDetail={props.goToAppDetail}
                            goToAppConnections={props.goToAppConnections}
                            actions={renderActions(props)}
                            menu={renderMenu(props)}
                            toggle={renderToggle(props)}
                        />
                        {this.props.error ? <p className={errorMsg}>{props.error}</p> : null}
                    </div>
        )
    }
}

App.propTypes = {
    app: PropTypes.instanceOf(Map),
    connectionIds: array.isRequired,
    error: string.isRequired,
    isFetching: bool.isRequired,
    goToAppDetail: func.isRequired,
    goToAppConnections: func.isRequired,
    deleteApp: func.isRequired
}

export default App
