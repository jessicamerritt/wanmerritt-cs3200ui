import React, { Component } from "react";
import WebHeader from "../navigation/webHeader";
import PatientTable from "../tables/PatientTable";
import Popup from "../forms/popup";
import SelectValue from "../forms/selectValue";
import AddPatientForm from "../forms/addPatientForm";
import UpdatePatientForm from "../forms/updatePatientForm";
import RecordMeasuredValueForm from "../forms/recordMeasuredValueForm";


export default class Patient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: {},
            showPopup: false,
            showUpdate: false,
            showRecord: false,
            patientToUpdate: {},
            patientToRecord:{},
            currentStudy: {
                id: 4,
                title: 'Bleomycin for Hodgkin\'s Lymphoma',
            },
            studyList: []
        }
    }

    toggleUpdate() {
        this.setState({
            showUpdate: ! this.state.showUpdate
        });
    }

    togglePopup() {
        this.setState({
            showPopup: ! this.state.showPopup
        });
    }

    toggleRecord() {
        this.setState({
            showRecord: ! this.state.showRecord
        });
    }

    loadPatientsFromServer() {
        var self = this;
        fetch("https://merrittwan-cs3200.herokuapp.com/api/patient/all"
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

    recordValues(patient) {
        this.setState({
            patientToRecord: patient
        });
        this.toggleRecord();
    }

    updatePatient(patient) {
        this.setState({
            patientToUpdate: patient
        });
        this.toggleUpdate();
    }



    loadStudiesFromServer() {
        var self = this;
        fetch("https://merrittwan-cs3200.herokuapp.com/api/study/all"
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
        }).catch(error => alert('Unable to load studies at this time'));
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
                                         value={this.state.currentStudy.title}
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

                    {this.state.showUpdate ?
                        <Popup
                            header='Update Patient Information'
                            children={<UpdatePatientForm onSuccess={this.loadPatientsFromServer.bind(this)}
                                                      studyId={this.state.currentStudy.id}
                                                      patient={this.state.patientToUpdate}
                                                      onClose={this.toggleUpdate.bind(this)}/>}
                            closePopup={this.toggleUpdate.bind(this)}
                        />
                        : null
                    }
                    {this.state.showRecord ?
                        <Popup
                            header='Record Measured Value'
                            children={<RecordMeasuredValueForm onSuccess={this.loadPatientsFromServer.bind(this)}
                                                         studyId={this.state.currentStudy.id}
                                                         patient={this.state.patientToRecord}
                                                         onClose={this.toggleRecord.bind(this)}/>}
                            closePopup={this.toggleRecord.bind(this)}
                        />
                        : null
                    }

                    <div>
                        <PatientTable updatePatient={this.updatePatient.bind(this)}
                                      recordValues={this.recordValues.bind(this)}
                                      patients={this.state.patients[this.state.currentStudy.id] || []}/>
                    </div>
                </div>

            </div>
        );
    }
}