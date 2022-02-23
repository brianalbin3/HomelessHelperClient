import './ErrorBox.css';
import ErrorIcon from '@material-ui/icons/Error';

type ErrorBoxProps = {
    message: string
}

function ErrorBox(props: ErrorBoxProps) {
    return (
        <div className="error-box">
            <ErrorIcon color="error"/>
            <div className="error-msg">{props.message}</div>
        </div> 
    );
}

export default ErrorBox;