import React, { PropTypes } from 'react'
import { Map } from 'immutable'
import TextField from 'material-ui/TextField'
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import { ConnectionCard } from 'components'
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

const {
    object,
    string,
    func
} = PropTypes

/**
 * AddConnection() returns component that displays necessary
 * input fields for adding new connections.
 */



class AddConnection extends React.Component {

    state =  {
        finished: false,
        stepIndex: 0
    }

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2
        })
    }

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    }

    onClickCreateConnection = (props)  => {
        console.log('Made it here')
        props.connectionFanout(
            formatConnection(
                props.connectionUri,
                props.connectionType,
                props.connectionName,
                props.app.get('appId'),
                props.app.get('backendSiteUri')
            )
        )
        this.context.router.push('/dashboard/app/' + props.app.get('appId') + '/connections')
    }

    getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return <TextField
                            value={this.props.connectionType}
                            maxLength={40}
                            type="text"
                            floatingLabelText={`Content type`}
                            hintText={`Please enter blog, wiki, page, etc.`}
                            onChange={
                                (event) =>  {
                                    this.props.updateConnectionType(event.target.value)
                                }
                            }
                        />
            case 1:
                return <TextField
                            value={this.props.connectionName}
                            maxLength={140}
                            type="text"
                            floatingLabelText={`Content name`}
                            hintText={`Enter '/blog', '/page-name', etc.`}
                            onChange={
                                (event) =>  {
                                    this.props.updateConnectionName(event.target.value)
                                }
                            }
                        />
            case 2:
                return <TextField
                            value={this.props.connectionUri}
                            maxLength={140}
                            type="text"
                            floatingLabelText={`Content location`}
                            hintText={`Please enter your blog's URL`}
                            onChange={
                                (event) =>  {
                                    this.props.updateConnectionUri(event.target.value)
                                }
                            }
                        />
            default:
                return `Let's get started!'`;
        }
    }

    //TODO: Set this up so that it is leading text of connectionUri with ${backendSiteUri}

    render () {
        const {finished, stepIndex} = this.state
        const contentStyle = {margin: '0 16px'}
        return (
            <div style={{width: '100%', maxWidth: 1200, margin: 'auto'}}>
                <div className={centeredContainer}>
                    <h1 className={breathingRoom}><span className={uri}>{this.props.app.get('backendSiteUri')}</span></h1>
                </div>
                <Stepper activeStep={stepIndex}>
                    <Step>
                        <StepLabel>Select type of content</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Name your content</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Set location of the content</StepLabel>
                    </Step>
                </Stepper>
                <div className={centeredContainer}>
                    { finished
                        ?   <FlatButton onTouchTap={() => this.onClickCreateConnection(this.props)}>
                                {`Connect`}
                            </FlatButton>
                        :   <div>
                                {this.getStepContent(stepIndex)}
                                <div style={{marginTop: 12}}>
                                    <FlatButton
                                        label="Back"
                                        disabled={stepIndex === 0}
                                        onTouchTap={this.handlePrev}
                                        style={{marginRight: 12}}
                                    />
                                    <FlatButton
                                        label={stepIndex === 2 ? 'Connect' : 'Next'}
                                        primary={true}
                                        onTouchTap={this.handleNext}
                                    />
                                </div>
                            </div>
                    }
                </div>
            </div>
        )
    }

}

AddConnection.propTypes = {
    connectionUri: string.isRequired,
    connectionType: string.isRequired,
    connectionName: string.isRequired,
    app: PropTypes.instanceOf(Map),
    updateConnectionUri: func.isRequired,
    updateConnectionType: func.isRequired,
    updateConnectionName: func.isRequired,
    connectionFanout: func.isRequired
}

AddConnection.contextTypes = {
    router: object.isRequired
}

export default AddConnection
