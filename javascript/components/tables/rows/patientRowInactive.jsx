import React from 'react';

class PatientRowInactive extends React.Component {

    render() {
        return (
            <tr>
                <td>{this.props.patient.patientId}</td>
                <td>{this.props.patient.dob}</td>
                <td>{this.props.patient.healthy ? "true" : "false"}</td>
                <td>{this.props.patient.hometown}</td>
                <td>{this.props.patient.sex}</td>
                <td>{this.props.patient.race}</td>
                <td>{this.props.patient.nationality}</td>
                <td>{this.props.patient.ethnicity}</td>
                <td>{this.props.patient.placebo ? 'true' : 'false'}</td>
            </tr>);
    }
}

export default PatientRowInactive;