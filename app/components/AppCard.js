import React, { PropTypes } from 'react'
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';

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

AppCard.propTypes = {
    uri: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
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
