import React, { PropTypes } from 'react'
import { Map } from 'immutable'
import FlatButton from 'material-ui/FlatButton';
import { AppConnectionCard } from 'components'
import { formatTimestamp } from 'helpers/utils'

const {func} = PropTypes

/**
 * App() returns an individual app component
 * which contains the AppCard.
 */
App.propTypes = {
    connection: PropTypes.instanceOf(Map),
    goToAppConnectionDetail: func,
    deleteAppConnection: func
}

// TODO: Only initial setup, refer to App component for guidance.
function AppConnection(props) {

    const renderActions = ({ deleteAppConnection }) => {
        const connectionId = props.app.get('connectionId')
        const appId = props.app.get('appId')
        return (
            <div>
                <FlatButton label="Add Connection" />
                <FlatButton onClick={(event) => deleteAppConnection(event, connectionId, appId)} label="Delete" />
            </div>
        )
    }

    return (
        <AppCard
            className={appConnectionContainer}
            backendSiteUri={props.app.get('backendSiteUri')}
            appConnectionUri={props.app.get('appConnectionUri')}
            appConnectionType={props.app.get('appConnectionType')}
            appConnectionName={props.app.get('appConnectionName')}
            goToAppConnectionDetail={props.goToAppConnectionDetail}
            actions={renderActions(props)}
        />
    )

}

export default App
