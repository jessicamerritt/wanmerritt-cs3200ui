import React from 'react';

class ClinicianRow extends React.Component {

    render() {
        return (
            <tr>
                <td>{this.props.clinician.clinicianId}</td>
                <td>{this.props.clinician.firstName}</td>
                <td>{this.props.clinician.lastName}</td>
                <td>
                    <button className="btn btn-primary" onClick={() => console.log(this.props.clinician.clinicianId)}>Update Info</button>
                </td>
            </tr>);
    }
}

export default ClinicianRow;