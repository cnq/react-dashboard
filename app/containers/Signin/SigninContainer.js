import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import { SocialSignin, FormSignin } from 'components'
import { Signin } from 'views'
import { users as actions } from 'actions'
import { formatAuthData } from 'helpers/utils'
import {
    EMAIL
} from 'config/constants'
import { paper, cardText, divider, footnote } from './styles.css'


const SigninContainer = React.createClass({

    propTypes: {
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        fetchAndHandleAuthenticatedUser: PropTypes.func.isRequired
    },

    contextTypes: {
        router: PropTypes.object.isRequired
    },

    handleAuth (authProvider, event) {
        event.preventDefault
        var authData
        if(authProvider.provider === EMAIL){
            authData = formatAuthData(authProvider, event.email, event.password)
        }else{
            authData = formatAuthData(authProvider)
        }
        this.props.fetchAndHandleAuthenticatedUser(authData)
            .then(() => {
                this.context.router.replace('dashboard')
            })
    },

    render () {

        const loading = () => (
            <CircularProgress size={2} />
        )

        const socialAuthButtons = (props, handleAuth) => {
            // Are we in production?
            if (process.env.NODE_ENV !== 'production') {
                return (
                    <div>
                        <div className={divider}>– or –</div>
                        <SocialSignin
                            isFetching={props.isFetching}
                            error={props.error}
                            onAuth={handleAuth}
                        />
                    </div>
                )
            }
        }

        const login = (props, handleAuth) => {
            return (
                <div>
                    <FormSignin
                        isFetching={props.isFetching}
                        formError={props.error}
                        onAuth={handleAuth}
                    />
                    {socialAuthButtons(props, handleAuth)}
                </div>
            )
        }
        
        return ( 
            <Signin props={this.props}>
                <Paper className={paper} zDepth={2}>
                    <Card>
                        <CardHeader
                            title="Nice to see you again!"
                            subtitle="Login to get started"
                        />
                        <CardText className={cardText}>
                            {
                                this.props.isFetching
                                    ? loading()
                                    : login(this.props, this.handleAuth)
                            }
                        </CardText>
                        <CardText className={`${footnote} ${cardText}`}>
                            <p>{`By logging in, you agree to Paperhook's`} <br /> <a target="_blank" href="/terms-of-use">{`Terms of Use`}</a> {`and`} <a target="_blank" href="/privacy-policy">{`Privacy Policy`}</a></p>
                        </CardText>
                    </Card>
                </Paper>
            </Signin>
        )
    }
})

function mapStateToProps ({users}) {
    return {
        isFetching: users.isFetching,
        error: users.error
    }
}

export default connect(mapStateToProps, actions)(SigninContainer)
