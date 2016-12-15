import React, { Component, PropTypes } from 'react'
import { v4 } from 'node-uuid'
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import { centeredContainer, errorMsg, buttonContainer } from '../styles.css'
import s from './Form.css'

const buttonStyles = { color: '#ffffff' }

const validate = values => {
    const errors = {}
    return errors
}

class UserResetPasswordForm extends Component {

    propTypes : {
        formError: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired
    }

    renderTextField = field => {
        return (
           <TextField className={s.formField} key={field.name} name={field.name} type={field.type} floatingLabelText={field.floatingLabelText} hintText={field.hintText} errorText={field.meta.touched && field.meta.error ? field.meta.error : ''}
                {...field.input}
            />
        )
    }

    renderForm = (props) => {

        const { handleSubmit, pristine, submitting, onSubmit} = props

        return (
            <form onSubmit={handleSubmit((event) => onSubmit(event))}>
                <Field
                    name="email"
                    type="text"
                    ref={(ref) => this.emailField = ref}
                    component={this.renderTextField}
                    floatingLabelText={`Email Address`}
                    hintText={`Enter your email address`} />
                <RaisedButton className={s.formButton} type="submit" fullWidth={false} backgroundColor="#7DC93A" labelStyle={buttonStyles}>
                    {`Send Reset Link`}
                </RaisedButton>
            </form>
        )
    }

    renderError = (formError) => (
        <div>
            <p className={errorMsg}>{formError}</p>
            <p className={errorMsg}>{'Please try again.'}</p>
        </div>
    )

    render () {
        return (
            <div className={centeredContainer}>
                <br />
                {this.renderForm(this.props)}
                { this.props.formError ? this.renderError(this.props.formError) : null }
            </div>
        )
    }
}

export default reduxForm({ form: 'resetpassword', validate })(UserResetPasswordForm)
