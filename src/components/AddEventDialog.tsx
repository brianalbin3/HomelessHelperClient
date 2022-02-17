import React from 'react';



import Button from '@material-ui/core/Button';


import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
//import Autocomplete from '@material-ui/lab/Autocomplete';

import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

import * as eventAPI from '../api/event';

//import LuxonUtils from 'luxon';
import LuxonUtils from '@date-io/luxon';

import { DateTime } from 'luxon';

import FormHelperText from '@material-ui/core/FormHelperText';


import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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

type AddEventDialogState = {
    title: string | null,
    startTime: MaterialUiPickersDate | null,
    endTime: MaterialUiPickersDate | null,
    date: MaterialUiPickersDate | null,
    description: string | undefined,
    submitPressed: boolean,
    internalServerError: boolean
}


type AddEventDialogProps = {
    onCancel: any // TODO: Type, optional/etc?
    onEventAdded: (event: any) => void;
}

class AddEventDialog extends React.Component<AddEventDialogProps, AddEventDialogState> {

    constructor(props: AddEventDialogProps) {
        super(props);

        this.state = {
            title: '',
            startTime: null,
            endTime: null,
            date: null,
            description: undefined,
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

    handleDescriptionChange(e: any) {
        const description: string = e.target.value;
        this.setState({description});
    }

    // TODO: Correct type
    handleCancel(e: any) {
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

    // TODO: Error where start time is after end time
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
        const { endTime, submitPressed } = this.state;

        if ( submitPressed && !this.endTimeIsValid() ) {
            return 'End time must be after start time';
        }

        return 'What time should the outreach end?';
    }

    // TODO: Correct type
    async handleSubmit(e: any) {

        this.setState({submitPressed: true});

        const { title, startTime, endTime, date, description } = this.state;


        if ( !title || !date || !startTime || !endTime || !this.endTimeIsValid() ) {
            return;
        }

        const startHours: number = startTime.hour;
        const startMinutes: number = startTime.minute;

        const endHours: number = endTime.hour;
        const endMinutes: number = endTime.minute;

        // TODO: Type
        const startDateAndTime: any = date.set({hour: startHours, minute: startMinutes});
        const endDateAndTime: any = date.set({hour: endHours, minute: endMinutes});

        try {
            let response = await eventAPI.createEvent({ title, start: startDateAndTime.toJSDate(), end: endDateAndTime.toJSDate(), description });
            
            let event = response.data;
            event.start = DateTime.fromISO(event.start).toJSDate();
            event.end = DateTime.fromISO(event.end).toJSDate();
        
            this.props.onEventAdded(event);
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
        const { startTime, endTime, date } = this.state;

        // TODO: Async autocomplete for medicine name
        //https://codesandbox.io/s/wj0r6?file=/demo.tsx
        
        return (
            <div className="grayout">
                <div className="add-event-dialog">
                    <div className="dialog-header">
                        <Typography className="dialog-title" variant="h4">Add Event</Typography>
                    </div>
                    <div className="dialog-body">
                        <div className="dialog-form">
                            <TextField error={this.titlehasErrorTxt()} onChange={this.handleTitleChange} className="dialog-txt-field" label="Title" variant="filled" helperText="Enter the title of the outreach event" inputProps={{ maxLength: 64 }} />

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
                        <Button color="primary" className="dialog-btn" onClick={ this.handleSubmit } variant="contained" size="medium">Add</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddEventDialog;