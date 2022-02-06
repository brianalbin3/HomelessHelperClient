import React from 'react';

import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
//import Autocomplete from '@material-ui/lab/Autocomplete';
import LuxonUtils from '@date-io/luxon';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';

import Medicine from '../models/Medicine';
import Units from '../models/Units';

import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from '@material-ui/pickers';

import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import EventIcon from '@material-ui/icons/Event';

import { InputAdornment } from '@material-ui/core';

import './AddMedicineDialog.css';

type AddMedicineDialogState = {
    medicine: Medicine | null,
    ammount: number,
    units: Units | null,
    time: Date | null
    startDate: Date | null;
    endDate: Date | null;
}


type AddMedicineDialogProps = {}

class AddMedicineDialog extends React.Component<AddMedicineDialogProps, AddMedicineDialogState> {

    medicineList: Array<Medicine> = [
        {
            id: '123',
            name: 'Tylenol'
        },
        {
            id: '234',
            name: 'Advil'
        }
    ]

    constructor(props: AddMedicineDialogProps) {
        super(props);

        this.state = { medicine: this.medicineList[0], ammount: 0, units: Units.MG, time: null, startDate: null, endDate: null }

        this.handleMedicineChange = this.handleMedicineChange.bind(this);
        this.handleMedicineAmmountChange = this.handleMedicineAmmountChange.bind(this);
        this.handleMedicineUnitsChange = this.handleMedicineUnitsChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }

    handleMedicineChange() {}

    handleMedicineAmmountChange(e: any) {
        const ammount: number = Number(e.target.value);
        this.setState({ammount});
    }
    
    handleMedicineUnitsChange() {}
    
    handleTimeChange(time: Date | null) {
        this.setState({time});
    }

    handleStartDateChange(date: Date | null) {
        this.setState({startDate: date});
    }

    handleEndDateChange(date: Date | null) {
        this.setState({endDate: date});
    }

    handleSubmit(e: any) {

    }


    render() {

        const { time, startDate, endDate } = this.state;

        // TODO: Async autocomplete for medicine name
        //https://codesandbox.io/s/wj0r6?file=/demo.tsx

        return (
            <div className="grayout">
                <div className="add-medicine-dialog">
                    <div className="dialog-header">
                        <Typography className="dialog-title" variant="h4">Add Medicine</Typography>
                    </div>
                    <div className="dialog-body">
                        <div className="dialog-form">
                            <TextField onChange={this.handleMedicineChange} className="dialog-txt-field" label="Medicine Name" variant="filled" error={false} helperText="Enter the medicine name" />
                            <div className="medicine-amt-container">
                                <TextField type="number" InputProps={{ inputProps: { min: 0, max: 9999 } }} onChange={this.handleMedicineAmmountChange} className="medicine-amt" label="Medicine Ammount" variant="filled" error={false} helperText="Enter the medcine ammount" />
                                <TextField onChange={this.handleMedicineUnitsChange} className="medicine-units" label="Units" variant="filled" error={false}/>
                            </div>
                            <TextField className="dialog-txt-field" label="Frequency" variant="filled" error={false} helperText="How often do you take this medicine?" />
                            
                            <MuiPickersUtilsProvider utils={LuxonUtils}>
                                <TimePicker
                                    className="dialog-picker-field"
                                    inputVariant="filled"
                                    format="h:mm a"
                                    value={time}
                                    margin="normal"
                                    label="Time"
                                    onChange={this.handleTimeChange}
                                    helperText="What time do you take this medicine?"
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position="end">
                                            <AccessAlarmIcon color="primary"/>
                                        </InputAdornment>
                                        ),
                                    }}
                                />

                                <DatePicker
                                    className="dialog-picker-field"
                                    inputVariant="filled"
                                    format="MM/dd/yyyy"
                                    value={startDate}
                                    margin="normal"
                                    label="Start Date"
                                    onChange={this.handleStartDateChange}
                                    helperText="What's the first day you take this medicine?"
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position="end">
                                            <EventIcon color="primary"/>
                                        </InputAdornment>
                                        ),
                                    }}
                                />

                                <DatePicker
                                    className="dialog-picker-field"
                                    inputVariant="filled"
                                    format="MM/dd/yyyy"
                                    value={endDate}
                                    margin="normal"
                                    label="End Date"
                                    onChange={this.handleEndDateChange}
                                    helperText="What's the last day you take this medicine?"
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position="end">
                                            <EventIcon color="primary"/>
                                        </InputAdornment>
                                        ),
                                    }}
                                />

                            </MuiPickersUtilsProvider>
                        </div>
                    </div>
                    <div className="dialog-actions">
                        <Button color="primary" className="dialog-btn" onClick={ () => {} } variant="contained" size="medium">Cancel</Button>
                        <Button color="primary" className="dialog-btn" onClick={ this.handleSubmit } variant="contained" size="medium">Add</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddMedicineDialog;