import React, { PropTypes } from 'react'
import { Map } from 'immutable'
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import WebAssetIcon from 'material-ui/svg-icons/av/web-asset';
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
    domain
} from './styles.css'

const {func} = PropTypes

/**
 * App() returns an individual app component
 * which contains the AppCard.
 */
App.propTypes = {
    app: PropTypes.instanceOf(Map),
    goToAppDetail: func.isRequired,
    goToAppConnections: func.isRequired,
    deleteApp: func.isRequired
}

function App(props) {

    const renderActions = ({ deleteApp }) => {
        const appId = props.app.get('appId')
        const uid = props.app.get('uid')
        return (
            <div>
                <FlatButton label="Add Connection" />
                <FlatButton onClick={(event) => deleteApp(event, appId, uid)} label="Delete" />
            </div>
        )
    }

    const connections = (props) => (
        <div>
            <Badge
                badgeContent={6}
                primary={true}
            >
                <IconButton onClick={props.goToAppConnections} tooltip="Blogs">
                    <WebAssetIcon />
                </IconButton>
            </Badge>
            <Badge
                badgeContent={2}
                primary={true}
            >
                <IconButton onClick={props.goToAppConnections}  tooltip="Pages">
                    <WebAssetIcon />
                </IconButton>
            </Badge>
        </div>
    )

    return (
        <AppCard
            className={appContainer}
            backendSiteUri={props.app.get('backendSiteUri')}
            devSiteUri={props.app.get('devSiteUri')}
            connections={connections(props)}
            goToAppDetail={props.goToAppDetail}
            goToAppConnections={props.goToAppConnections}
            actions={renderActions(props)}
        />
    )

}

export default App
