import React, { PropTypes } from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {
    cardWrapper
} from './styles.css'

const {
    object,
    string,
    func
} = PropTypes

/**
 * AppCard() returns an UI Card component
 */
AppCard.propTypes = {
    backendSiteUri: string.isRequired,
    uri: string.isRequired,
    goToAppDetail: func,
    goToAppConnections: func,
    actions: object.isRequired,
    settings: object.isRequired
}

function AppCard (props) {

    return (
        <Card>
            <CardHeader title={props.backendSiteUri}>
                {props.settings}
            </CardHeader>
            <CardText>
                <a href={props.uri} target="_blank">{props.uri}</a>
                {props.children}
            </CardText>
            <CardActions>{props.actions}</CardActions>
        </Card>
    )
}

export default AppCard
