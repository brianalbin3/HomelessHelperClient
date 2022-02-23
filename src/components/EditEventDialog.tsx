import React from 'react';

import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';

import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import * as eventAPI from '../api/event';

import LuxonUtils from '@date-io/luxon';

import { DateTime } from 'luxon';

import FormHelperText from '@material-ui/core/FormHelperText';

import Event from '../models/Event';


import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from '@material-ui/pickers';

import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import EventIcon from '@material-ui/icons/Event';

import { InputAdornment } from '@material-ui/core';

import './AddEventDialog.css';

type EditEventDialogState = {
    title: string | null,
    startTime: MaterialUiPickersDate | null,
    endTime: MaterialUiPickersDate | null,
    date: MaterialUiPickersDate | null,
    description: string | undefined,
    submitPressed: boolean,
    internalServerError: boolean,
}

type EditEventDialogProps = {
    event: Event;
    onCancel: () => void;
    onEventUpdated: (event: Event) => void;
}

class EditEventDialog extends React.Component<EditEventDialogProps, EditEventDialogState> {

    constructor(props: EditEventDialogProps) {
        super(props);

        const { title, start, end, description } = this.props.event;

       const utcDate: DateTime = DateTime.fromJSDate(start).setZone('America/New_York');
       const utcStartTime: DateTime = DateTime.fromJSDate(start).setZone('America/New_York');
       const utcEndTime: DateTime = DateTime.fromJSDate(end).setZone('America/New_York');

        this.state = {
            title: title,
            startTime: utcStartTime,
            endTime: utcEndTime,
            date: utcDate,
            description: description,
            submitPressed: false,
            internalServerError: false
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitleChange(e: any) {
        const title: string = e.target.value;
        this.setState({title});
    }
    
    handleStartTimeChange(startTime: MaterialUiPickersDate | null) {
        this.setState({startTime});
    }

    handleEndTimeChange(endTime: MaterialUiPickersDate | null) {
        this.setState({endTime});
    }

    handleDateChange(date: MaterialUiPickersDate | null) {
        this.setState({ date: date});
    }

    handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
        const description: string = e.target.value;
        this.setState({description});
    }

    handleCancel(e: React.MouseEvent<HTMLElement>) {
        this.props.onCancel();
    }

    titlehasErrorTxt(): boolean {
        const { title, submitPressed } = this.state;

        return submitPressed && !title;
    }

    datehasErrorTxt(): boolean {
        const { date, submitPressed } = this.state;

        return submitPressed && !date;
    }

    startTimehasErrorTxt(): boolean {
        const { startTime, submitPressed } = this.state;

        return submitPressed && !startTime;
    }

    endTimehasErrorTxt(): boolean {
        const { endTime, submitPressed } = this.state;

        return submitPressed && (!endTime || !this.endTimeIsValid()) ;
    }

    endTimeIsValid(): boolean {
        const { startTime, endTime } = this.state;

        if ( startTime && endTime ) {
            if ( startTime > endTime ) {
                return false;
            }
        }

        return true;
    }

    getEndTimeHelperTxt(): string {
        const { submitPressed } = this.state;

        if ( submitPressed && !this.endTimeIsValid() ) {
            return 'End time must be after start time';
        }

        return 'What time should the outreach end?';
    }

    async handleSubmit(e: React.MouseEvent<HTMLElement>) {

        this.setState({submitPressed: true});

        const id: number = this.props.event.id as number;
        const { title, startTime, endTime, date, description } = this.state;

        if ( !title || !date || !startTime || !endTime || !this.endTimeIsValid() ) {
            return;
        }

        const startHours: number = startTime.hour;
        const startMinutes: number = startTime.minute;

        const endHours: number = endTime.hour;
        const endMinutes: number = endTime.minute;

        let startDateAndTime: DateTime = date.set({hour: startHours, minute: startMinutes}).setZone('America/New_York');
        let endDateAndTime: DateTime = date.set({hour: endHours, minute: endMinutes}).setZone('America/New_York');

        try {

            let event: Event = { id, title, start: startDateAndTime.toJSDate(), end: endDateAndTime.toJSDate(), description };

            await eventAPI.updateEvent(event);

            this.props.onEventUpdated(event);

        }
        catch ( error ) {

            if ( error.response.status === 500 ) {
                this.setState({internalServerError: true});
            }
            else {
                console.error('Unhandled error'); // TODO: Handle this
            }
        }
    }

    hasInternalServerError(): boolean {
        return this.state.internalServerError;
    }

    render() {
        const { title, startTime, endTime, date, description } = this.state;
        
        return (
            <div className="grayout">
                <div className="add-event-dialog">
                    <div className="dialog-header">
                        <Typography className="dialog-title" variant="h4">Edit Event</Typography>
                    </div>
                    <div className="dialog-body">
                        <div className="dialog-form">
                            <TextField value={title} error={this.titlehasErrorTxt()} onChange={this.handleTitleChange} className="dialog-txt-field" label="Title" variant="filled" helperText="Enter the title of the outreach event" inputProps={{ maxLength: 64 }} />

                            <MuiPickersUtilsProvider utils={LuxonUtils}>
                                <DatePicker
                                    error={this.datehasErrorTxt()}
                                    className="dialog-picker-field"
                                    inputVariant="filled"
                                    format="MM/dd/yyyy"
                                    value={date}
                                    margin="normal"
                                    label="Start Date"
                                    onChange={this.handleDateChange}
                                    helperText="What date should the outreach be on?"
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position="end">
                                            <EventIcon color="primary"/>
                                        </InputAdornment>
                                        ),
                                    }}
                                />

                                <TimePicker
                                    error={this.startTimehasErrorTxt()}
                                    className="dialog-picker-field"
                                    inputVariant="filled"
                                    format="h:mm a"
                                    value={startTime}
                                    margin="normal"
                                    label="Start Time"
                                    onChange={this.handleStartTimeChange}
                                    helperText="What time should the outreach start?"
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position="end">
                                            <AccessAlarmIcon color="primary"/>
                                        </InputAdornment>
                                        ),
                                    }}
                                />

                                <TimePicker
                                    error={this.endTimehasErrorTxt()}
                                    className="dialog-picker-field"
                                    inputVariant="filled"
                                    format="h:mm a"
                                    value={endTime}
                                    margin="normal"
                                    label="End Time"
                                    onChange={this.handleEndTimeChange}
                                    helperText={this.getEndTimeHelperTxt()}
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position="end">
                                            <AccessAlarmIcon color="primary"/>
                                        </InputAdornment>
                                        ),
                                    }}
                                />

                            </MuiPickersUtilsProvider>

                            <TextField
                                value={description}
                                label="Description"
                                multiline
                                rows={4}
                                onChange={this.handleDescriptionChange}
                                helperText="Enter the description of this event"
                                variant="filled"
                                inputProps={{ maxLength: 2048 }}
                            />

                            <FormHelperText className={`${this.hasInternalServerError() ? "" : "display-none"}`} error={true}>Uh-oh! A problem occured. Please refresh the page and try again.</FormHelperText>
                        </div>
                    </div>
                    <div className="dialog-actions">
                        <Button color="primary" className="dialog-btn" onClick={ this.handleCancel } variant="contained" size="medium">Cancel</Button>
                        <Button color="primary" className="dialog-btn" onClick={ this.handleSubmit } variant="contained" size="medium">Update</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditEventDialog;