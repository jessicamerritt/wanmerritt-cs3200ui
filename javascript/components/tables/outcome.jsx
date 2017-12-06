import React, {Component} from "react";
import WebHeader from "../navigation/webHeader";
import PatientTable from "../tables/PatientTable";
import SelectValue from "../forms/selectValue";
import QueryParametersForm from "../forms/queryParametersForm";
import TreatmentTypeForm from "../forms/treatmentTypeForm";

export default class Outcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            showPopup: false,
            currentStudy: {
                id: 4,
                title: 'Bleomycin for Hodgkin\'s Lymphoma',
            },
            studyList: [],
        }
    }

    togglePopup() {
        this.setState({
                          showPopup: !this.state.showPopup
                      });
    }

    loadPatientsFromServer(patients) {
        this.setState({
                          patients: patients
                      });
    }

    selectStudy(val) {
        this.setState({
                          currentStudy: {
                              id: val.id,
                              title: val.label,
                              condition: val.value,
                          }
                      })
    }

    loadStudiesFromServer() {
        var self = this;
        fetch("http://localhost:8080/api/study/all"
        ).then(function (response) {
            return response.json();
        }).then(function (data) {
            var simplified = data['#result-set-1'].map(function (study) {
                return {
                    id: study.STUDY_ID,
                    label: study.TITLE,
                    value: study.CONDITON
                };
            });
            var seen = {};
            var studies = simplified.filter(function (val) {
                var valId = val.id;
                return seen[valId] ? false : (seen[valId] = true);
            });

            self.setState({studyList: studies});
        });
    }

    componentDidMount() {
        this.loadStudiesFromServer();
    }

    render() {
        return (
            <div>
                <WebHeader />

                <div className="content">
                    <h2> Outcomes Table </h2>

                    <div className="row">
                        <div className="col col-lg-3 offset-lg-3">
                            <h3>Selected Study: {this.state.currentStudy.title}</h3>
                        </div>
                        <div className="col col-lg-3">
                            <SelectValue name="Select Study"
                                         options={this.state.studyList}
                                         onChange={this.selectStudy.bind(this)}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col col-md-3 offset-md-3">
                            <QueryParametersForm studyId={this.state.currentStudy.id}
                                                 callback={this.loadPatientsFromServer.bind(this)}/>
                        </div>
                        <div className="col col-md-3">
                            <TreatmentTypeForm studyId={this.state.currentStudy.id}
                                               callback={this.loadPatientsFromServer.bind(this)}/>
                        </div>
                    </div>

                    <div>
                        <PatientTable patients={this.state.patients || []}/>
                    </div>
                </div>

            </div>
        );
    }
}