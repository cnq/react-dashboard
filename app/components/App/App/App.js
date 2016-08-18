import React, { PropTypes } from 'react'
import { Map, List } from 'immutable'
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionSettings from 'material-ui/svg-icons/action/settings';
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

const {func, array, string, bool} = PropTypes

/**
 * App() returns an individual app component
 * which contains the AppCard.
 */
App.propTypes = {
    app: PropTypes.instanceOf(Map),
    connectionIds: array.isRequired,
    error: string.isRequired,
    isFetching: bool.isRequired,
    goToAppDetail: func.isRequired,
    goToAppConnections: func.isRequired,
    deleteApp: func.isRequired
}

function App(props) {

    const renderActions = ({deleteApp}) => {
        const appId = props.app.get('appId')
        const uid = props.app.get('uid')
        const connectionCount = List(props.connectionIds).size
        return (
            <div>
                <FlatButton onClick={props.goToAppConnections} label="View Connections" />
                <IconButton tooltip="Delete site" onClick={(event) => deleteApp(event, appId, uid)}>
                    <ActionDelete />
                </IconButton>
                <Badge
                    badgeContent={connectionCount}
                    primary={true}
                />
            </div>
        )
    }

    const renderSettings = ({deleteApp}) => {
        const appId = props.app.get('appId')
        const uid = props.app.get('uid')
        return (
            <IconButton tooltip="Delete site" onClick={(event) => deleteApp(event, appId, uid)}>
                <ActionSettings />
            </IconButton>
        )
    }

    return (
        props.isFetching === true
            ?   <div></div>
            :   <div>
                    <AppCard
                        className={appContainer}
                        backendSiteUri={props.app.get('backendSiteUri')}
                        uri={props.app.get('uri')}
                        goToAppDetail={props.goToAppDetail}
                        goToAppConnections={props.goToAppConnections}
                        actions={renderActions(props)}
                        settings={renderSettings(props)}
                    />
                    {props.error ? <p className={errorMsg}>{props.error}</p> : null}
                </div>
    )

}

export default App
