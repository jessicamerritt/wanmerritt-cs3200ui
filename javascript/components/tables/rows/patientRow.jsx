import React from 'react';

class PatientRow extends React.Component {

    updateInfo() {
        var self = this;
        self.props.update(self.props.patient);
    }

    recordValues() {
        var self = this;
        self.props.recordValues(self.props.patient);
    }

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
                <td>
                    <button className="btn btn-primary" onClick={this.updateInfo.bind(this)}>Update Info</button>

                    <button className="btn btn-primary" onClick={this.recordValues.bind(this)}>Record Values</button>
                </td>
            </tr>);
    }
}

export default PatientRow;