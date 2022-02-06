import React from 'react';

import MedicineListItem from './MedicineListItem';

import './MedicineList.css';

type MedicineListState = {

}

type MedicineListProps = {
    medicineList: Array<string>
}

class MedicineList extends React.Component<MedicineListProps, MedicineListState> {
    constructor(props: MedicineListProps) {
        super(props);
    }

    render() {

        let medListItems = [];

        for (let i = 0; i < this.props.medicineList.length; i++) {
            medListItems.push(<MedicineListItem medicine={this.props.medicineList[i]}/>);
        }

        return (
            <div className="med-list">
                {medListItems}
            </div>
        );
    }
}

export default MedicineList;