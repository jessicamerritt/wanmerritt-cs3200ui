import React from 'react';

class PatientRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        }
    }

    handleDelete() {
        var self = this;
        fetch("/api/patient/delete?patientId=" + self.props.patient.patientId, {
            method: 'delete'
        }).then(function(response) {
            self.setState({visible: false});
        }).catch(function() {
                console.log("error");
            }
        );
    }

    render() {
        if (this.state.visible==false) return null;
        console.log(this.props.patient);
        return (
            <tr>
                <td>{this.props.patient.patientId}</td>
                <td>{this.props.patient.dob}</td>
                <td>{this.props.patient.healthy ? "true" : "false"}</td>
                <td>{this.props.patient.hometown}</td>
                <td>{this.props.patient.sex}</td>
                <td>{this.props.patient.race}</td>
                <td>{this.props.patient.ethnicity}</td>
                <td>{this.props.patient.placebo}</td>
                <td>
                    null
                </td>
            </tr>);
    }
}

export default PatientRow;