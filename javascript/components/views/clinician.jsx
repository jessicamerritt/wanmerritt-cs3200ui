import React, { Component } from "react";
import WebHeader from "../navigation/webHeader";
import ClinicianTable from "../tables/ClinicianTable";
import Popup from "../forms/popup";
import SelectValue from "../forms/selectValue";
import AddClinicianForm from "../forms/addClinicianForm";

export default class Clinician extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinicians: {},
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

    loadCliniciansFromServer(val) {
        var self = this;
        var id = val ? val : self.state.currentStudy.id;
        fetch("https://merrittwan-cs3200.herokuapp.com/api/clinician/study?studyId=" + id
        ).then(function(response) {

            return response.json();
        }).then(function (data) {
            var cliniciansData = {};

            data.forEach(function(clinician) {
                var clinicianOnStudy = cliniciansData[clinician.studyId] == null ? [] : cliniciansData[clinician.studyId];
                clinicianOnStudy.push(clinician.clinician);
                cliniciansData[clinician.studyId] = clinicianOnStudy;
            })
            self.setState({clinicians: cliniciansData});
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
        this.loadCliniciansFromServer(val.id);
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
        this.loadCliniciansFromServer();
        this.loadStudiesFromServer();
    }

    render() {
        return (
            <div>
                <WebHeader />

                <div className="content" >
                    <h2> Clinician Table </h2>

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

                            <button className="btn btn-primary" onClick={this.togglePopup.bind(this)}>Add Clinician</button>
                        </div>
                    </div>
                    {this.state.showPopup ?
                        <Popup
                            header='Add Clinician to Study'
                            children={<AddClinicianForm onSuccess={this.loadCliniciansFromServer.bind(this)}
                                                      studyId={this.state.currentStudy.id}
                                                      onClose={this.togglePopup.bind(this)}/>}
                            closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                    }

                    <div>
                        <ClinicianTable clinicians={this.state.clinicians[this.state.currentStudy.id] || []}/>
                    </div>
                </div>

            </div>
        );
    }
}