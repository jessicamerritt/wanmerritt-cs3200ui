import React from 'react';

class StudyRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        }
    }

    handleDelete() {
        var self = this;
        fetch("/api/study/delete?studyId=" + self.props.study.studyId, {
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
        return (
            <tr>
                <td>{this.props.study.TITLE}</td>
                <td>{this.props.study.DESCRIPTION}</td>
                <td>{this.props.study.START_DATE}</td>
                <td>{this.props.study.END_DATE}</td>
                <td>{this.props.study.PI_FIRST_NAME + " " +
                this.props.study.PI_LAST_NAME  }</td>
                <td>{this.props.study.CONDITON}</td>
                <td>null</td>
                <td>{this.props.study.COMPLETED ? 'true' : 'false'}</td>
                <td>{this.props.study.SUCCESSFUL}</td>
                <td>
                    <button className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete</button>
                </td>
            </tr>);
    }
}

export default StudyRow;