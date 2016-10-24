import React, { Component, PropTypes } from 'react'
import { Map } from 'immutable'
import TextField from 'material-ui/TextField'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import { centeredContainer, center, breathingRoom, breathingRoomSmall, uri } from '../styles.css'

const styles = {
    buttonSelectedStyle: {
        fontSize: '24px',
        border: '1px solid #3ED1D9',
        marginRight: '40px',
        height: '56px',
        width: '138px',
        paddingBottom: '3px'
    },
    buttonStyle: {
        fontSize: '24px',
        border: '1px solid #D4D4D4',
        marginRight: '40px',
        height: '56px',
        width: '138px',
        paddingBottom: '3px'
    },
    buttonLabelStyle: {
        fontSize: '.5em',
        fontWeight: '300'
    },
    stepLabelStyle: {
        cursor: 'pointer'
    },
    stepInputStyle: {
        fontSize: '22px',
        lineHeight: '28px',
        width: '100%',
        height: '78px',
        border: 'solid 1px #D4D4D4',
        borderRadius: '10px',
        backgroundColor: '#fff',
        padding: '0 10px'
    },
    underlineStyles: {
        bottom: '-1px',
        left: '10px',
        width: 'calc(100% - 20px)'
    },
    floatingLabelFocusStyles: {
        top: '28px'
    }
}


class ConnectionAddStepper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            editing: false,
            stepIndex: 0
        }
    }

    componentWillUnmount () {
        //set to empty string when component mounts
        this.props.updateConnectionType('')
        this.props.updateConnectionName('')
        this.props.updateConnectionUri('')
    }

    handleNext = () => {
        const {stepIndex, editing} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
            editing: stepIndex >= 2 ? false : editing
        });
    }

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    }

    onClickCreateConnection = (props)  => {
        console.log("ConnectionAddStepper - onClickCreateConnection() called")
        props.connectionCreateInitialize(
                {
                    connectionId: "newconnection",
                    connectionUri: props.connectionUri,
                    connectionType: props.connectionType,
                    connectionName: props.connectionName,
                    appId: props.app.appId,
                    backendSiteUri: props.app.backendSiteUri,
                    isCreating: true,
                    timestamp: Date.now()
                }
            )
        this.context.router.push('/dashboard/apps/app/' + props.app.appId + '/connections')
    }

    renderButtons = (props) => {
        const { buttonSelectedStyle, buttonStyle, buttonLabelStyle } = styles
        return (
            <div className={`${center} ${breathingRoom}`}>
                <div>
                    <FlatButton
                        label="Directory"
                        style={props.connectionType === 'directory' ? buttonSelectedStyle : buttonStyle}
                        labelStyle={buttonLabelStyle}
                        rippleColor={'#3ED1D9'}
                        hoverColor={'#3ED1D9'}
                        onTouchTap={
                            () =>  {
                                props.updateConnectionType('directory')
                                this.handleNext()
                            }
                        }
                    />
                    <FlatButton
                        label="Page"
                        style={props.connectionType === 'page' ? buttonSelectedStyle : buttonStyle}
                        labelStyle={buttonLabelStyle}
                        rippleColor={'#3ED1D9'}
                        hoverColor={'#3ED1D9'}
                        onTouchTap={
                            () =>  {
                                props.updateConnectionType('page')
                                this.handleNext()
                            }
                        }
                    />
                </div>
            </div>

        )
    }

    getStepContent = (stepIndex, props) => {

        const { stepInputStyle, underlineStyles, floatingLabelFocusStyles } = styles

        switch (stepIndex) {
            case 0:
                return (
                    <div className={breathingRoom}>
                        <h3>What type of content would you like to connect to this website?</h3>
                        {this.renderButtons(props)}
                    </div>
                )
            case 1:
                return (
                    <div className={`${center} ${breathingRoom}`}>
                        <h3 className={breathingRoomSmall}>What would you like to name your {`${props.connectionType ? props.connectionType : 'content '}`}?</h3>
                        <TextField
                            value={props.connectionName}
                            maxLength={480}
                            type="text"
                            style={stepInputStyle}
                            floatingLabelText={`${props.connectionType ? props.connectionType : 'content'} name`}
                            floatingLabelFocusStyle={floatingLabelFocusStyles}
                            underlineStyle={underlineStyles}
                            hintText={`Enter a ${props.connectionType ? props.connectionType : 'content'}${props.connectionType === 'page' ? ' (e.g. mypage.html)' : ' name (e.g. blog, wiki, forum, etc.)'}`}
                            onChange={
                                    (event) =>  {
                                        props.updateConnectionName(event.target.value)
                                    }
                                }
                        />
                    </div>
                )
            case 2:
                return (
                    <div className={`${center} ${breathingRoom}`}>
                        <h3 className={breathingRoomSmall}>What is the URL where your {`${props.connectionType ? props.connectionType : 'content '}`} is located?</h3>
                        <TextField
                                value={props.connectionUri}
                                maxLength={480}
                                type="text"
                                style={stepInputStyle}
                                floatingLabelText={`${props.connectionType ? props.connectionType : 'content'} location`}
                                floatingLabelFocusStyle={floatingLabelFocusStyles}
                                underlineStyle={underlineStyles}
                                hintText={`Enter the URL location for the ${props.connectionType ? props.connectionType : 'content '}`}
                                onChange={
                                    (event) =>  {
                                        props.updateConnectionUri(event.target.value)
                                    }
                                }
                        />
                    </div>
                )
            default:
                return `Let's get started!'`;
        }
    }

    //TODO: Set this up so that it is leading text of connectionUri with ${backendSiteUri}
    render () {
        //console.log('--------------------------')
        //console.log('index: ', this.state.stepIndex)
        //console.log(this.state.finished ? 'finished' : 'not finished')
        //console.log(this.state.editing ? 'editing' : 'not editing')
        //console.log('--------------------------')
        const { buttonStyle, stepLabelStyle, buttonLabelStyle } = styles
        const {finished, editing, stepIndex} = this.state
        return (
            <div className={centeredContainer}>
                <div>
                    <h1 className={breathingRoom}>ADDING CONNECTION: <span className={uri}>{this.props.app.backendSiteUri}</span></h1>
                </div>
                <Stepper style={{width: '100%', maxWidth: '1024px', margin: 'auto'}} activeStep={stepIndex}>
                    <Step>
                        <StepLabel style={stepLabelStyle} onTouchTap={() => this.setState({stepIndex: 0, editing: true})}>
                           {`${this.props.connectionType ? 'Type: ' : 'Choose type'} ${this.props.connectionType}`}
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel style={stepLabelStyle} onTouchTap={() => this.setState({stepIndex: 1, editing: true})}>
                            {
                                this.props.connectionType === 'page'
                                    ?   `${this.props.connectionName ? 'Page name: /' : 'Set page name'}${this.props.connectionName}`
                                    :   `${this.props.connectionName ? 'Directory name: /' : 'Set directory name'}${this.props.connectionName}`
                            }
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel style={stepLabelStyle} onTouchTap={() => this.setState({stepIndex: 2, editing: true})}>
                            {
                                this.props.connectionType === 'page'
                                    ?   `${this.props.connectionUri ? 'Page location: ' : 'Set page location'}${this.props.connectionUri}`
                                    :   `${this.props.connectionUri ? 'Directory location: ' : 'Enter directory\'s location'} ${this.props.connectionUri}`
                            }
                        </StepLabel>
                    </Step>
                </Stepper>
                <div className={center}>
                    { finished && !editing
                        ?   <div className={`${center} ${breathingRoom}`}>
                                <h4>If the information you have entered is correct, click the 'Connect' button below.</h4>
                                <div className={`${center} ${breathingRoom}`}>
                                    <FlatButton
                                        style={buttonStyle}
                                        labelStyle={buttonLabelStyle}
                                        rippleColor={'#3ED1D9'}
                                        hoverColor={'#3ED1D9'}
                                        onTouchTap={() => this.onClickCreateConnection(this.props)}
                                    >
                                        {`Connect`}
                                    </FlatButton>
                                </div>
                            </div>
                        :   <div>
                                {this.getStepContent(stepIndex, this.props)}
                                { stepIndex === 0
                                    ?   ''
                                    :   <div className={`${center} ${breathingRoom}`}>
                                            <div style={{position: 'relative'}}>
                                                <FlatButton
                                                    label="Back"
                                                    disabled={stepIndex === 0}
                                                    style={{position: 'relative', left: '0'}}
                                                    hoverColor="none"
                                                    onTouchTap={this.handlePrev}
                                                />
                                                <FlatButton
                                                    label="Next"
                                                    primary={true}
                                                    style={{position: 'relative', right: '0'}}
                                                    hoverColor="none"
                                                    onTouchTap={this.handleNext}
                                                />
                                                {   finished
                                                        ?   <FlatButton
                                                                label="Connect"
                                                                primary={true}
                                                                style={{position: 'relative', right: '0'}}
                                                                hoverColor="none"
                                                                onTouchTap={() => this.onClickCreateConnection(this.props)}
                                                            />
                                                        :   ''
                                                }
                                            </div>
                                         </div>
                                    }
                            </div>
                    }
                </div>
            </div>
        )
    }

}

ConnectionAddStepper.propTypes = {
    connectionUri: PropTypes.string.isRequired,
    connectionType: PropTypes.string.isRequired,
    connectionName: PropTypes.string.isRequired,
    app: PropTypes.object.isRequired,
    updateConnectionUri: PropTypes.func.isRequired,
    updateConnectionType: PropTypes.func.isRequired,
    updateConnectionName: PropTypes.func.isRequired,
    connectionCreateInitialize: PropTypes.func.isRequired
}

ConnectionAddStepper.contextTypes = {
router: PropTypes.object.isRequired
}

export default ConnectionAddStepper
