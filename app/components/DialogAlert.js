import React, { Component, PropTypes } from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import s from '../styles.css'


export default class DialogAlert extends Component {


    handleClose = () => {
        this.props.cancelCallback();
    };
    handleConfirm = () => {
        this.props.confirmCallback();
    };

    render() {
        const actions = [
            <FlatButton label="Cancel" primary={true} onTouchTap={this.handleClose} style={{color: '#383838'}} hoverColor="none" rippleColor="none" />,
            <FlatButton label={this.props.confirmButtonText} style={{color: '#FC656E'}}hoverColor="none" rippleColor="none" onTouchTap={this.handleConfirm}/>
        ];

    return (
          <div>
            <Dialog actions={actions} modal={true} open={this.props.isOpen}>
                <div className={s.breathingRoom}>
                    {this.props.message}
                </div>
            </Dialog>
          </div>
        );
    }
}

DialogAlert.propTypes = {
    message: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    confirmButtonText: PropTypes.string.isRequired,
    confirmCallback: PropTypes.func.isRequired,
    cancelCallback: PropTypes.func.isRequired,
}