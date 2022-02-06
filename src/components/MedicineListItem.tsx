import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import './MedicineListItem.css';

type MedicineListItemState = {

}

type MedicineListItemProps = {
    medicine: string
}



function MedicineListItem(props: MedicineListItemProps) {
    return (
        <div className="med-list-item">
            <div>
                <div className="med-name-txt">{props.medicine}</div>
            </div>
            <div className="med-btns-container">
                <div className="med-icon-btn-container">
                    <IconButton className="med-icon-btn" color="primary" aria-label="add an alarm">
                        <DeleteIcon className="med-icon" color="primary" />
                    </IconButton>
                </div>
                <div className="med-icon-btn-container">
                    <IconButton className="med-icon-btn" color="primary" aria-label="add an alarm">
                        <EditIcon className="med-icon" color="primary" />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

// class MedicineListItem extends React.Component<MedicineListItemProps, MedicineListItemState> {
//     constructor(props: MedicineListItemProps) {
//         super(props);
//     }

//     render() {
//         return (
//             <div className="med-list-item">
//                 <div>
//                     <div className="med-name-txt">{this.props.medicine}</div>
//                 </div>
//                 <div className="med-btns-container">
//                     <div className="med-icon-btn-container">
//                         <IconButton className="med-icon-btn" color="primary" aria-label="add an alarm">
//                             <DeleteIcon className="med-icon" color="primary" />
//                         </IconButton>
//                     </div>
//                     <div className="med-icon-btn-container">
//                         <IconButton className="med-icon-btn" color="primary" aria-label="add an alarm">
//                             <EditIcon className="med-icon" color="primary" />
//                         </IconButton>
//                     </div>
//                 </div>
//             </div>

//         );
//     }
// }

export default MedicineListItem;