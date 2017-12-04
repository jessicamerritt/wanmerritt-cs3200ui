import React from 'react';
import StudyRow from './rows/studyRow';

class StudyTable extends React.Component {
    render() {
        var rows = [];
        this.props.studies.forEach(function(study) {
            rows.push(<StudyRow study={study} key={study.STUDY_ID}/>);
        });
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Title</th><th>Description</th><th>Start Date</th><th>End Date</th><th>Principal Investigator</th>
                        <th>Condition</th><th>Drugs</th><th>Completed</th><th>Outcome</th><th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>);
    }
}

export default StudyTable;