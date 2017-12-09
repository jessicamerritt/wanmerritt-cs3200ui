import React from 'react';
import PatientRowInactive from './rows/patientRowInactive';

class PatientTableInactive extends React.Component {
    render() {
        var self = this;
        var rows = [];
        this.props.patients.forEach(function(patient) {
            rows.push(<PatientRowInactive patient={patient}
                                  key={patient.patientId}
            />);
        });
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Patient ID</th><th>Date of Birth</th><th>Healthy</th><th>Hometown</th>
                        <th>Sex</th><th>Race</th><th>Nationality</th><th>Ethnicity</th><th>Placebo</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>);
    }
}

export default PatientTableInactive;