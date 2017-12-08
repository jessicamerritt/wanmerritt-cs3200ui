import React, { Component } from "react";
import SelectValue from "./selectValue";

export default class AddStudyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            selectedDrug: null,
            drugList: [],
            piList: [],
            mcList: [],
            drugArray: [],
            drugs: [],
            endDate: "",
            startDate: "",
            medicalCondition: {
                conditionId: "",
                name: "",
                description: "",
            },
            principalInvestigator: {
                email: "",
                firstName: "",
                address: {
                    addressId: null,
                    street: "",
                    city: "",
                    state: "",
                    zip: ""
                },
                institutionId: null,
                lastName: "",
                phone: "",
                principalInvestigatorId: null
            },
            title: "",
            drugs: [],
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    selectDrug(drug) {
        this.setState({selectedDrug: drug});
    }

    loadDrugsFromServer() {
        var self = this;
        fetch("https://merrittwan-cs3200.herokuapp.com/api/drug/all"
        ).then(function(response) {
            return response.json();
        }).then(function (data) {
            var drugList = data.map(function(drug) {
                return {
                    drugId: drug.drugId,
                    marketName: drug.marketName,
                    previousSuccess: drug.previousSuccess,
                    scientificName: drug.scientificName,
                    toxicity: drug.toxicity,
                    label: drug.marketName,
                    value: drug.scientificName
                }
            } );
            self.setState({drugList: drugList});

        }).catch(error => alert('error loading the drugs'));
    }

    loadPiFromServer() {
        var self = this;
        fetch("https://merrittwan-cs3200.herokuapp.com/api/principal/all"
        ).then(function(response) {
            return response.json();
        }).then(function (data) {
            var piList = data["#result-set-1"].map(function(pi) {
                return {
                    email: pi.EMAIL,
                    firstName: pi.FIRST_NAME,
                    address: {
                        addressId: pi.ADDRESS_ID,
                        street: pi.STREET,
                        city: pi.CITY,
                        state: pi.STATE,
                        zip: pi.ZIP
                    },
                    institutionId: pi.INSTITUTION_ID,
                    lastName: pi.LAST_NAME,
                    phone: pi.PHONE,
                    principalInvestigatorId: pi.PRINCIPAL_INVESTIGATOR_ID,
                    label: pi.FIRST_NAME + " " + pi.LAST_NAME,
                    value: pi.EMAIL
                }
            });
            self.setState({piList: piList});
        }).catch(error => alert('error loading the Principal Investigators'));;
    }

    loadMedicalConditionFromServer() {
        var self = this;
        fetch("https://merrittwan-cs3200.herokuapp.com/api/condition/all"
        ).then(function(response) {
            return response.json();
        }).then(function (data) {
            var mcList = data.map(function(mc) {
                return {
                    conditionId: mc.conditionId,
                    name: mc.name,
                    description: mc.description,
                    label: mc.name,
                    value: mc.name
                }
            });
            self.setState({mcList: mcList});
        }).catch(error => alert('Unable to load the medical conditions at this time'));;
    }

    componentDidMount() {
        this.loadDrugsFromServer();
        this.loadPiFromServer();
        this.loadMedicalConditionFromServer();
    }

    addDrugToStudy(drug) {
        var drugArray = this.state.drugs;
        drugArray.push({
            drugId: drug.drugId,
            marketName: drug.marketName,
            previousSuccess: drug.previousSuccess,
            scientificName: drug.scientificName,
            toxicity: drug.toxicity
        })
        this.setState({
            drugArray: drugArray
        })
    }



    handleSubmit(event) {


        var self = this;
        self.props.onClose();
        fetch('https://merrittwan-cs3200.herokuapp.com/api/study/new', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({

                completed: false,
                description: self.state.description,
                drugs: self.state.drugs,
               /* {
                    "dosageAmount": 10,
                    "dosageUnit": "ml",
                    "drug": {
                        "drugId": 0,
                        "marketName": "Bleomycin",
                        "scientificName": "",
                        "toxicity": "",
                        "previousSuccess": 0
                    },
                    "treatmentIntervalTime": 10,
                    "treatmentIntervalType": "MONTH"
                }
            ],*/
                endDate: self.state.endDate,
                medicalCondition: self.state.medicalCondition,
                principalInvestigator: self.state.principalInvestigator,
                startDate: self.state.startDate,
                successful: "IN_PROGRESS",
                title: self.state.title,
            })
        }).catch(function (error) {
            console.log(error);
            alert('We are unable to add the study at this moment');
        }).then(function() {
            self.props.onSuccess();
            alert('Success');
        });
        event.preventDefault();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Title:
                    <input
                        name="title"
                        type="text"
                        value={this.state.title}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Description:
                    <textarea
                        value={this.state.description}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Start Date:
                    <input
                        name="startDate"
                        type="date"
                        onChange={this.startDate} />
                </label>
                <div>
                <label >
                    End Date:
                </label>
                    <input
                        name="endDate"
                        type="date"
                        onChange={this.endDate} />
                </div>
                <SelectValue name="Drugs"
                             options={this.state.drugList}
                             value={this.state.selectedDrug ? this.state.selectedDrug.marketName : null}
                             onChange={this.selectDrug.bind(this)}/>

                <div className="row justify-content-center">
                    <input className="btn btn-primary" type="submit" value="Submit" />
                </div>

            </form>
        );
    }
}