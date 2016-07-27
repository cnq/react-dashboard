import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { getProviderInfo } from 'helpers/utils'
import {
    EMAIL
} from 'config/constants'
import {
    centeredContainer,
    errorMsg
} from 'shared/styles.css'

class FormSignin extends Component {

    static propTypes = {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired
    }

    renderAlert () {
        if ( this.props.errorMessage ) {
            return (
                <div className='alert alert-danger'>
                    <strong>Oops!</strong> { this.props.errorMessage }
                </div>
            );
        }
    }

    render () {

        const { fields: { email, password }, handleSubmit } = this.props;

        return (
            <div className='auth card box-shadow'>
                <div className='card-block'>
                    <form onSubmit={handleSubmit((fields, event) => this.props.onAuth(getProviderInfo(EMAIL), fields.email, fields.password))}>
                        <fieldset className='input-group input-group-lg'>
                            <input placeholder='Email' className='form-control' { ...email } />
                        </fieldset>
                        <fieldset className='input-group input-group-lg'>
                            <input placeholder='Password' className='form-control' type='password' { ...password } />
                        </fieldset>
                            { this.renderAlert() }
                            <button className='btn btn-primary btn-lg btn-block' action='submit'>
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
         )
    }
}

function mapStateToProps ( state ) {
    return {
        errorMessage: state.users.error
    }
}

FormSignin = reduxForm({
    form: 'signin',
    fields: [ 'email', 'password' ]
}, mapStateToProps )( FormSignin );

export default FormSignin;