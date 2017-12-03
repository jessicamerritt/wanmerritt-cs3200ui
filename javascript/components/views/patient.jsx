import React, { Component } from "react";
import WebHeader from "../navigation/webHeader";
import PatientTable from "../tables/PatientTable";
import Popup from "../forms/popup";
import AddDrugForm from "../forms/addDrugForm";

export default class Patient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: {},
            showPopup: false,
            currentStudyId: 4
        }
    }

    togglePopup() {
        this.setState({
            showPopup: ! this.state.showPopup
        });
    }

    loadPatientsFromServer() {
        var self = this;
        fetch("/api/patient/all"
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


    componentDidMount() {
        this.loadPatientsFromServer();
    }

    render() {
        return (
            <div>
                <WebHeader />

                <div className="content" >
                    <h2> Patient Table </h2>

                    <div className="row justify-content-end">
                        <div className="col col-lg-2">

                            <button className="btn btn-primary" onClick={this.togglePopup.bind(this)}>Add Patient</button>
                        </div>
                    </div>
                    {this.state.showPopup ?
                        <Popup
                            header='Add Patient to Study'
                            children={<AddDrugForm onSuccess={this.loadDrugsFromServer.bind(this)}
                                                   onClose={this.togglePopup.bind(this)}/>}
                            closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                    }

                    <div>
                        <PatientTable patients={this.state.patients[this.state.currentStudyId] || []}/>
                    </div>
                </div>

            </div>
        );
    }
}