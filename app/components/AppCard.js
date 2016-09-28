import React, { PropTypes } from 'react'
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import { LoadingIndicator } from 'components'

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
    isCreating: PropTypes.bool,
    isDeleting: PropTypes.bool,
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
                {props.isCreating || props.isDeleting  ? <LoadingIndicator size={1} /> :
                    <div>
                    <CardText>
                        <a href={props.uri} target="_blank">{props.uri}</a>
                        {props.children}
                    </CardText>
                    <CardActions>{props.actions}</CardActions>
                    </div>
                }
        

        </Card>
    )
}

export default AppCard
