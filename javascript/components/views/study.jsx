import React, { Component } from "react";
import WebHeader from "../navigation/webHeader";
import DBFooter from "../navigation/dbFooter";
import Popup from "../forms/popup";
import StudyTable from "../tables/StudyTable";
import AddStudyForm from "../forms/addStudyForm";

export default class Study extends Component {

    constructor(props) {
        super(props);
        this.state = {
            studies: [],
            drugs: {},
            showPopup: false,
        }
    }

    togglePopup() {
        this.setState({
            showPopup: ! this.state.showPopup
        });
    }

    loadDrugsFromServer() {
        var self = this;
        fetch("http://localhost:8080/api/drug/all"
        ).then(function(response) {
            return response.json();
        }).then(function (data) {
            var drugObj = {};
            data.forEach(function (drug) {
                drugObj[drug.drugId] = drug;
            });
            self.setState({drugs: drugObj});

        });
    }

    loadStudiesFromServer() {
        var self = this;
        fetch("http://localhost:8080/api/study/all"
        ).then(function(response) {
            return response.json();
        }).then(function (data) {
            var studies = data['#result-set-1'];
            var studyListObj = {};
            studies.forEach(function (study) {
                if (studyListObj[study.STUDY_ID]) {
                    studyListObj[study.STUDY_ID].DRUGS.push(
                        {
                            drugId: study.DRUG_DRUG_ID,
                            dosageAmount: study.DOSAGE_AMOUNT,
                            dosageUnit: study.DOSAGE_UNIT,
                            treatmentIntTime: study.TREATMENT_INTERVAL_TIME,
                            treatmentIntType: study.TREATMENT_INTERVAL_TYPE
                        });
                } else {
                    studyListObj[study.STUDY_ID] = {
                        STUDY_ID: study.STUDY_ID,
                        TITLE: study.TITLE,
                        DESCRIPTION: study.DESCRIPTION,
                        START_DATE: study.START_DATE,
                        END_DATE: study.END_DATE,
                        PRINCIPAL_INVESTIGATOR_ID: study.PRINCIPAL_INVESTIGATOR_ID,
                        PI_FIRST_NAME: study.PI_FIRST_NAME,
                        PI_LAST_NAME: study.PI_LAST_NAME,
                        CONDITION_ID: study.CONDITION_ID,
                        CONDITON: study.CONDITON,
                        DRUGS: study.DRUG_DRUG_ID ? [
                            {
                                drugId: study.DRUG_DRUG_ID,
                                dosageAmount: study.DOSAGE_AMOUNT,
                                dosageUnit: study.DOSAGE_UNIT,
                                treatmentIntTime: study.TREATMENT_INTERVAL_TIME,
                                treatmentIntType: study.TREATMENT_INTERVAL_TYPE
                            }
                        ] : [],
                        COMPLETED: study.COMPLETED,
                        SUCCESSFUL: study.SUCCESSFUL
                    }
                }
            });

            self.setState({studies: Object.values(studyListObj)});
        })
    }

    componentDidMount() {
        this.loadDrugsFromServer();
        this.loadStudiesFromServer();
    }

    render() {
        return (
            <div id="study">
                <WebHeader/>

                <div className="content">
                    <h2> Study Table </h2>

                    <div className="row justify-content-end">

                        <div className="col col-lg-2">
                            <button className="btn btn-primary" onClick={this.togglePopup.bind(this)}>Add Study</button>
                        </div>
                    </div>
                        {this.state.showPopup ?
                            <Popup
                                header='Add Study'
                                children={<AddStudyForm />}
                                closePopup={this.togglePopup.bind(this)}
                            />
                            : null
                        }
                </div>
                <div>
                    <StudyTable studies={this.state.studies}
                                drugs={this.state.drugs}
                                onClose={this.loadStudiesFromServer.bind(this)}
                    />
                </div>
            </div>
        );
    }
}