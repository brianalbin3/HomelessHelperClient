import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';


import qs from 'qs';

import * as userAPI from '../api/user';

import './EnterCode.css';

enum EnterCodeStatusType {
    NONE,
    INVALID_PASSCODE,
    CODE_EXPIRED,
    TOO_MANY_ATTEMPTS,
    INTERNAL_SERVER_ERROR,
    RESENT_CODE
}

type EnterCodeState = {
    selectedContactMethod: string,
    email: string,
    phone: string,
    submitIsTouched: boolean,
    code: string,
    enterCodeStatusType: EnterCodeStatusType
}

type EnterCodeProps = {
    location: any, // TODO: type
    history: any, // TODO: type
}


class EnterCode extends React.Component<EnterCodeProps, EnterCodeState> {

    constructor(props: EnterCodeProps) {
        super(props);

        let selectedContactMethod: any = '';
        let email: any = '';
        let phone: any = '';

        let qsParse: qs.ParsedQs = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });

        if ( qsParse ) {
            selectedContactMethod = qsParse.selectedContactMethod;
            email = qsParse.email; // Need email either way for back button
            
            if ( selectedContactMethod === 'phone' ) {
                phone = qsParse.phone;
            }
        }

        this.state = { selectedContactMethod, email, phone, submitIsTouched: false, code: '', enterCodeStatusType: EnterCodeStatusType.NONE };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.resendCodeClicked = this.resendCodeClicked.bind(this);
    }

    handleCodeChange(e: any) {
        const code: string = e.target.value;
        this.setState({code});
    }

    getCodeHelperText(): string {
        if ( this.displayCodeTextFieldError() ) {
            return 'Code must be 8 digits';
        }

        const { selectedContactMethod} = this.state;
        
        return `Enter the 8 digit code sent to your ${selectedContactMethod}.`;
    }

    codeIsValid(): boolean {
        return this.state.code.length === 8;
    }

    displayCodeTextFieldError(): boolean {
        const { submitIsTouched, code } = this.state;

        if ( !submitIsTouched ) {
            return false
        }

        return !this.codeIsValid();
    }
      
    async handleSubmit(e: any) {
        this.setState({submitIsTouched: true});

        if ( !this.codeIsValid() ) {
            return;
        }
        
        const { email, code, selectedContactMethod, phone } = this.state;

        try {

            await userAPI.checkResetCode(email, code);

            this.setState({enterCodeStatusType: EnterCodeStatusType.NONE});

            // TODO: should I just do history.back or something
            if (selectedContactMethod === 'email') {
                this.props.history.push(`/resetpassword?email=${email}&code=${code}`);
            }
            else {
                this.props.history.push(`/resetpassword?email=${email}&code=${code}`);
            }
        }
        catch(error) {
            console.error("error",error)

            if ( error.response.status === 401 ) {
                if ( error.response.data.message === 'Invalid email/passcode combination') {
                    this.setState({enterCodeStatusType: EnterCodeStatusType.INVALID_PASSCODE});
                }
                else if ( error.response.data.message === 'Reset code has expired' ) {
                    this.setState({enterCodeStatusType: EnterCodeStatusType.CODE_EXPIRED});
                }
                else if ( error.response.data.message === 'Too many failed attempts' ) {
                    this.setState({enterCodeStatusType: EnterCodeStatusType.TOO_MANY_ATTEMPTS});
                }
            }
            else { //500, 'The server encountered an unknown error.', 400, Email and/or resetCode not sent (shouldn't ever happen)
                this.setState({enterCodeStatusType: EnterCodeStatusType.INTERNAL_SERVER_ERROR});
            }
        }
    }

    displayFormHelperText(): boolean {
        return this.state.enterCodeStatusType !== EnterCodeStatusType.NONE;
    }

    getFormHelperText(): string {
        const { enterCodeStatusType, selectedContactMethod, email, phone } = this.state;

        if ( enterCodeStatusType === EnterCodeStatusType.INVALID_PASSCODE ) {
            return 'Wrong code, try again.';
        }
        else if ( enterCodeStatusType === EnterCodeStatusType.CODE_EXPIRED ) {
            return 'This code has expired.';
        }
        else if ( enterCodeStatusType === EnterCodeStatusType.TOO_MANY_ATTEMPTS ) {
            return 'Too many failed attempts.';
        }
        else if ( enterCodeStatusType === EnterCodeStatusType.INTERNAL_SERVER_ERROR ) {
            return 'Internal server error. Please refresh the page and try again.';
        }
        else if ( enterCodeStatusType === EnterCodeStatusType.RESENT_CODE) {
            return `Another code has been sent to ${selectedContactMethod === 'email' ? email : phone}`;
        }

        return '';
    }

    formHelperTextIsError(): boolean {
        return this.state.enterCodeStatusType !== EnterCodeStatusType.RESENT_CODE;
    }

    displayResendCodeLink(): boolean {
        const enterCodeStatusType: EnterCodeStatusType = this.state.enterCodeStatusType;

        return  enterCodeStatusType === EnterCodeStatusType.TOO_MANY_ATTEMPTS || enterCodeStatusType === EnterCodeStatusType.CODE_EXPIRED;
    }

    async resendCodeClicked(e: any) { // TODO: Type
        const { email, selectedContactMethod } = this.state;

        try {
            await userAPI.sendResetCode(email, selectedContactMethod);

            this.setState({enterCodeStatusType: EnterCodeStatusType.RESENT_CODE});   
        }
        catch (error) {
            this.setState({ enterCodeStatusType: EnterCodeStatusType.INTERNAL_SERVER_ERROR });
        }
    }

    render() {
        const { selectedContactMethod, phone, email } = this.state;
        const contactDetail = selectedContactMethod === 'email' ? email : phone;
        return (
            <div className="auth-page-container">
                <div className="auth-page">
                    <Typography className="auth-header" color="primary" variant="h4">Enter Security Code</Typography>
                    <form className="auth-form">
                        <div className="auth-instructions desktop-only">Please check your {selectedContactMethod} for the 8 digit code that was sent to {contactDetail}.</div>
                        <TextField onChange={this.handleCodeChange} className="auth-txt-field" label="########" variant="filled" helperText={this.getCodeHelperText()} error={this.displayCodeTextFieldError()}/>
                        <Button onClick={ this.handleSubmit } className="auth-btn" variant="contained" color="primary" size="medium">Enter Code</Button>
                        <FormHelperText className={`auth-err ${this.displayFormHelperText() ? "" : "display-none"}`} error={this.formHelperTextIsError()}>{this.getFormHelperText()}<span className={`resend-code ${this.displayResendCodeLink() ? "" : "display-none"}`} onClick={this.resendCodeClicked}>Resend Code?</span></FormHelperText>
                    </form>
                    <div className="non-important-btns-container">
                        <Link className="no-underline" to={`/pickresetmethod?email=${email}&phone=${phone}`}>
                            <Button className="enter-code-btn non-important-btn" color="primary">Try Another Way</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default EnterCode;