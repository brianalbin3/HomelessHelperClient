import React from 'react';
import Button from '@material-ui/core/Button';


import * as auth from '../api/auth';


import { AuthContextConsumer } from '../contexts/authContext';

type AccountSettingsState = {}

type AccountSettingsProps = {
    history: any;
}

class AccountSettings extends React.Component<AccountSettingsProps, AccountSettingsState> {
    constructor(props: AccountSettingsProps) {
        super(props);
    }

    handleSubmit(callback: any) {
        try {
            auth.logout();

            callback();

            this.props.history.push('/login');
        }
        catch(error) {
            console.log('error',error)
            
        }
    }

    render() {
        return (
            <div>
                <h1>Account Settings</h1>

                <AuthContextConsumer>
                {context => (
                    <Button onClick={ e => this.handleSubmit(context.logout)} className="auth-btn" variant="contained" color="primary" size="medium">Logout</Button>
                )}
                </AuthContextConsumer>
            </div>
        );
    }
}

export default AccountSettings;