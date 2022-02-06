import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

import * as userAPI from '../api/user';

import './FindAccount.css';

type FindAccountState = {
    contact: string,
    searchAccountFailureType: SearchAccountFailureType,
    submitIsTouched: boolean
}

type FindAccountProps = {
    history: any
}

enum SearchAccountFailureType {
    ACCOUNT_NOT_FOUND,
    INTERNAL_SERVER_ERROR,
    NONE
}

class FindAccount extends React.Component<FindAccountProps, FindAccountState> {

    constructor(props: FindAccountProps) {
        super(props);

        this.state = { contact: '', searchAccountFailureType: SearchAccountFailureType.NONE, submitIsTouched: false };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleContactChange = this.handleContactChange.bind(this);
    }

    handleContactChange(e: any) {
        const contact = e.target.value;
        this.setState({contact});
    }

    contactHasError(): boolean {
        const { submitIsTouched, contact } = this.state;

        return contact.length === 0 && submitIsTouched;
    }

    async handleSubmit(e: any) {
        const { contact } = this.state;

        this.setState({submitIsTouched: true});

        if ( contact.length === 0 ) {
            return;
        }

        try {
            const contactInfo: any = await (await userAPI.findAccount(contact)).data.contactInformation; // TODO: Create model for this
            console.log("contactInfo",contactInfo)
            this.setState({searchAccountFailureType: SearchAccountFailureType.NONE, submitIsTouched: false});
            this.props.history.push(`/pickresetmethod?email=${contactInfo.email}&phone=${contactInfo.phone}`); // TODO: Change this
        }
        catch(error) {
            if ( error.response.status === 404 ) {
                this.setState({searchAccountFailureType: SearchAccountFailureType.ACCOUNT_NOT_FOUND});
            }
            else if ( error.response.status === 500 ) {
                this.setState({searchAccountFailureType: SearchAccountFailureType.INTERNAL_SERVER_ERROR});
            }
        }
    }

    displayFormError(): boolean {
        return this.state.searchAccountFailureType !== SearchAccountFailureType.NONE;
    }

    getFormErrorText(): string {
        if ( this.state.searchAccountFailureType === SearchAccountFailureType.ACCOUNT_NOT_FOUND ) {
            return 'We couldnt find an account with that contact information.';
        }
        else if ( this.state.searchAccountFailureType === SearchAccountFailureType.INTERNAL_SERVER_ERROR ) {
            return 'Internal error. Refresh the page.';
        }

        return '';
    }

    // TODO: auth-err really should be renamed
    render() {
        return (
            <div className="auth-page-container">
                <div className="auth-page">
                    <Typography className="auth-header" color="primary" variant="h4">Find Account</Typography>
                    <form className="auth-form">
                        <FormHelperText className="forgot-pw-desc">Enter your email or phone number to search for your account.</FormHelperText>
                        <TextField onChange={this.handleContactChange} className="auth-txt-field" label="Email or Phone" variant="filled" error={this.contactHasError()} helperText="Enter your email or phone number"/>
                        <Button onClick={ this.handleSubmit } className="auth-btn" variant="contained" color="primary" size="medium">Search</Button>
                        <FormHelperText className={`auth-err ${this.displayFormError() ? "" : "display-none"}`} error={true}>{this.getFormErrorText()}</FormHelperText>
                    </form>
                    <div className="non-important-btns-container">
                        <Link className="no-underline" to="/login">
                            <Button className="find-email-btn non-important-btn" color="primary">Cancel</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default FindAccount;