import React, { Component, PropTypes } from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import s from '../styles.css'


export default class DialogForm extends Component {


    handleClose = () => {
        this.props.cancelCallback();
    };
    handleConfirm = () => {
        this.props.confirmCallback();
    };

    render() {
        const actions = [
            <FlatButton label="Cancel" primary={true} onTouchTap={this.handleClose} style={{color: '#383838'}} hoverColor="none" rippleColor="none" />,
        ];

    return (
          <div>
            <Dialog title={this.props.title} actions={actions} modal={true} open={this.props.isOpen} titleStyle={{backgroundColor: '#f9f9f9'}} >
                <div className={s.breathingRoom}>
                    {this.props.message}
                </div>
            </Dialog>
          </div>
        );
    }
}

DialogForm.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    cancelCallback: PropTypes.func.isRequired,
}