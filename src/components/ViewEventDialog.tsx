import React  from 'react';

import './ViewEventDialog.css';

import churchImg from '../img/ggchurch.png';

import Button from '@material-ui/core/Button';

import { DateTime } from 'luxon';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

import Event from '../models/Event';

type ViewEventDialogProps = {
    event: Event
}

type ViewEventDialogState = {

}

class ViewEventDialog extends React.Component<ViewEventDialogProps, ViewEventDialogState> {
    constructor(props: ViewEventDialogProps) {
        super(props);
    }

    render() {
        const {id, title, start, end, description } = this.props.event;

        const startStr: string = DateTime.fromJSDate(start).toFormat('MMMM dd, h:mm a');
        const endStr: string = DateTime.fromJSDate(end).toFormat('h:mm a');
        const dateTimeStr: string = `${startStr} - ${endStr}`;

        console.log('description', description);

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
                            <Button className="delete-event-icon" variant="outlined" endIcon={<DeleteIcon color="primary" />}>
                                <div className="delete-txt">Delete</div>
                            </Button>
                            <Button className="edit-event-icon" variant="outlined" endIcon={<EditIcon color="primary" />}>
                                <div className="edit-txt">Edit</div>
                            </Button>
                            <Button className="close-event-dialog" variant="outlined" endIcon={<CloseIcon color="primary" />}>Done</Button>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default ViewEventDialog;