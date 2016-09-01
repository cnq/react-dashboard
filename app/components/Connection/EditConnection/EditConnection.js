import React, { Component, PropTypes } from 'react'
import { Map } from 'immutable'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';
import { formatConnection } from 'helpers/utils'
import {
    centeredContainer,
    breathingRoom,
    uri
} from 'shared/styles.css'
import {
    newConnectionInputWrapper,
    step
} from './styles.css'

const styles = {
    buttonSelectedStyle: {
        fontSize: '24px',
        border: '1px solid #00DFFC',
        marginRight: '40px',
        height: '56px',
        width: '138px',
        paddingBottom: '3px'
    },
    buttonStyle: {
        fontSize: '24px',
        border: '1px solid #666',
        marginRight: '40px',
        height: '56px',
        width: '138px',
        paddingBottom: '3px'
    },
    buttonLabelStyle: {
        fontSize: '.5em',
        fontWeight: '300'
    }
}

const {
    object,
    string,
    func
} = PropTypes

/**
 * AddConnection() returns component that displays necessary
 * input fields for adding new connections.
 */
class EditConnection extends Component {

    state = {
        finished: false,
        editing: false,
        stepIndex: 0,
    }

    componentWillUnmount() {
        //set to empty string when component mounts
        this.props.updateConnectionType('')
        this.props.updateConnectionName('')
        this.props.updateConnectionUri('')
        //we've completted editing
        this.props.editingConnectionUriComplete()
        this.props.editingConnectionTypeComplete()
        this.props.editingConnectionNameComplete()
    }

    onClickUpdateConnection = (props)  => {
        props.connectionFanout(
            formatConnection (
                props.connectionId,
                props.connectionUri,
                props.connectionType,
                props.connectionName,
                props.app.get('appId'),
                props.app.get('backendSiteUri')
            )
        )
        this.context.router.push('/dashboard/apps/app/' + props.app.get('appId') + '/connections')
    }

    renderButtons = (props) => {
        const { buttonSelectedStyle, buttonStyle, buttonLabelStyle } = styles
        return (
            <div className={`${centeredContainer} ${breathingRoom}`}>
                <div>
                    <FlatButton
                        label="Directory"
                        style={props.connectionType === 'directory' ? buttonSelectedStyle : buttonStyle}
                        labelStyle={buttonLabelStyle}
                        rippleColor={'#00DFFC'}
                        hoverColor={'#00DFFC'}
                        onTouchTap={() =>  {props.updateConnectionType('directory')}}
                    />
                    <FlatButton
                        label="Page"
                        style={props.connectionType === 'page' ? buttonSelectedStyle : buttonStyle}
                        labelStyle={buttonLabelStyle}
                        rippleColor={'#00DFFC'}
                        hoverColor={'#00DFFC'}
                        onTouchTap={() =>  {props.updateConnectionType('page')}}
                    />
                </div>
            </div>

        )
    }

    //TODO: Set this up so that it is leading text of connectionUri with ${backendSiteUri}
    render () {
        //console.log('--------------------------')
        //console.log('index: ', this.state.stepIndex)
        //console.log(this.state.finished ? 'finished' : 'not finished')
        //console.log(this.state.editing ? 'editing' : 'not editing')
        //console.log('--------------------------')
        const { buttonStyle, buttonLabelStyle } = styles
        return (
            <div style={{width: '100%', maxWidth: 1200, margin: 'auto'}}>
                <div className={centeredContainer}>
                    <div className={breathingRoom}>
                        <h3>What type of content would you like to connect to this website?</h3>
                        {this.renderButtons(this.props)}
                    </div>
                    <div className={`${centeredContainer} ${breathingRoom}`}>
                        <h3>What would you like to name your {`${this.props.connectionType ? this.props.connectionType : 'content '}${this.props.connectionType === 'page' ? '' : `'s directory`}`}?</h3>
                        <TextField
                            value={this.props.connectionName}
                            maxLength={340}
                            type="text"
                            style={{width: '340px'}}
                            floatingLabelText={`${this.props.connectionType ? this.props.connectionType : 'content'}${this.props.connectionType === 'page' ? '' : ` directory`} name`}
                            hintText={`Enter a name for the ${this.props.connectionType ? this.props.connectionType : 'content '}${this.props.connectionType === 'page' ? '' : `'s directory`}`}
                            onChange={
                                (event) =>  {
                                    this.props.editingConnectionName()
                                    this.props.updateConnectionName(event.target.value)
                                }
                            }
                        />
                    </div>
                    <div className={`${centeredContainer} ${breathingRoom}`}>
                        <h3>What is the URL where your {`${this.props.connectionType ? this.props.connectionType : 'content '}`} is located?</h3>
                        <TextField
                            value={this.props.connectionUri}
                            maxLength={340}
                            type="text"
                            style={{width: '340px'}}
                            floatingLabelText={`${this.props.connectionType ? this.props.connectionType : 'content'} location`}
                            hintText={`Enter the URL location for the ${this.props.connectionType ? this.props.connectionType : 'content '}`}
                            onChange={
                                (event) =>  {
                                    this.props.editingConnectionUri()
                                    this.props.updateConnectionUri(event.target.value)
                                }
                            }
                        />
                    </div>
                    <div className={`${centeredContainer} ${breathingRoom}`}>
                        <h4>If the information you have entered is correct, click the 'Connect' button below.</h4>
                        <div className={`${centeredContainer} ${breathingRoom}`}>
                            <FlatButton
                                style={buttonStyle}
                                labelStyle={buttonLabelStyle}
                                rippleColor={'#00DFFC'}
                                hoverColor={'#00DFFC'}
                                onTouchTap={
                                    () => {
                                        this.props.editingConnectionType()
                                        this.onClickUpdateConnection(this.props)
                                    }
                                }
                            >
                                {`Save`}
                            </FlatButton>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

EditConnection.propTypes = {
    connectionId: string.isRequired,
    connectionUri: string.isRequired,
    connectionType: string.isRequired,
    connectionName: string.isRequired,
    app: PropTypes.instanceOf(Map),
    updateConnectionUri: func.isRequired,
    updateConnectionType: func.isRequired,
    updateConnectionName: func.isRequired,
    connectionFanout: func.isRequired
}

EditConnection.contextTypes = {
    router: object.isRequired
}

export default EditConnection
