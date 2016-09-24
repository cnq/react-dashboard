import React, { Component, PropTypes } from 'react'
import { v4 } from 'node-uuid'
import capitalize from 'lodash/capitalize'
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import { centeredContainer, errorMsg, buttonContainer } from '../styles.css'
import { formField, formButton } from './SigninForm.css'

const buttonStyles = { color: '#ffffff' }

const { string, func } = PropTypes



const validate = values => {
    const errors = {}

    return errors
}

class SigninForm extends Component {

    renderTextField = field => {
        return (
           <TextField
                className={formField}
                key={field.name}
                name={field.name}
                type={field.type}
                floatingLabelText={field.floatingLabelText}
                hintText={field.hintText}
                errorText={field.meta.touched && field.meta.error ? field.meta.error : ''}
    {...field.input}
            />
        )}

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
                        hintText={`Enter your email address`}/>
                    <Field
                        name="password"
                        type="password"
                        ref={(ref) => this.passwordField = ref}
                        component={this.renderTextField}
                        floatingLabelText={`Password`}
                        hintText={`Enter your password`}
                    />
                    <RaisedButton
                        className={formButton}
                        type="submit"
                        fullWidth={false}
                        backgroundColor="#7DC93A"
                        labelStyle={buttonStyles}>
                        {`Sign In`}
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
            const { formError } = this.props
            return (
                <div className={centeredContainer}>
                <br />
                    {this.renderForm(this.props)}
                    {
                        formError
                            ?   this.renderError(formError)
                            :   null
                    }
                </div>
            )
        }

}

SigninForm.propTypes = {
    formError: string.isRequired,
    onSubmit: func.isRequired
}

export default reduxForm({
    form: 'signin',
    validate
})(SigninForm)
