import React from 'react';

class StudyRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        }

        this.getDrugNames.bind(this);
    }

    handleClose() {
        var self = this;
        fetch('http://localhost:8080/api/study/new', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify(
                this.props.study.STUDY_ID
            )
        }).catch(function () {
            alert('We we\'re unable to close the study please try again');
        }).then(function() {
            self.props.onClose();
            alert('The study was closed');
        });
    }

    getDrugNames() {
        var drugDict = this.props.drugs;
        var nameString = "";
        var first = true;
        if (this.props.study.DRUGS.length == 0) {
            return "";
        }
        this.props.study.DRUGS.map(function(drug) {
            nameString = first ? drugDict[drug.drugId].marketName
                : nameString + ", " + drugDict[drug.drugId].marketName ;
            first = false;
            return ({
                drugId: drug.drugId,
                dosageAmount: drug.dosageAmount,
                dosageUnit: drug.dosageUnit,
                treatmentIntTime: drug.treatmentIntTime,
                treatmentIntType: drug.treatmentIntType,
                marketName: drugDict[drug.drugId].marketName,
                scientificName: drugDict[drug.drugId].scientificName,
            });
        }
        );
       return nameString;

    }

    render() {
        if (this.state.visible==false) return null;
        var btn;
        if (this.props.study.COMPLETED) {
            btn = <button className="btn btn-primary disabled" >Close Study</button>
        } else {
            btn = <button className="btn btn-primary " onClick={this.handleClose.bind(this)}>Close Study</button>
        }
        var drugNames = this.getDrugNames();
        return (
            <tr>
                <td>{this.props.study.TITLE}</td>
                <td>{this.props.study.DESCRIPTION}</td>
                <td>{this.props.study.START_DATE}</td>
                <td>{this.props.study.END_DATE}</td>
                <td>{this.props.study.PI_FIRST_NAME + " " +
                this.props.study.PI_LAST_NAME  }</td>
                <td>{this.props.study.CONDITON}</td>
                <td>{drugNames}</td>
                <td>{this.props.study.COMPLETED ? 'true' : 'false'}</td>
                <td>{this.props.study.SUCCESSFUL}</td>
                <td>
                    {btn}
                </td>
            </tr>);
    }
}

export default StudyRow;