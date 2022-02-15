import React  from 'react';

import './ErrorBox.css';
import ErrorIcon from '@material-ui/icons/Error';

// TODO: Make functional component

type ErrorBoxState = {}

type ErrorBoxProps = {
    message: string
}

class ErrorBox extends React.Component<ErrorBoxProps, ErrorBoxState> {
    constructor(props: ErrorBoxProps) {
        super(props);
    }

    render() {

        return (
            <div className="error-box">
                <ErrorIcon color="error"/>
                <div className="error-msg">{this.props.message}</div>
            </div>
        );
    }
}

export default ErrorBox;