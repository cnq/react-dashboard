import React, { PropTypes } from 'react'
import { Map } from 'immutable'
import FlatButton from 'material-ui/FlatButton';
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
    goToAppDetail: func,
    deleteApp: func
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

return (
        <AppCard
            className={appContainer}
            app={props.app}
            goToAppDetail={props.goToAppDetail}
            actions={renderActions(props)}
        />
    )

}

export default App
