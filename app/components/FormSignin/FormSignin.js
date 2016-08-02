import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import { getProviderInfo } from 'helpers/utils'
import {
    EMAIL
} from 'config/constants'
import {
    centeredContainer,
    errorMsg
} from 'shared/styles.css'

const styles = {
    button: {},
    label: {
        textTransform: 'capitalize'
    },
    icon: {}
}

const {
    string,
    object,
    func,
    bool
} = PropTypes

FormSignin.propTypes = {
    handleSubmit: func.isRequired,
    email: object.isRequired,
    password: object.isRequired,
    error: string.isRequired,
    onAuth: func.isRequired
}


function FormSignin ({ handleSubmit, password, email, onAuth, error }) {

    const renderAlert = () => {
        if ( error ) {
            return (
                <div className='alert alert-danger'>
                    <strong>Oops!</strong> { error }
                </div>
            );
        }
    }

    const provider = EMAIL
    const providerInfo = getProviderInfo(provider)
    const name = providerInfo.name
    const color = providerInfo.color

    return (
        <div className='auth card box-shadow'>
            <div className='card-block'>
                <form onSubmit={handleSubmit((event) => onAuth({provider, email, password}, event))}>
                    <fieldset className='input-group input-group-lg'>
                        <input placeholder='Email' className='form-control' { ...email } />
                    </fieldset>
                    <fieldset className='input-group input-group-lg'>
                        <input placeholder='Password' className='form-control' type='password' { ...password } />
                    </fieldset>
                    { renderAlert() }
                    <button className='btn btn-primary btn-lg btn-block' type='submit'>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
     )

}

export default FormSignin;
