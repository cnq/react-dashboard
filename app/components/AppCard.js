import React, { PropTypes } from 'react'
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import { LoadingIndicator } from 'components'

const styles = {
    cardStyle: {
        borderRadius: '5px',
        color: '#383838'
    },
    headerStyle: {
        padding: 0,
        borderRadius: '5px 5px 0 0',
        borderBottom: 'solid 1px #D4D4D4'
    },
    textStyle: {
        display: 'none',
        paddingRight: '0',
        color: '#383838'
    },
    cardTitleStyle: {
        padding: '0',
        borderRadius: '5px 5px 0 0',
        backgroundColor: '#f7f7f7'
    },
    actionStyle: {
        padding: 0,
        backgroundColor: '#f7f7f7',
        borderTop: 'solid 1px #D4D4D4',
        borderRadius: '0 0 5px 5px',
        padding: '1.5em 1em'
    }
}

AppCard.propTypes = {
    isCreating: PropTypes.bool,
    isDeleting: PropTypes.bool
}

function AppCard (props) {
    const { cardStyle, headerStyle, textStyle, cardTitleStyle } = styles
    return (
        <Card style={cardStyle}>
            <CardHeader style={headerStyle} textStyle={textStyle}>
                <CardTitle style={cardTitleStyle}>
                    {props.cardTitle}
                </CardTitle>
            </CardHeader>
                {props.isCreating || props.isDeleting  ? <LoadingIndicator size={1} /> :
                    <div>
                    <CardText style={{textAlign: 'center'}}>
                        {props.connectionCount}
                        {props.children}
                    </CardText>
                    </div>
                }
        

        </Card>
    )
}

export default AppCard
