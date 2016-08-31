import React, { PropTypes } from 'react'
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import {
    cardWrapper
} from './styles.css'

const styles = {
    cardStyle: {
        borderRadius: '10px'
    },
    headerStyle: {
        padding: 0,
        backgroundColor: '#767A7A',
        borderRadius: '10px 10px 0 0'
    },
    textStyle: {
        display: 'none',
        paddingRight: '0'
    },
    cardTitleStyle: {
        padding: '0',
        color: '#ffffff'
    }
}
const {
    object,
    string,
    func
} = PropTypes

/**
 * AppCard() returns an UI Card component
 */
AppCard.propTypes = {
    uri: string.isRequired,
    goToAppDetail: func,
    goToAppConnections: func,
    actions: object.isRequired,
}

function AppCard (props) {
    const { cardStyle, headerStyle, textStyle, cardTitleStyle } = styles
    return (
        <Card style={cardStyle}>
            <CardHeader style={headerStyle} textStyle={textStyle}>
                <CardTitle style={cardTitleStyle}>
                    {props.menu}
                    {props.backendSiteUri}
                </CardTitle>
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
