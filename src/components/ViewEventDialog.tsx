import React  from 'react';

import './ViewEventDialog.css';

import churchImg from '../img/ggchurch.png';

import Button from '@material-ui/core/Button';

import { DateTime } from 'luxon';

import * as eventAPI from '../api/event';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

import Event from '../models/Event';

import FormHelperText from '@material-ui/core/FormHelperText';

type ViewEventDialogProps = {
    event: Event
    onCancel: () => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

type ViewEventDialogState = {
    internalServerError: boolean;
    notFound404Error: boolean;
}

class ViewEventDialog extends React.Component<ViewEventDialogProps, ViewEventDialogState> {
    constructor(props: ViewEventDialogProps) {
        super(props);

        this.state = {
            internalServerError: false,
            notFound404Error: false

        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleCancel(/*e: React.MouseEventHandler<HTMLButtonElement>*/) {
        this.props.onCancel();
    }

    handleEdit() {
        if ( this.props.event ) {
            const { id } = this.props.event;
            this.props.onEdit(id as number);
        }
    }

    async handleDelete() {
        const id: number = this.props.event.id as number;
        try {
            await eventAPI.deleteEvent(id);

            this.setState({internalServerError: false, notFound404Error: false});
            this.props.onDelete(id);
        }
        catch ( error ) {
            if ( error.response.status === 500 ) {
                this.setState({internalServerError: true});
            }
            else if (error.response.status === 404) {
                this.setState({notFound404Error: true});
            }
            else {
                console.error('Unhandled error')
            }
        }

    }

    render() {
        const { title, start, end, description } = this.props.event;
        const { internalServerError, notFound404Error } = this.state;

        const startStr: string = DateTime.fromJSDate(start).toFormat('MMMM dd, h:mm a');
        const endStr: string = DateTime.fromJSDate(end).toFormat('h:mm a');
        const dateTimeStr: string = `${startStr} - ${endStr}`;

        return (
            <div className="grayout">
                <div className="view-event-dialog">
                    <div className="view-dialog-header">
                        <div className="primary-header">{title}</div>
                        <div className="secondary-header">{dateTimeStr}</div>
                    </div>
                    <div className="location-img-container">
                        <img className="location-img" src={churchImg} alt="greater grace church" />
                    </div>
                    <div className="view-dialog-body">
                        <div className="event-description">{description}</div>
                        <div className="actions-container">
                            <Button onClick={this.handleDelete } className="delete-event-icon" variant="outlined" endIcon={<DeleteIcon color="primary" />}>
                                <div className="delete-txt">Delete</div>
                            </Button>
                            <Button onClick={ this.handleEdit } className="edit-event-icon" variant="outlined" endIcon={<EditIcon color="primary" />}>
                                <div className="edit-txt">Edit</div>
                            </Button>
                            <Button onClick={ this.handleCancel } className="close-event-dialog" variant="outlined" endIcon={<CloseIcon color="primary" />}>Done</Button>
                        
                            <FormHelperText className={`delete-err ${notFound404Error ? "" : "display-none"}`} error={true}>Uh-oh! A problem occured. The event may have already been deleted. Please refresh the page and try again.</FormHelperText>
                            <FormHelperText className={`delete-err ${internalServerError ? "" : "display-none"}`} error={true}>Uh-oh! A problem occured. Please refresh the page and try again.</FormHelperText>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default ViewEventDialog;