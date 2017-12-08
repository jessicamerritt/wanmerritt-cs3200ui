import React from 'react';

class ClinicianRow extends React.Component {

    render() {
        return (
            <tr>
                <td>{this.props.clinician.clinicianId}</td>
                <td>{this.props.clinician.firstName}</td>
                <td>{this.props.clinician.lastName}</td>
            </tr>);
    }
}

export default ClinicianRow;