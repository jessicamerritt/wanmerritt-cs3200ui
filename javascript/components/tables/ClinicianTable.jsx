import React from 'react';
import ClinicianRow from './rows/clinicianRow';

class ClinicianTable extends React.Component {
    render() {
        var rows = [];
        this.props.clinicians.forEach(function(clinician) {
            rows.push(<ClinicianRow clinician={clinician} key={clinician.clinicianId}/>);
        });
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Clinician ID</th><th>First Name</th><th>Last Name </th><th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>);
    }
}

export default ClinicianTable;