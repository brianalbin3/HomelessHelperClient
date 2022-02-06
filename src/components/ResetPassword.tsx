import React from 'react';
import { AuthContextConsumer } from '../contexts/authContext';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import qs from 'qs';

import * as userAPI from '../api/user';


import PasswordInput from './PasswordInput';

import './ResetPassword.css';

type ResetPasswordState = {
    resetPasswordFailureType: ResetPasswordFailureType,
    code: string,
    email: string,
    password: string,
    submitButtonTouched: boolean,
    passwordChangeSuccess: boolean
}
type ResetPasswordProps = {
    location: any, // TODO: TYPE
    history: any // TODO: Type
}

enum ResetPasswordFailureType {
    PASSWORD_EXPIRED,
    INTERNAL_SERVER_ERROR,
    NONE
}

class ResetPassword extends React.Component<ResetPasswordProps, ResetPasswordState> {

    constructor(props: ResetPasswordProps) {
        super(props);

        let qsParse: qs.ParsedQs = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });

        let code: any = '';
        let email: any = '';

        if ( qsParse ) {
            code = qsParse.code;
            email = qsParse.email; // Need email either way for back button            
        }

        this.state = {
            code,
            email,
            password: '',
            resetPasswordFailureType: ResetPasswordFailureType.NONE,
            submitButtonTouched: false,
            passwordChangeSuccess: false 
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handlePasswordChange(e: any) {
        const password = e.target.value;
        this.setState({password});
    }

    displayPasswordError(): boolean {
        return !this.passwordIsValid() && this.state.submitButtonTouched;
    }

    passwordHasCorrectLength(): boolean {
        const { password } = this.state;

        return password.length >= 8 && password.length <= 32;
    }
    
    // TODO: Fix this
    passwordHasCorrectCharacters(): boolean {
        const { password } = this.state;

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,32}$/

        return regex.test(password);

    }

    passwordIsValid(): boolean {
        return this.passwordHasCorrectCharacters() && this.passwordHasCorrectLength();
    }

    getPasswordHelperText(): string {
        const { submitButtonTouched } = this.state;

        if ( !this.passwordHasCorrectLength() && submitButtonTouched ) {
            return 'Enter between 8 and 32 characters';
        }
        else if ( !this.passwordHasCorrectCharacters() && submitButtonTouched ) {
            return 'Include a letter, number, and special character';
        }
    
        return 'Enter your new password';
    }

    displayFormError(): boolean {
        return this.state.resetPasswordFailureType !== ResetPasswordFailureType.NONE;
    }

    getFormErrorText(): string {
        const { resetPasswordFailureType } = this.state;

        if ( resetPasswordFailureType === ResetPasswordFailureType.PASSWORD_EXPIRED ) {
            return 'This reset code has expired.';
        }
        else if ( resetPasswordFailureType === ResetPasswordFailureType.INTERNAL_SERVER_ERROR ) {
            return 'Internal server error. Please refresh the page and try again.';
        }

        return '';
    }
      
    async handleSubmit(callback: any) { // TODO: Rename this
        const { email, password, code } = this.state;

        this.setState({submitButtonTouched: true});

        if ( !this.passwordIsValid() ) {
            return;
        }

        try {
            await userAPI.changePassword(email, password, code);
            this.setState({resetPasswordFailureType: ResetPasswordFailureType.NONE, passwordChangeSuccess: true});
   
            callback();

            setTimeout( () => {
                this.props.history.push('/features/schedule');
            }, 500);
        }
        catch ( error ) {
            if ( error.response.status === 401 && error.response.data.message === 'Reset code has expired' ) {
                this.setState({resetPasswordFailureType: ResetPasswordFailureType.PASSWORD_EXPIRED});
                console.log('error.response.data',error.response.data);
            }
            else {
                this.setState({resetPasswordFailureType: ResetPasswordFailureType.INTERNAL_SERVER_ERROR});
            }
        }

    }

    render() {
        const {passwordChangeSuccess} = this.state;

        return (
            <div className="auth-page-container">
                <div className="auth-page">
                    <Typography className="auth-header" color="primary" variant="h4">Reset Password</Typography>
                    <form className="auth-form">
                        <div className="auth-instructions desktop-only">Enter a new password between 8 and 32 characters. Include at least one uppercase letter, lowercase letter, number, and special character. </div>
                        <PasswordInput onChange={this.handlePasswordChange} inputProps={{ maxLength: 32 }} className="auth-txt-field" error={this.displayPasswordError()} helperText={this.getPasswordHelperText()} label="New Password"/>
                        <AuthContextConsumer>
                        {context => (
                            <Button onClick={ e => this.handleSubmit(context.login) } className="auth-btn" variant="contained" color="primary" size="medium">Change Password</Button>
                        )}
                        </AuthContextConsumer>
                        <FormHelperText className={`auth-err ${this.displayFormError() ? "" : "display-none"}`} error={this.displayFormError()}>{this.getFormErrorText()}</FormHelperText>
                        <div className={`change-pw-success ${passwordChangeSuccess ? "" : "display-none"}`}>
                            <div className="change-pw-success-txt">Password Changed</div>
                            <CheckCircleOutlineIcon color="primary"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ResetPassword;