import React, { Component } from "react";
import WebHeader from "../navigation/webHeader";
import PatientTable from "../tables/PatientTable";
import Popup from "../forms/popup";
import AddDrugForm from "../forms/addDrugForm";
import SelectValue from "../forms/selectValue";
import AddPatientForm from "../forms/addPatientForm";

export default class Patient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: {},
            showPopup: false,
            currentStudy: {
                id: 4,
                title: 'Bleomycin for Hodgkin\'s Lymphoma',
            },
            studyList: []
        }
    }

    togglePopup() {
        this.setState({
            showPopup: ! this.state.showPopup
        });
    }

    loadPatientsFromServer() {
        var self = this;
        fetch("http://localhost:8080/api/patient/all"
        ).then(function(response) {
            return response.json();
        }).then(function (data) {
            var patientsData = {};
            data.forEach(function(patient) {
                var patientOnStudy = patientsData[patient.studyId] == null ? [] : patientsData[patient.studyId];
                patientOnStudy.push(patient);
                patientsData[patient.studyId] = patientOnStudy;
            })
            self.setState({patients: patientsData});
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
        this.loadPatientsFromServer();
    }



    loadStudiesFromServer() {
        var self = this;
        fetch("http://localhost:8080/api/study/all"
        ).then(function(response) {
            return response.json();
        }).then(function (data) {
            var simplified = data['#result-set-1'].map(function(study){
                return {
                    id: study.STUDY_ID,
                    label: study.TITLE,
                    value: study.CONDITON
                };
            });
            var seen = {};
           var studies = simplified.filter(function(val) {
               var valId = val.id;
               return seen[valId] ? false : (seen[valId] = true);
            });

            self.setState({studyList: studies});
        });
    }



    componentDidMount() {
        this.loadPatientsFromServer();
        this.loadStudiesFromServer();
    }

    render() {
        return (
            <div>
                <WebHeader />

                <div className="content" >
                    <h2> Patient Table </h2>

                    <div className="row justify-content-end">
                        <div className="col col-lg-5">
                            <h3>Selected Study: {this.state.currentStudy.title}</h3>
                        </div>
                        <div className="col col-lg-4">
                            <SelectValue name="Select Study"
                                         options={this.state.studyList}
                                         onChange={this.selectStudy.bind(this)}/>
                        </div>
                        <div className="col col-lg-2">

                            <button className="btn btn-primary" onClick={this.togglePopup.bind(this)}>Add Patient</button>
                        </div>
                    </div>
                    {this.state.showPopup ?
                        <Popup
                            header='Add Patient to Study'
                            children={<AddPatientForm onSuccess={this.loadPatientsFromServer.bind(this)}
                                                      studyId={this.state.currentStudy.id}
                                                   onClose={this.togglePopup.bind(this)}/>}
                            closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                    }

                    <div>
                        <PatientTable patients={this.state.patients[this.state.currentStudy.id] || []}/>
                    </div>
                </div>

            </div>
        );
    }
}