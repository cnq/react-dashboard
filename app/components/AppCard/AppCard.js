import React, { PropTypes } from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {
    cardWrapper
} from './styles.css'

const {
    object,
    string
} = PropTypes

/**
 * AppCard() returns an UI Card component
 */
AppCard.propTypes = {
    backendSiteUri: string.isRequired,
    actions: object.isRequired
}

function AppCard (props) {
    return (
        <Card>
            <CardHeader title={props.backendSiteUri} />
            <CardText>{props.children}</CardText>
            <CardActions>{props.actions}</CardActions>
        </Card>
    )
}

export default AppCard
