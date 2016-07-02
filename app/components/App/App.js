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
    goToAppDetail: func
}

function App(props) {

    const renderActions = ({ goToAppDetail }) => {
        return (
            <div>
                <FlatButton onClick={goToAppDetail} label="View Details" />
                <FlatButton label="Add Hook" />
                <FlatButton label="Delete" />
            </div>
        )
    }

    return (
        <AppCard
            className={appContainer}
            title={props.app.get('text')}
            actions={renderActions(props)}
        />
    )

}

export default App
