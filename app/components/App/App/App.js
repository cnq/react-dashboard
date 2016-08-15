import React, { PropTypes } from 'react'
import { Map, List } from 'immutable'
import FlatButton from 'material-ui/FlatButton';
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
                <FlatButton onClick={props.goToAppConnections} label="View Connections" />
                <FlatButton onClick={(event) => deleteApp(event, appId, uid)} label="Delete Site" />
            </div>
        )
    }

    const connections = (props) => {
        const connectionCount = props.app.get('connections') != null ? List(props.app.get('connections')).size : 0
        return (
            <Badge
                badgeContent={connectionCount}
                primary={true}
            />
        )
    }

    return (
        <AppCard
            className={appContainer}
            backendSiteUri={props.app.get('backendSiteUri')}
            uri={props.app.get('uri')}
            connections={connections(props)}
            goToAppDetail={props.goToAppDetail}
            goToAppConnections={props.goToAppConnections}
            actions={renderActions(props)}
        />
    )

}

export default App
