import React from 'react';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import AddMedicineDialog from './AddMedicineDialog';

import MedicineList from './MedicineList';



import { withStyles } from '@material-ui/core/styles';


import './Medicine.css';

const styles = {
    container: {
      alignItems: "center"
    }
  };
  



type MedicineState = {
    medicineList: Array<string>,
    dialogOpen: boolean
}

type MedicineProps = {

}

/*
https://material-ui.com/components/dialogs/ Responsive dialog
*/


class Medicine extends React.Component<MedicineProps, MedicineState> {
    constructor(props: MedicineProps) {
        super(props);

        this.state = { medicineList: ['Hydroxychloroquine', 'Regeneron', 'Vitamin C'], dialogOpen: false };

        this.openDialog = this.openDialog.bind(this);
    }

    openDialog() {
        console.log("opened dialog");
        this.setState({dialogOpen: true});
    }

    render() {
        const { dialogOpen } = this.state;
        
        function dialogComponent() {
            if (dialogOpen) {
                console.log("true")
                return (
                    <AddMedicineDialog/>
                )
            }
            console.log("false")
            return (null);
        }

        //const matches = useMediaQuery('(min-width:600px)');

        return (
            <div className="page-container">
                <div className="page">
                    {dialogComponent()}
                    <Typography className="page-header" color="primary" variant="h3">My Medicine</Typography>
                    
                    <MedicineList medicineList={this.state.medicineList} />

                    <Fab onClick={this.openDialog} className="add-med" size="medium"  aria-label="Add Medicine" >
                        <AddIcon color="primary" />
                    </Fab>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Medicine);