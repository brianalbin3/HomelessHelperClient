import { InputAdornment } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import React, {Component } from 'react';

import './PasswordInput.css';

type PasswordInputState = {
    passwordIsMasked: boolean
}

//https://itnext.io/building-a-toggled-mask-password-input-component-w-react-and-material-ui-f55e6bd73434


type PasswordInputProps = {
    classes?: any,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string,
    error?: boolean,
    helperText?: string,
    label?: string,
    className?: string,
    inputProps?: object,
}

class PasswordInput extends Component<PasswordInputProps, PasswordInputState> {
    constructor(props: PasswordInputProps) {
        super(props);

        this.state = {
            passwordIsMasked: true
        };
    }

    togglePasswordMask = () => {
        this.setState(prevState => ({
            passwordIsMasked: !prevState.passwordIsMasked
        }));
    }

    getVisibilityIcon() {
        if ( this.state.passwordIsMasked ) {
            return (
                <VisibilityIcon color="primary" onClick={this.togglePasswordMask} className="clickable-icon"/>
            );
        }
        
        return (
            <VisibilityOffIcon color="primary" onClick={this.togglePasswordMask} className="clickable-icon"/>
        );
    }

    render() {
        const { classes } = this.props;
        const { passwordIsMasked } = this.state;

        return (
            <TextField
                variant="filled"
                type={passwordIsMasked ? 'password' : 'text'}
                {...this.props}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {this.getVisibilityIcon()}
                        </InputAdornment>
                    ),
                }}
            />
        );
    }
}


export default PasswordInput;